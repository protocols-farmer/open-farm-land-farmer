"use client";

import React from "react";
import { Users } from "lucide-react";

export default function ContributorStats({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Users className="h-4 w-4" />
      <span className="text-sm font-medium">
        {count.toLocaleString()} {count === 1 ? "Contributor" : "Contributors"}
      </span>
    </div>
  );
}
