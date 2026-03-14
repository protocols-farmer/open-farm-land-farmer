//src/components/pages/opportunities/OpportunityCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { OpportunityDto } from "@/lib/features/opportunities/opportunityTypes";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Briefcase,
  Globe,
  ArrowRight,
  Building2,
  CircleDollarSign,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

export default function OpportunityCard({
  opportunity,
}: {
  opportunity: OpportunityDto;
}) {
  const typeLabel = opportunity.type.replace("_", " ").toLowerCase();

  return (
    <Card className="group h-full flex flex-col bg-card border-border/40 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-2xl rounded-[2rem] overflow-hidden relative">
      <CardHeader className="p-7 pb-5">
        <div className="flex items-start gap-5">
          <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-muted/50 border border-border/50 shrink-0 flex items-center justify-center shadow-inner">
            {opportunity.companyLogo ? (
              <Image
                src={opportunity.companyLogo}
                alt={opportunity.companyName}
                fill
                className="object-contain p-2.5 transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <Building2 className="h-7 w-7 text-muted-foreground/20" />
            )}
          </div>

          <div className="space-y-1.5 flex-1 min-w-0">
            <CardTitle className="text-xl font-black tracking-tighter leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
              <Link
                href={`/opportunities/${opportunity.id}`}
                className="after:absolute after:inset-0"
              >
                {opportunity.title}
              </Link>
            </CardTitle>
            <CardDescription className="font-bold text-muted-foreground/80 tracking-tight flex items-center gap-1.5">
              {opportunity.companyName}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-7 flex-grow space-y-6">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-3 text-[13px] font-bold text-muted-foreground/70">
            <div className="p-1.5 rounded-lg bg-muted border border-border/50">
              <MapPin className="h-3.5 w-3.5 text-primary" />
            </div>
            <span>{opportunity.location}</span>
          </div>

          <div className="flex items-center gap-3 text-[13px] font-bold text-muted-foreground/70">
            <div className="p-1.5 rounded-lg bg-muted border border-border/50">
              <Briefcase className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="capitalize">{typeLabel}</span>
          </div>

          {opportunity.salaryRange && (
            <div className="flex items-center gap-3 text-[13px] font-bold text-primary">
              <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20">
                <CircleDollarSign className="h-3.5 w-3.5" />
              </div>
              <span>{opportunity.salaryRange}</span>
            </div>
          )}

          {opportunity.isRemote && (
            <div className="flex items-center gap-3 text-[13px] font-black text-emerald-500 uppercase tracking-widest">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Globe className="h-3.5 w-3.5" />
              </div>
              <span>Fully Remote</span>
            </div>
          )}
        </div>

        {opportunity.tags && opportunity.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {opportunity.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag.tag.id}
                variant="secondary"
                className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-muted/50 border-transparent group-hover:border-primary/20 transition-all"
              >
                #{tag.tag.name}
              </Badge>
            ))}
            {opportunity.tags.length > 3 && (
              <span className="text-[10px] text-muted-foreground/50 font-black uppercase tracking-tighter self-center ml-1">
                +{opportunity.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-7 pt-5 border-t border-border/40 mt-auto bg-muted/5 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 mb-0.5">
            Posted
          </span>
          <span className="text-[11px] text-muted-foreground font-bold italic">
            {formatDistanceToNow(new Date(opportunity.postedAt), {
              addSuffix: true,
            })}
          </span>
        </div>

        <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
          Details
          <ArrowRight className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
