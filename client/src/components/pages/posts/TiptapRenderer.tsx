//src/components/pages/posts/TiptapRenderer.tsx
"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// Extensions (Must match your RichTextEditor.tsx)
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

// Highlighting Engine
import { createLowlight, common } from "lowlight";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";

const lowlight = createLowlight(common);
lowlight.register({ xml, css, javascript, typescript });

interface TiptapRendererProps {
  content: string;
}

export default function TiptapRenderer({ content }: TiptapRendererProps) {
  const editor = useEditor({
    // THE MAGIC LINE: Disables all editing capabilities
    editable: false,
    content: content,
    extensions: [
      StarterKit.configure({
        // codeBlock: false, // Handled by Lowlight below
      }),
      Typography,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        HTMLAttributes: { class: "text-primary underline cursor-pointer" },
      }),
      Image.configure({
        HTMLAttributes: { class: "rounded-lg max-w-full border shadow-sm" },
      }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({ lowlight }),
    ] as any,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none focus:outline-none break-words",
      },
    },
    // Important for Next.js hydration
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="tiptap-renderer-container w-full overflow-x-auto overflow-y-hidden custom-scrollbar">
      {" "}
      <EditorContent editor={editor} />
    </div>
  );
}
