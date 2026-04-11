//src/components/pages/posts/RichTextEditor.tsx
"use client";

import React, { useEffect } from "react";

import { useEditor, EditorContent, Editor } from "@tiptap/react";

import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";

import BubbleMenuExtension from "@tiptap/extension-bubble-menu";
import FloatingMenuExtension from "@tiptap/extension-floating-menu";
import { Table } from "@tiptap/extension-table";
import { TextStyle } from "@tiptap/extension-text-style";

import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import CharacterCount from "@tiptap/extension-character-count";
import Gapcursor from "@tiptap/extension-gapcursor";
import Dropcursor from "@tiptap/extension-dropcursor";
import FileHandler from "@tiptap/extension-file-handler";

import { createLowlight } from "lowlight";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";

import MenuBar from "./MenuBar";
import {
  Bold,
  Italic,
  List,
  Heading2,
  Code,
  Link as LinkIcon,
} from "lucide-react";

const lowlight = createLowlight();
lowlight.register({ xml, css, javascript, typescript });

interface RichTextEditorProps {
  initialContent?: string;
  onChange: (htmlContent: string) => void;
}

export default function RichTextEditor({
  initialContent = "",
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: { levels: [1, 2, 3] },
      }),

      BubbleMenuExtension,
      FloatingMenuExtension,
      Typography,
      Gapcursor,
      Dropcursor.configure({ color: "oklch(var(--primary))", width: 2 }),
      CharacterCount.configure({ limit: 5000 }),
      Placeholder.configure({
        placeholder: "Start typing...",
        emptyEditorClass: "is-editor-empty",
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: true }),
      Underline,
      TextStyle,
      Color,
      Image.configure({
        HTMLAttributes: { class: "rounded-lg max-w-full border shadow-sm" },
      }),
      FileHandler.configure({
        allowedMimeTypes: [
          "image/png",
          "image/jpeg",
          "image/gif",
          "image/webp",
        ],
        onDrop: (currentEditor: Editor, files: File[], pos: number) => {
          files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(pos, {
                  type: "image",
                  attrs: { src: reader.result },
                })
                .focus()
                .run();
            };
            reader.readAsDataURL(file);
          });
        },
        onPaste: (currentEditor: Editor, files: File[]) => {
          files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
              currentEditor
                .chain()
                .insertContent({
                  type: "image",
                  attrs: { src: reader.result },
                })
                .focus()
                .run();
            };
            reader.readAsDataURL(file);
          });
        },
      }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { class: "text-primary underline cursor-pointer" },
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({ lowlight }),
    ] as any,
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none focus:outline-none min-h-[50vh] p-5",
      },
    },
    onUpdate: ({ editor: updatedEditor }) => {
      onChange(updatedEditor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent, { emitUpdate: false });
    }
  }, [initialContent, editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-col h-full w-full border bg-background rounded-lg overflow-hidden shadow-sm relative">
      <div className="shrink-0 border-b bg-card sticky top-0 z-10">
        <MenuBar editor={editor} />
      </div>

      <div className="grow overflow-y-auto bg-background custom-scrollbar">
        {/* BUBBLE MENU */}
        <BubbleMenu
          editor={editor}
          options={{
            placement: "top",
            strategy: "fixed",
          }}
          className="flex bg-popover border rounded-md shadow-xl overflow-hidden z-10"
        >
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 hover:bg-accent ${editor.isActive("bold") ? "text-primary" : ""}`}
          >
            <Bold size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 hover:bg-accent ${editor.isActive("italic") ? "text-primary" : ""}`}
          >
            <Italic size={16} />
          </button>
          <button
            type="button"
            onClick={() => {
              const url = window.prompt("URL");
              if (url)
                (editor.chain().focus() as any).setLink({ href: url }).run();
            }}
            className="p-2 hover:bg-accent"
          >
            <LinkIcon size={16} />
          </button>
        </BubbleMenu>

        {/* FLOATING MENU */}
        <FloatingMenu
          editor={editor}
          options={{
            placement: "top",
            strategy: "fixed",
          }}
          className="flex gap-1 bg-popover border rounded-md shadow-lg p-1 z-10"
        >
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className="p-2 hover:bg-accent rounded"
          >
            <Heading2 size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="p-2 hover:bg-accent rounded"
          >
            <List size={16} />
          </button>
          <button
            type="button"
            onClick={() =>
              (editor.chain().focus() as any).toggleCodeBlock().run()
            }
            className="p-2 hover:bg-accent rounded"
          >
            <Code size={16} />
          </button>
        </FloatingMenu>

        <EditorContent editor={editor} />
      </div>

      <div className="flex justify-between items-center px-4 py-2 border-t text-xs text-muted-foreground bg-card/50">
        <div>{editor.storage.characterCount.words()} words</div>
        <div>
          {editor.storage.characterCount.characters()} / 5000 characters
        </div>
      </div>
    </div>
  );
}
