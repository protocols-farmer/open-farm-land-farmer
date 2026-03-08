"use client";

import Link from "next/link";
import { UpdateDto } from "@/lib/features/updates/updateTypes";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ArrowRight, Terminal } from "lucide-react";
// const cleanPreview = (content: string) => {
//     return content
//       .replace(/[#*`_~]/g, '') // Remove headers, bold, code, etc.
//       .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Keep link text, remove URL
//       .trim();
//   };
export default function UpdateCard({ update }: { update: UpdateDto }) {
  return (
    <Card className="group h-full flex flex-col bg-card border-border hover:border-primary/40 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl rounded-2xl overflow-hidden relative">
      <CardHeader className="p-6 pb-4">
        <div className="flex justify-between items-start mb-4">
          <Badge
            variant="outline"
            className="rounded-md font-bold px-2.5 py-1 bg-muted/50 border-border group-hover:border-primary/20 transition-colors capitalize"
          >
            {update.category.replace("_", " ").toLowerCase()}
          </Badge>
          {update.version && (
            <Badge
              variant="secondary"
              className="font-mono font-bold text-primary bg-primary/10 border-none"
            >
              {update.version.toLowerCase().startsWith("v")
                ? update.version
                : `v${update.version}`}{" "}
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors leading-snug">
          <Link
            href={`/updates/${update.id}`}
            className="after:absolute after:inset-0"
          >
            {update.title}
          </Link>
        </CardTitle>
        <CardDescription className="text-xs font-medium text-muted-foreground pt-1">
          Published {format(new Date(update.publishedAt), "MMMM d, yyyy")}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
          {update.content}
        </p>
      </CardContent>

      <CardFooter className="p-6 pt-4 border-t border-border/40 mt-auto bg-muted/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-muted-foreground/40" />
          <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
            System log
          </span>
        </div>
        <div className="text-primary font-black text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
          Read more
          <ArrowRight className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
