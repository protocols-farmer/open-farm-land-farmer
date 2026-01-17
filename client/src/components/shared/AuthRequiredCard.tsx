// src/components/shared/AuthRequiredCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LockKeyhole, UserPlus, LogIn, ArrowLeft } from "lucide-react";

interface AuthRequiredCardProps {
  title?: string;
  description?: string;
  actionText?: string;
}

export default function AuthRequiredCard({
  title = "Authentication Required",
  description = "You need to be part of the guild to access this area.",
  actionText = "to continue your journey",
}: AuthRequiredCardProps) {
  return (
    <div className="flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-lg border-primary/20 bg-card/50 backdrop-blur">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <LockKeyhole className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription className="text-base">
            Please log in or create an account {actionText}.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" asChild className="w-full">
              <Link href="/auth/login">
                <LogIn className="mr-2 h-4 w-4" /> Log In
              </Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/auth/register">
                <UserPlus className="mr-2 h-4 w-4" /> Sign Up
              </Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            asChild
            className="w-full text-muted-foreground"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
