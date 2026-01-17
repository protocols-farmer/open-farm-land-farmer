// src/components/pages/profile/UserNotFound.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, UserX, ArrowLeft } from "lucide-react";

interface UserNotFoundProps {
  username?: string;
}

export default function UserNotFound({ username }: UserNotFoundProps) {
  return (
    <div className="container mx-auto py-20 flex justify-center">
      <Card className="w-full max-w-lg border-dashed border-2">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
            <UserX className="h-10 w-10 text-muted-foreground" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight">
            Wanderer Not Found
          </h2>
          <p className="text-muted-foreground mt-2 mb-8">
            The user{" "}
            <span className="font-mono font-semibold text-foreground">
              @{username}
            </span>{" "}
            has either changed their name or never existed in these guilds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </Button>
            <Button asChild>
              <Link href="/search">
                <Search className="mr-2 h-4 w-4" /> Search Members
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
