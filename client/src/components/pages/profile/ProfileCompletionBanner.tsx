"use client";

import React, { useMemo, useEffect, useRef } from "react";
import { Sparkles, CheckCircle2, ArrowRight, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SanitizedUserDto } from "@/lib/features/user/userTypes";
import confetti from "canvas-confetti";

interface ProfileCompletionBannerProps {
  user: SanitizedUserDto;
  onEdit: () => void;
}

export default function ProfileCompletionBanner({
  user,
  onEdit,
}: ProfileCompletionBannerProps) {
  const hasCelebrated = useRef(false);

  // This is the Cloudinary ID for your default placeholder image
  const DEFAULT_IMAGE_ID = "xi-biooid_bstapi";

  const completionData = useMemo(() => {
    // We split the weights so they total exactly 100.
    // An image is only 'completed' if it exists AND isn't the default placeholder.
    const fields = [
      {
        label: "Full Name",
        weight: 15,
        completed: user.name !== "New Wanderer",
      },
      { label: "Bio", weight: 15, completed: !!user.bio },
      { label: "Location", weight: 10, completed: !!user.location },
      { label: "Title", weight: 10, completed: !!user.title },
      {
        label: "Profile Picture",
        weight: 20,
        completed:
          !!user.profileImage && !user.profileImage.includes(DEFAULT_IMAGE_ID),
      },
      {
        label: "Cover Banner",
        weight: 15,
        completed:
          !!user.bannerImage && !user.bannerImage.includes(DEFAULT_IMAGE_ID),
      },
      {
        label: "Social Links",
        weight: 15,
        completed: !!(user.githubUrl || user.twitterUrl || user.websiteUrl),
      },
    ];

    const totalScore = fields.reduce(
      (acc, f) => acc + (f.completed ? f.weight : 0),
      0
    );
    const remainingFields = fields.filter((f) => !f.completed);

    return {
      score: totalScore,
      remaining: remainingFields,
    };
  }, [user]);

  // --- CELEBRATION LOGIC ---
  useEffect(() => {
    // Only fire when score is EXACTLY 100
    if (completionData.score === 100 && !hasCelebrated.current) {
      hasCelebrated.current = true;
      const end = Date.now() + 3000;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#6366f1", "#a855f7"],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#ec4899", "#6366f1"],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [completionData.score]);

  // Show "Success" state only when 100% is reached (All fields + Both images)
  if (completionData.score >= 100) {
    return (
      <div className="bg-green-500/10 border-2 border-green-500/20 rounded-3xl p-6 mb-10 flex items-center justify-between animate-in zoom-in duration-500">
        <div className="flex items-center gap-4">
          <div className="bg-green-500 p-2 rounded-full shadow-lg shadow-green-500/20">
            <PartyPopper className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">Identity Forged!</h3>
            <p className="text-sm text-muted-foreground">
              Your profile is 100% complete. You are now a full member of the
              Guild.
            </p>
          </div>
        </div>
        <CheckCircle2 className="h-8 w-8 text-green-500 opacity-50" />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-primary/20 p-6 mb-10 group shadow-sm">
      {/* Visual Decoration */}
      <div className="absolute -right-12 -top-12 h-40 w-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700" />

      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
        {/* Progress Wheel */}
        <div className="flex flex-col items-center justify-center space-y-2 shrink-0">
          <div className="relative h-20 w-20 flex items-center justify-center">
            <svg className="h-20 w-20 -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                className="text-muted/20"
              />
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={226}
                strokeDashoffset={226 - (226 * completionData.score) / 100}
                className="text-primary transition-all duration-1000 ease-in-out"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-xl font-black tabular-nums">
              {completionData.score}%
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4 w-full text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold text-foreground flex items-center justify-center md:justify-start gap-2">
              Complete Your Identity
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              Follow these steps to customize your profile and unlock full
              presence.
            </p>
          </div>

          <div className="space-y-3">
            <Progress value={completionData.score} className="h-2 bg-muted" />
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {completionData.remaining.map((item) => (
                <div
                  key={item.label}
                  className="px-2.5 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold text-muted-foreground flex items-center gap-1.5 uppercase tracking-wider"
                >
                  <div className="h-1 w-1 rounded-full bg-primary/40" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={onEdit}
          size="lg"
          className="rounded-full px-8 font-bold shadow-xl  hover:scale-105 transition-transform shrink-0"
        >
          Customize
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
