"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import {
  closeAuthModal,
  selectAuthModalState,
} from "@/lib/features/ui/uiSlice";
import { Lock } from "lucide-react";

export function AuthModal() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthModalOpen, interactionType } =
    useAppSelector(selectAuthModalState);

  const handleClose = () => dispatch(closeAuthModal());

  const handleNavigate = (path: string) => {
    handleClose();
    router.push(path);
  };

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xs">
        <DialogHeader className="text-center items-center pt-2">
          {/* 🚜 Icon with branding color */}
          <div className="bg-primary/10 p-3 rounded-full mb-2">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-lg font-bold tracking-tight">
            Authentication Required
          </DialogTitle>
          <DialogDescription className="text-xs px-2 leading-relaxed text-muted-foreground">
            {/* 🚜 Dynamically handles: "like", "dislike", "comment", etc. */}
            Please log in or create an account to {interactionType}.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button
            size="sm"
            className="font-bold"
            onClick={() => handleNavigate("/auth/login")}
          >
            Log In
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="font-bold"
            onClick={() => handleNavigate("/auth/signup")}
          >
            Sign Up
          </Button>
        </div>

        <p className="text-[10px] text-center text-muted-foreground mt-2">
          Join our community to contribute!
        </p>
      </DialogContent>
    </Dialog>
  );
}
