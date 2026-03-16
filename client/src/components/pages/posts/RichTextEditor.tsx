//src/components/RichTextEditor.tsx
"use client";

import "highlight.js/styles/github-dark.css";

import React, { useEffect } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Link from "@tiptap/extension-link";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Underline from "@tiptap/extension-underline";

import Placeholder from "@tiptap/extension-placeholder";

import { createLowlight } from "lowlight";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";

import MenuBar from "./MenuBar";

const lowlight = createLowlight();
lowlight.register({ xml });
lowlight.register({ css });
lowlight.register({ javascript });
lowlight.register({ typescript });
lowlight.registerAlias({ xml: ["html"] });

interface RichTextEditorProps {
  initialContent?: string;
  onChange: (htmlContent: string) => void;
}

function RichTextEditor({
  initialContent = "",
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: "Write actual content here... and be brief! :)",
        emptyEditorClass: "is-editor-empty",
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
      Image,
      TaskList,
      TaskItem.configure({ nested: true }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: "https",
      }),
      Color,
      TextStyle,
      Underline,

      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "plaintext",
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert max-w-none focus:outline-none min-h-[50vh] p-5",
      },
    },
    onUpdate: ({ editor: currentEditor }: { editor: Editor }) => {
      onChange(currentEditor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && editor.isEditable) {
      const currentEditorHTML = editor.getHTML();

      if (currentEditorHTML !== initialContent) {
        editor.commands.setContent(initialContent, false);
      }
    }
  }, [initialContent, editor]);

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  if (!editor) {
    return null;
  }
  return (
    <div className="flex flex-col h-full w-full  border">
      {/* The MenuBar wrapper. It will never shrink vertically. 
        It will grow taller if its content wraps. */}
      <div className="flex-shrink-0 border-b">
        <MenuBar editor={editor} />
      </div>

      {/* The Editor Content wrapper. It will grow to fill ALL remaining
        vertical space and will scroll internally if its content is too long. */}
      <div className="flex-grow overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default RichTextEditor;
