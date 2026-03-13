//src/components/shared/AccessDenied.tsx
"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AccessDenied() {
  return (
    <Card className="w-full rounded-none max-w-md shadow-2xl border-destructive/20 bg-card/50 backdrop-blur-md">
      <CardHeader className="text-center pt-8">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 ring-8 ring-destructive/5">
          <ShieldAlert className="h-10 w-10 text-destructive animate-pulse" />
        </div>
        <CardTitle className="text-3xl font-extrabold tracking-tight">
          Access Denied
        </CardTitle>
        <CardDescription className="text-base mt-2 px-4">
          You do not have the required permissions to access the
          <span className="font-bold text-foreground block mt-1">
            Administration Guild.
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="p-8 pt-0">
        <Button
          variant="default"
          asChild
          className="w-full h-11 text-base font-semibold shadow-sm rounded-none"
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-5 w-5" /> Return to Safety
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
