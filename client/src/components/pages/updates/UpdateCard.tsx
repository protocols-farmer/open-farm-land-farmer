//src/components/pages/updates/UpdateCard.tsx
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
import { Button } from "@/components/ui/button";
// const cleanPreview = (content: string) => {
//     return content
//       .replace(/[#*`_~]/g, '') // Remove headers, bold, code, etc.
//       .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Keep link text, remove URL
//       .trim();
//   };
export default function UpdateCard({ update }: { update: UpdateDto }) {
  return (
    <Card className="group h-full rounded-none border-3 border-double flex flex-col bg-card   transition-all duration-300 hover:-translate-y-1.5    overflow-hidden relative">
      <CardHeader className="p-6 pb-4">
        <div className="flex justify-between items-start mb-4">
          <Badge
            variant="outline"
            className=" font-bold px-2.5 py-1 rounded-none"
          >
            {update.category.replace("_", " ").toLowerCase()}
          </Badge>
          {update.version && (
            <Badge
              variant="secondary"
              className=" rounded-none font-bold text-primary  border-none"
            >
              {update.version.toLowerCase().startsWith("v")
                ? update.version
                : `v${update.version}`}{" "}
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl font-bold  group-hover:text-primary transition-colors leading-snug">
          <h3>{update.title}</h3>
        </CardTitle>
        <CardDescription className="text-xs font-medium text-muted-foreground pt-1">
          Published {format(new Date(update.publishedAt), "MMMM d, yyyy")}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 grow">
        <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
          {update.content}
        </p>
      </CardContent>

      <CardFooter className=" p-6 border-t-3  flex items-center justify-between">
        <Button variant="outline" className="rounded-none border-3 w-full">
          <Link
            href={`/updates/${update.id}`}
            className=" gap-2 text-sm font-bold w-full text-center"
          >
            Read more
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
