"use client";

import React, { useState } from "react";
import { Editor } from "@tiptap/react";

import "@tiptap/extension-link";
import "@tiptap/extension-color";
import "@tiptap/extension-text-style";
import "@tiptap/extension-underline";
import "@tiptap/extension-highlight";
import "@tiptap/extension-text-align";
import "@tiptap/extension-table";
import "@tiptap/extension-task-list";
import "@tiptap/extension-code-block-lowlight";
import "@tiptap/extension-image";

import {
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Strikethrough,
  Underline,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  ListChecks,
  Quote,
  Code,
  Minus,
  Undo,
  Redo,
  Image as ImageIcon,
  Link as LinkIcon,
  Paintbrush,
  Table as TableIcon,
  Trash2,
  Columns,
  Rows,
  CornerDownLeft,
  Pilcrow,
  Eraser,
  X,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface IconButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  Icon: React.ElementType;
  label: string;
  className?: string;
}

function IconButton({
  onClick,
  isActive,
  disabled,
  Icon,
  label,
  className,
}: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "p-2 transition-all rounded-md disabled:opacity-30",
        "hover:bg-accent hover:text-accent-foreground",
        isActive
          ? "bg-primary text-primary-foreground shadow-inner"
          : "text-foreground",
        className,
      )}
      title={label}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}

