//src/app/auth/callback/page.tsx
"use client";

import { useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  useLoginWithGoogleMutation,
  useLoginWithGithubMutation,
} from "@/lib/features/social-auth/socialAuthApiSlice";
import { toast } from "sonner";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Get both mutations
  const [loginWithGoogle] = useLoginWithGoogleMutation();
  const [loginWithGithub] = useLoginWithGithubMutation();

  const hasCalled = useRef(false);

  useEffect(() => {
    const code = searchParams.get("code");

    // We'll retrieve the provider from sessionStorage (set in the SocialLogin component)
    // Default to google if something goes wrong
    const provider = sessionStorage.getItem("social_provider") || "google";

    if (code && !hasCalled.current) {
      hasCalled.current = true;

      // 2. Select the correct mutation based on provider
      const loginMutation =
        provider === "github" ? loginWithGithub : loginWithGoogle;

      loginMutation({ code })
        .unwrap()
        .then(() => {
          toast.success("Welcome back!", {
            description: `Successfully authenticated with ${provider}.`,
          });
          sessionStorage.removeItem("social_provider"); // Cleanup
          router.push("/");
        })
        .catch((err) => {
          toast.error(err?.data?.message || "Social login failed.");
          router.push("/auth/login");
        });
    }
  }, [searchParams, loginWithGoogle, loginWithGithub, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground">
          Authenticating...
        </h2>
        <p className="text-muted-foreground text-sm">
          Finishing your journey back to the farmland.
        </p>
      </div>
    </div>
  );
}

// 3. Wrap in Suspense to satisfy Next.js requirements
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
