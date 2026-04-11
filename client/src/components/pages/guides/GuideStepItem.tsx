//src/components/pages/guides/GuideStepItem.tsx
"use client";

import React from "react";
import { PlusCircle, Settings2, Trash2, Edit3, Layers } from "lucide-react";
import {
  GuideStepDto,
  GuideSectionDto,
} from "@/lib/features/guideSection/guideTypes";
import { GuideSectionItem } from "./GuideSectionItem";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import TiptapRenderer from "../posts/TiptapRenderer";

interface GuideStepItemProps {
  step: GuideStepDto;
  index: number;
  isAuthor: boolean;
  onEditStep: () => void;
  onDeleteStep: () => void;
  onAddSection: () => void;
  onEditSection: (section: GuideSectionDto) => void;
  onDeleteSection: (sectionId: string) => void;
}

export default function GuideStepItem({
  step,
  index,
  isAuthor,
  onEditStep,
  onDeleteStep,
  onAddSection,
  onEditSection,
  onDeleteSection,
}: GuideStepItemProps) {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* --- STEP HEADER --- */}
      <div className="relative">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-primary">
              <span className="flex h-6 w-6 items-center justify-center border-2 border-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              Step Module
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {step.title}
            </h2>
          </div>

          {isAuthor && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-none border-3 border-double hover:bg-muted"
                >
                  <Settings2 className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-none border-3 border-double"
              >
                <DropdownMenuItem
                  onClick={onEditStep}
                  className="font-bold text-xs cursor-pointer"
                >
                  <Edit3 className="mr-2 h-4 w-4" /> Edit step
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={onDeleteStep}
                  className="font-bold text-xs text-destructive cursor-pointer"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete step
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* --- STEP BRIEFING --- */}
        <div className="border-l-4 border-primary/20 pl-6 py-2">
          <TiptapRenderer content={step.description} />
        </div>
      </div>

      <div className="flex items-center gap-4 py-2">
        <div className="h-px flex-1 bg-border/40" />
        <Layers className="h-4 w-4 text-muted-foreground/20" />
        <div className="h-px flex-1 bg-border/40" />
      </div>

      {/* --- SECTIONS LIST --- */}
      <div className="space-y-12">
        {step.sections && step.sections.length > 0 ? (
          <div className="space-y-12">
            {step.sections.map((section, sIndex) => (
              <GuideSectionItem
                key={section.id}
                section={section}
                index={sIndex}
                isAuthor={isAuthor}
                onEdit={() => onEditSection(section)}
                onDelete={() => onDeleteSection(section.id)}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 flex flex-col items-center justify-center border-3 border-dashed border-border/30 bg-muted/10">
            <p className="text-sm font-medium text-muted-foreground">
              No sections have been added to this step yet.
            </p>
          </div>
        )}

        {isAuthor && (
          <div className="flex justify-center pt-6">
            <Button
              variant="outline"
              onClick={onAddSection}
              className="rounded-none border-3 border-double h-11 px-8 font-bold hover:bg-primary/5 transition-colors"
            >
              <PlusCircle className="mr-2 h-4 w-4 text-primary" />
              Add section
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