export default function MenuBar({ editor }: { editor: Editor | null }) {
  const [isLinking, setIsLinking] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  if (!editor) return null;

  const handleLinkSubmit = () => {
    if (linkUrl === "") {
      (editor.chain().focus() as any).extendMarkRange("link").unsetLink().run();
    } else {
      (editor.chain().focus() as any)
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
    }
    setIsLinking(false);
    setLinkUrl("");
  };

  return (
    <div className="flex flex-wrap items-center gap-0.5 p-1 bg-card z-0">
      {/* Link Input Mode */}
      {isLinking ? (
        <div className="flex items-center gap-2 px-2 py-1 animate-in fade-in slide-in-from-top-1 w-full max-w-sm">
          <input
            autoFocus
            className="flex-1 bg-background border rounded px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-primary"
            placeholder="https://..."
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLinkSubmit()}
          />
          <IconButton
            onClick={handleLinkSubmit}
            Icon={Check}
            label="Apply"
            className="text-green-600"
          />
          <IconButton
            onClick={() => setIsLinking(false)}
            Icon={X}
            label="Cancel"
            className="text-destructive"
          />
        </div>
      ) : (
        <>
          {/* --- History Group --- */}
          <div className="flex items-center">
            <IconButton
              onClick={() => editor.chain().focus().undo().run()}
              Icon={Undo}
              label="Undo"
              disabled={!editor.can().undo()}
            />
            <IconButton
              onClick={() => editor.chain().focus().redo().run()}
              Icon={Redo}
              label="Redo"
              disabled={!editor.can().redo()}
            />
            <IconButton
              onClick={() =>
                editor.chain().focus().unsetAllMarks().clearNodes().run()
              }
              Icon={Eraser}
              label="Clear Formatting"
            />
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* --- Marks Group --- */}
          <div className="flex items-center">
            <IconButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive("bold")}
              Icon={Bold}
              label="Bold"
            />
            <IconButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive("italic")}
              Icon={Italic}
              label="Italic"
            />
            <IconButton
              onClick={() =>
                (editor.chain().focus() as any).toggleUnderline().run()
              }
              isActive={editor.isActive("underline")}
              Icon={Underline}
              label="Underline"
            />
            <IconButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive("strike")}
              Icon={Strikethrough}
              label="Strikethrough"
            />
            <IconButton
              onClick={() =>
                (editor.chain().focus() as any).toggleHighlight().run()
              }
              isActive={editor.isActive("highlight")}
              Icon={Highlighter}
              label="Highlight"
            />

            {/* Color Picker */}
            <div className="flex items-center px-2 border-l ml-1">
              <Paintbrush className="w-4 h-4 mr-1 opacity-50" />
              <input
                type="color"
                onInput={(e) =>
                  (editor.chain().focus() as any)
                    .setColor((e.target as HTMLInputElement).value)
                    .run()
                }
                value={editor.getAttributes("textStyle").color || "#000000"}
                className="w-5 h-5 cursor-pointer bg-transparent border-none appearance-none"
              />
            </div>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* --- Nodes Group --- */}
          <div className="flex items-center">
            <IconButton
              onClick={() => editor.chain().focus().setParagraph().run()}
              isActive={editor.isActive("paragraph")}
              Icon={Pilcrow}
              label="Paragraph"
            />
            <IconButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              isActive={editor.isActive("heading", { level: 1 })}
              Icon={Heading1}
              label="H1"
            />
            <IconButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              isActive={editor.isActive("heading", { level: 2 })}
              Icon={Heading2}
              label="H2"
            />
            <IconButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              isActive={editor.isActive("heading", { level: 3 })}
              Icon={Heading3}
              label="H3"
            />
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* --- Alignment Group --- */}
          <div className="flex items-center">
            <IconButton
              onClick={() =>
                (editor.chain().focus() as any).setTextAlign("left").run()
              }
              isActive={editor.isActive({ textAlign: "left" })}
              Icon={AlignLeft}
              label="Left"
            />
            <IconButton
              onClick={() =>
                (editor.chain().focus() as any).setTextAlign("center").run()
              }
              isActive={editor.isActive({ textAlign: "center" })}
              Icon={AlignCenter}
              label="Center"
            />
            <IconButton
              onClick={() =>
                (editor.chain().focus() as any).setTextAlign("right").run()
              }
              isActive={editor.isActive({ textAlign: "right" })}
              Icon={AlignRight}
              label="Right"
            />
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* --- Lists & Links Group --- */}
          <div className="flex items-center">
            <IconButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive("bulletList")}
              Icon={List}
              label="Bullet List"
            />
            <IconButton
              onClick={() =>
                (editor.chain().focus() as any).toggleTaskList().run()
              }
              isActive={editor.isActive("taskList")}
              Icon={ListChecks}
              label="Task List"
            />
            <IconButton
              onClick={() => {
                setLinkUrl(editor.getAttributes("link").href || "");
                setIsLinking(true);
              }}
              isActive={editor.isActive("link")}
              Icon={LinkIcon}
              label="Link"
            />
          </div>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* --- Insert Group --- */}
          <div className="flex items-center">
            <IconButton
              onClick={() =>
                (editor.chain().focus() as any)
                  .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                  .run()
              }
              Icon={TableIcon}
              label="Table"
            />
            <IconButton
              onClick={() =>
                (editor.chain().focus() as any).toggleCodeBlock().run()
              }
              isActive={editor.isActive("codeBlock")}
              Icon={Code}
              label="Code Block"
            />
            <IconButton
              onClick={() => {
                const url = window.prompt("Image URL");
                if (url)
                  (editor.chain().focus() as any).setImage({ src: url }).run();
              }}
              Icon={ImageIcon}
              label="Image"
            />
            <IconButton
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              Icon={Minus}
              label="Horizontal Rule"
            />
          </div>

          {/* --- Table Actions (Dynamic) --- */}
          {(editor as any).can().deleteTable?.() && (
            <div className="flex items-center border-l ml-1 pl-1 bg-primary/10 rounded animate-in fade-in zoom-in-95">
              <IconButton
                onClick={() =>
                  (editor.chain().focus() as any).deleteTable().run()
                }
                Icon={Trash2}
                label="Delete Table"
                className="text-destructive"
              />
              <IconButton
                onClick={() =>
                  (editor.chain().focus() as any).addColumnAfter().run()
                }
                Icon={Columns}
                label="Add Column"
              />
              <IconButton
                onClick={() =>
                  (editor.chain().focus() as any).addRowAfter().run()
                }
                Icon={Rows}
                label="Add Row"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
