"use client";

import { useRef, useEffect } from "react";

export interface Block {
  type: "text" | "image";
  content?: string;
  src?: string;
  alt?: string;
}

interface RichEditorProps {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
}

export const RichEditor = ({ blocks, onChange }: RichEditorProps) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    const el = editorRef.current;
    if (!el) return;

    el.innerHTML = "";
    blocks.forEach((block) => {
      if (block.type === "text") {
        const p = document.createElement("p");
        p.textContent = block.content ?? "";
        el.appendChild(p);
      } else if (block.type === "image" && block.src) {
        const img = document.createElement("img");
        img.src = block.src;
        img.alt = block.alt ?? "";
        img.className = "max-w-full my-2 object-contain";
        img.style.height = "200px"; 
        el.appendChild(img);
      }
    });

    initialized.current = true;
  }, [blocks]);

  const handleInput = () => {
    const el = editorRef.current;
    if (!el) return;

    const newBlocks: Block[] = [];
    el.childNodes.forEach((node) => {
      if (node.nodeName === "IMG") {
        const img = node as HTMLImageElement;
        newBlocks.push({ type: "image", src: img.src, alt: img.alt });
      } else {
        const text = (node.textContent ?? "").trim();
        if (text) newBlocks.push({ type: "text", content: text });
      }
    });

    onChange(newBlocks.length ? newBlocks : [{ type: "text", content: "" }]);
  };

  const insertImage = (file: File) => {
    const el = editorRef.current;
    if (!el) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement("img");
      img.src = e.target?.result as string;
      img.alt = file.name;
      img.className = "max-w-full my-2 object-contain";
      img.style.height = "200px";

      const sel = window.getSelection();
      if (!sel || !sel.rangeCount) {
        el.appendChild(img);
        el.appendChild(document.createElement("br"));
      } else {
        const range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(img);

        const br = document.createElement("br");
        range.insertNode(br);
        range.setStartAfter(br);
        range.setEndAfter(br);

        sel.removeAllRanges();
        sel.addRange(range);
      }

      handleInput();
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    Array.from(e.dataTransfer.files).forEach((file) => {
      if (file.type.startsWith("image/")) insertImage(file);
    });
  };

  return (
    <div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="border rounded p-2 min-h-[150px] max-h-[400px] overflow-auto"
        onInput={handleInput}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      />

      <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded cursor-pointer">
        Thêm ảnh
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) insertImage(e.target.files[0]);
          }}
        />
      </button>
    </div>
  );
};
