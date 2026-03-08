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
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Globe, ArrowRight, Building2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function OpportunityCard({
  opportunity,
}: {
  opportunity: OpportunityDto;
}) {
  return (
    <Card className="group h-full flex flex-col bg-card border-border hover:border-primary/40 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl rounded-2xl overflow-hidden relative">
      <CardHeader className="p-6 pb-4">
        <div className="flex items-start gap-4">
          <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-muted border border-border/50 shrink-0 flex items-center justify-center">
            {opportunity.companyLogo ? (
              <Image
                src={opportunity.companyLogo}
                alt={opportunity.companyName}
                fill
                className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <Building2 className="h-6 w-6 text-muted-foreground/30" />
            )}
          </div>
          <div className="space-y-1 flex-1 min-w-0">
            <CardTitle className="text-xl font-bold tracking-tight line-clamp-2 group-hover:text-primary transition-colors">
              <Link
                href={`/opportunities/${opportunity.id}`}
                className="after:absolute after:inset-0 "
              >
                {opportunity.title}{" "}
              </Link>
            </CardTitle>
            <CardDescription className="font-semibold text-muted-foreground">
              {opportunity.companyName}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 flex-grow space-y-5">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{opportunity.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Briefcase className="h-4 w-4 text-primary" />
            <span>{opportunity.type.replace("_", " ").toLowerCase()}</span>
          </div>
          {opportunity.isRemote && (
            <div className="flex items-center gap-2 text-sm font-bold text-primary">
              <Globe className="h-4 w-4" />
              <span>Remote available</span>
            </div>
          )}
        </div>

        {opportunity.tags && opportunity.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {opportunity.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag.tag.id}
                variant="outline"
                className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-muted/50 border-border group-hover:border-primary/20 transition-colors"
              >
                {tag.tag.name}
              </Badge>
            ))}
            {opportunity.tags.length > 3 && (
              <span className="text-[10px] text-muted-foreground font-bold self-center">
                +{opportunity.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-4 border-t border-border/40 mt-auto bg-muted/5 flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
          {formatDistanceToNow(new Date(opportunity.postedAt), {
            addSuffix: true,
          })}
        </span>
        <div className="text-primary font-black text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
          View details
          <ArrowRight className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
