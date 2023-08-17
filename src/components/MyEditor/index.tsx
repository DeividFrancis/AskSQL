"use client";

import { highlight, languages } from "prismjs";
import "prismjs/components/prism-sql";
import { ComponentProps, forwardRef } from "react";
import Editor from "react-simple-code-editor";
import "./style.css";

export interface MyEditorProps
  extends Omit<ComponentProps<"textarea">, "value" | "onValueChange"> {
  value: string;
  onValueChange: (value: string) => void;
}

export const MyEditor = forwardRef<any, MyEditorProps>((props, ref) => {
  return (
    <div className="overflow-y-scroll h-44 bg-blueberry-600 border rounded-md border-blueberry-300 px-4 py-3 scrollbar-thumb-white/40 scrollbar-track-transparent scrollbar-thin scrollbar-thumb-rounded-full focus-within:ring-2 focus-within:ring-pistachio">
      {/* @ts-ignore-next-line */}
      <Editor
        {...props}
        ref={ref}
        highlight={(code) => highlight(code, languages.sql, "sql")}
        textareaClassName="outline-none"
        className="font-mono text-white"
      />
    </div>
  );
});

MyEditor.displayName = "MyEditor";
