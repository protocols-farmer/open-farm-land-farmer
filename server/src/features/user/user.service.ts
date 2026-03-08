//src/features/user/user.service.ts
import bcrypt from "bcryptjs";
import { Prisma, User } from "@prisma-client";
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
    return this.userDelegate.findUnique({
      where: { id },
    }) as Promise<SafeUser | null>;
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

    // 🚜 Cleanup Cloudinary Assets
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
      // 🚜 Crucial: Proceed with DB deletion regardless of Cloudinary outcome
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

  /**
   * Scenario Fix: Handle Username Conflict (P2002).
   * Throws a 409 Conflict with a helpful message for the user.
   */
  public async updateUserProfile(
    userId: string,
    data: UserProfileUpdateData,
  ): Promise<SafeUser> {
    const existingUser = await this.findUserById(userId);
    if (!existingUser) throw createHttpError(404, "User not found.");

    try {
      const updatedUser = await this.userDelegate.update({
        where: { id: userId },
        data,
      });

      return updatedUser as unknown as SafeUser;
    } catch (e: any) {
      // 🚜 Catch Prisma Unique Constraint error (P2002)
      if (
        e.code === "P2002" ||
        (e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === "P2002")
      ) {
        logger.info(
          { userId, target: e.meta?.target },
          "Conflict: Username change rejected.",
        );
        throw createHttpError(
          409,
          "This username is already claimed by another wanderer.",
        );
      }

      logger.error({ err: e, userId }, "❌ Profile update failed.");
      throw createHttpError(500, "Could not update profile.");
    }
  }
}

export const userService = new UserService();
