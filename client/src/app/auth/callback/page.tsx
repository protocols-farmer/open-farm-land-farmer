//src/app/auth/callback/page.tsx
"use client";

import { useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useCheckSocialStatusMutation } from "@/lib/features/social-auth/socialAuthApiSlice";
import { toast } from "sonner";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [checkSocialStatus] = useCheckSocialStatusMutation();

  const hasCalled = useRef(false);

  useEffect(() => {
    const status = searchParams.get("status");
    const provider = searchParams.get("provider") || "Social";

    if (status === "success" && !hasCalled.current) {
      hasCalled.current = true;

      checkSocialStatus()
        .unwrap()
        .then(() => {
          toast.success("Welcome back!", {
            description: `Successfully authenticated via ${provider}.`,
          });
          router.push("/");
        })
        .catch((err) => {
          console.error("Social Auth Verification Error:", err);
          toast.error(
            err?.data?.message || "Failed to finalize social session.",
          );
          router.push("/auth/login");
        });
    } else if (status === "error") {
      toast.error("Social authentication was cancelled or failed.");
      router.push("/auth/login");
    }
  }, [searchParams, checkSocialStatus, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <div className="text-center px-4">
        <h2 className="text-xl font-semibold text-foreground">
          Finalizing Login
        </h2>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          We&apos;re verifying your session and preparing your dashboard.
        </p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary/30" />
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
