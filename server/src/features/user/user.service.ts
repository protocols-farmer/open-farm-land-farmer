//src/features/user/user.service.ts
import bcrypt from "bcryptjs";
import { Prisma, User } from "@prisma-client";
import prisma, { ExtendedPrismaClient } from "@/db/prisma.js"; // REFINED: Import ExtendedPrismaClient
import { SignUpInputDto } from "@/types/auth.types.js";
import { createHttpError } from "@/utils/error.factory.js";
import { logger } from "@/config/logger.js";
import {
  deleteFromCloudinary,
  extractPublicIdFromUrl,
} from "@/config/cloudinary.js";

export type SafeUser = Omit<User, "hashedPassword">;

interface UserProfileUpdateData {
  name?: string;
  username?: string;
  bio?: string;
  title?: string;
  location?: string;
  profileImage?: string;
  bannerImage?: string;
  twitterUrl?: string | null;
  githubUrl?: string | null;
  websiteUrl?: string | null;
}

export class UserService {
  // REFINED: Helper to access the correctly typed user delegate from the extended client
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

    // REFINED: Extension handles the password omission automatically
    return (await this.userDelegate.create({
      data: { email, username, hashedPassword, name },
    })) as unknown as SafeUser;
  }

  public async deleteUserAccount(userId: string): Promise<void> {
    const user = await this.findUserById(userId);
    if (!user) return;

    const deletionPromises = [];

    // Instead of guessing the name, we get the real ID from the URL in the DB
    if (user.profileImage) {
      const publicId = extractPublicIdFromUrl(user.profileImage);
      if (publicId) deletionPromises.push(deleteFromCloudinary(publicId));
    }
    if (user.bannerImage) {
      const publicId = extractPublicIdFromUrl(user.bannerImage);
      if (publicId) deletionPromises.push(deleteFromCloudinary(publicId));
    }

    await Promise.allSettled(deletionPromises);

    try {
      await this.userDelegate.delete({ where: { id: userId } });
      logger.info({ userId }, "User and assets deleted successfully.");
    } catch (error) {
      throw createHttpError(500, "Could not delete user account.");
    }
  }

  public async updateUserProfile(
    userId: string,
    data: UserProfileUpdateData
  ): Promise<SafeUser> {
    const existingUser = await this.findUserById(userId);
    if (!existingUser) throw createHttpError(404, "User not found.");

    try {
      // REFINED: Clean return type through the delegate
      return (await this.userDelegate.update({
        where: { id: userId },
        data,
      })) as unknown as SafeUser;
    } catch (e: any) {
      if (
        e.code === "P2002" ||
        (e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === "P2002")
      ) {
        throw createHttpError(409, "This username is already taken.");
      }
      throw createHttpError(500, "Could not update profile.");
    }
  }
}

export const userService = new UserService();
