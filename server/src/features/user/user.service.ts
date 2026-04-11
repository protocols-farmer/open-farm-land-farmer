//src/features/user/user.service.ts
import bcrypt from "bcryptjs";
import { User } from "@prisma-client";
import prisma, { ExtendedPrismaClient } from "@/db/prisma.js";
import { SignUpInputDto } from "@/features/auth/auth.types.js";
import { createHttpError } from "@/utils/error.factory.js";
import { logger } from "@/config/logger.js";
import { deleteFromCloudinary } from "@/config/cloudinary.js";

export type SafeUser = Omit<User, "hashedPassword">;

interface UserProfileUpdateData {
  name?: string;
  username?: string;
  bio?: string;
  title?: string;
  location?: string;
  profileImage?: string;
  profileImagePublicId?: string;
  bannerImage?: string;
  bannerImagePublicId?: string;
  twitterUrl?: string | null;
  githubUrl?: string | null;
  websiteUrl?: string | null;
}

export class UserService {
  public getPublicProfile(user: any) {
    const {
      hashedPassword,
      email,
      emailVerifyToken,
      passwordResetToken,
      passwordResetExpires,
      status,
      deactivatedAt,
      settings,
      ...publicData
    } = user;

    return {
      ...publicData,
      joinedAt: user.joinedAt,
    };
  }
  private get userDelegate() {
    return (prisma as ExtendedPrismaClient).user;
  }

  public async findUserByEmail(email: string): Promise<SafeUser | null> {
    return this.userDelegate.findUnique({
      where: { email },
    }) as Promise<SafeUser | null>;
  }

  public async findUserByUsername(username: string): Promise<SafeUser | null> {
    return this.userDelegate.findUnique({
      where: { username },
    }) as Promise<SafeUser | null>;
  }

  public async findUserById(id: string): Promise<SafeUser | null> {
    // 1. Fast, lightweight initial query
    const user = await this.userDelegate.findUnique({
      where: { id },
    });

    if (!user) return null;

    let activeSanction = undefined;

    // 2. Only query the moderation table if we know they are disciplined
    if (user.status === "SUSPENDED" || user.status === "BANNED") {
      const sanction = await (
        prisma as ExtendedPrismaClient
      ).userSanction.findFirst({
        where: {
          userId: id,
          status: { in: ["ACTIVE", "APPEALED"] },
        },
        orderBy: { createdAt: "desc" },
        include: { appeal: true },
      });

      if (sanction) {
        // 3. If suspended and time is up, restore access immediately
        if (
          user.status === "SUSPENDED" &&
          sanction.expiresAt &&
          new Date() >= sanction.expiresAt
        ) {
          await (prisma as ExtendedPrismaClient).$transaction([
            (prisma as ExtendedPrismaClient).user.update({
              where: { id },
              data: { status: "ACTIVE" },
            }),
            (prisma as ExtendedPrismaClient).userSanction.update({
              where: { id: sanction.id },
              data: { status: "EXPIRED" },
            }),
          ]);
          // Update local memory so the frontend sees them as ACTIVE immediately
          user.status = "ACTIVE";
        } else {
          // Time is not up (or it's a permanent ban), attach the sanction details
          activeSanction = {
            reason: sanction.reason,
            expiresAt: sanction.expiresAt,
            type: sanction.type,
            status: sanction.status,
            appealStatus: sanction.appeal?.status || null,
          };
        }
      }
    }

    // 4. Clean destructuring, no 'delete' keywords or 'any' hacks
    const { hashedPassword, ...safeUserBase } = user;

    return {
      ...safeUserBase,
      activeSanction,
    } as unknown as SafeUser;
  }

  public async createUser(input: SignUpInputDto): Promise<SafeUser> {
    const { email, username, password, name } = input;
    const hashedPassword = await bcrypt.hash(password, 10);

    return (await this.userDelegate.create({
      data: {
        email,
        username,
        hashedPassword,
        name,
        settings: {
          create: {
            emailMarketing: true,
            emailUpdates: true,
            emailSocial: true,
            theme: "DARK", // 🌙 Dark Mode Default
            notificationsEnabled: true,
          },
        },
      },
      include: { settings: true },
    })) as unknown as SafeUser;
  }
  /**
   * Scenario Fix: Decouple DB deletion from Cloudinary cleanup.
   * If Cloudinary fails, we log the "Orphaned Asset" IDs but proceed with DB deletion.
   */
  public async deleteUserAccount(userId: string): Promise<void> {
    const user = await this.userDelegate.findUnique({
      where: { id: userId },
    });

    if (!user) return;

    const profileId = user.profileImagePublicId;
    const bannerId = user.bannerImagePublicId;

    if (profileId || bannerId) {
      const cleanupResults = await Promise.allSettled([
        profileId ? deleteFromCloudinary(profileId) : Promise.resolve(),
        bannerId ? deleteFromCloudinary(bannerId) : Promise.resolve(),
      ]);

      // Log orphaned assets if cleanup failed
      cleanupResults.forEach((res, index) => {
        if (res.status === "rejected") {
          const type = index === 0 ? "Profile" : "Banner";
          const assetId = index === 0 ? profileId : bannerId;
          logger.warn(
            { userId, assetId, type, err: res.reason },
            `⚠️ Orphaned Asset Alert: Failed to delete ${type} image from Cloudinary during account deletion.`,
          );
        }
      });
    }

    try {
      await this.userDelegate.delete({ where: { id: userId } });
      logger.info(
        { userId },
        "✅ User and associated assets cleaned up (see warnings for orphans).",
      );
    } catch (error) {
      logger.error(
        { err: error, userId },
        "❌ Critical: Failed to delete user record from DB.",
      );
      throw createHttpError(500, "Could not delete user account.");
    }
  }

  public async updateUserProfile(
    userId: string,
    data: UserProfileUpdateData,
  ): Promise<SafeUser> {
    try {
      const updatedUser = await this.userDelegate.update({
        where: { id: userId },
        data,
      });

      const { hashedPassword, ...safeUser } = updatedUser;
      return safeUser as unknown as SafeUser;
    } catch (error: any) {
      if (error.code === "P2002") {
        logger.info(
          { userId, target: error.meta?.target },
          "Conflict: Username change rejected.",
        );
        throw createHttpError(
          409,
          "This username is already claimed by another wanderer.",
        );
      }

      if (error.code === "P2025") {
        throw createHttpError(404, "User profile not found.");
      }

      logger.error({ err: error, userId }, "❌ Profile update failed.");
      throw createHttpError(500, "Could not update profile.");
    }
  }
}

export const userService = new UserService();
