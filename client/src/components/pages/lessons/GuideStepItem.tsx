//src/components/pages/guides/GuideStepItem.tsx

"use client";

import React from "react";
import { GuideStepDto } from "@/lib/features/guideSection/guideTypes"; // Assuming types are in a shared folder
import { GuideSectionItem } from "./GuideSectionItem"; // It will import its child component
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Edit, Trash } from "lucide-react";
import DOMPurify from "dompurify";

interface GuideStepItemProps {
  step: GuideStepDto;
  index: number;
  isAuthor: boolean;
  onEditStep: () => void;
  onDeleteStep: () => void;
  onAddSection: () => void;
  onEditSection: (section: GuideStepDto["sections"][0]) => void;
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
  // Sanitize the step description to safely render HTML from Tiptap
  const sanitizedDescription = step.description
    ? DOMPurify.sanitize(step.description)
    : null;

  return (
    <div
      id={`step-${step.id}`}
      className="scroll-mt-24 space-y-4 py-6 border-b last:border-b-0"
    >
      <div className="flex justify-between items-start gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">Step {index + 1}</p>
          <h2 className="text-3xl font-bold tracking-tight">{step.title}</h2>
          {/* Render the sanitized rich text description */}
          {sanitizedDescription && (
            <div
              className="mt-2 text-lg text-muted-foreground prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />
          )}
        </div>
        {isAuthor && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 flex-shrink-0"
              >
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEditStep}>
                <Edit className="mr-2 h-4 w-4" /> Edit Step
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onDeleteStep}
                className="text-destructive focus:text-destructive"
              >
                <Trash className="mr-2 h-4 w-4" /> Delete Step
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {step.sections.map((section) => (
        <GuideSectionItem
          key={section.id}
          section={section}
          isAuthor={isAuthor}
          onEdit={() => onEditSection(section)}
          onDelete={() => onDeleteSection(section.id)}
        />
      ))}

      {isAuthor && (
        <div className="pl-12 pt-4">
          <Button variant="outline" onClick={onAddSection}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Section to this Step
          </Button>
        </div>
      )}
    </div>
  );
}
