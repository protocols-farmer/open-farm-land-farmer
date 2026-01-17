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
import { MapPin, Briefcase, Globe, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function OpportunityCard({
  opportunity,
}: {
  opportunity: OpportunityDto;
}) {
  return (
    // FIX 2: Replaced bg-white with bg-card for theme awareness
    <Card className="hover:border-primary/50 transition-colors h-full flex flex-col group bg-card">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="relative h-14 w-14 rounded-lg overflow-hidden bg-muted shrink-0">
            {opportunity.companyLogo && (
              <Image
                src={opportunity.companyLogo}
                alt={`${opportunity.companyName} logo`}
                fill
                className="object-contain p-1"
              />
            )}
          </div>
          <div>
            <CardTitle className="text-lg">
              {/* The Link component now needs a relative position for the stretched link to work correctly within its bounds */}
              <div className="relative">
                {/* FIX 1: Removed the before:... classes that made the link cover the whole card */}
                <Link
                  href={`/opportunities/${opportunity.id}`}
                  className="hover:text-primary transition-colors static before:content-[''] before:absolute before:inset-0"
                >
                  {opportunity.title}
                </Link>
              </div>
            </CardTitle>
            <CardDescription>{opportunity.companyName}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{opportunity.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Briefcase className="h-4 w-4" />
          <span>{opportunity.type.replace("_", " ")}</span>
        </div>
        {opportunity.isRemote && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>Remote Available</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 border-t mt-auto">
        <Button asChild className="w-full" variant="outline">
          <Link href={`/opportunities/${opportunity.id}`}>
            View Opportunity
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
