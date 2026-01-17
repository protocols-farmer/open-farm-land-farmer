// src/components/shared/AccessDenied.tsx
import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function AccessDenied() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] p-6">
      <Card className="w-full max-w-md text-center shadow-lg border-destructive/20">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <ShieldAlert className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold">Access Denied</CardTitle>
          <CardDescription>
            You do not have the required permissions to access the
            Administration Guild.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Safety
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
