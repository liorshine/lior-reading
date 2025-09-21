"use client";

import { useState } from "react";
import { RichEditor, Block } from "@/components/ui/RichEditor";

interface Chapter {
  title: string;
  blocks: Block[];
}

interface StoryUpload {
  storyTitle: string;
  type: "TEXT" | "COMIC";
  chapters: Chapter[];
}

export default function UploadStoryPage() {
  const [storyTitle, setStoryTitle] = useState("");
  const [storyType, setStoryType] = useState<"TEXT" | "COMIC">("TEXT");
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const addChapter = () =>
    setChapters([...chapters, { title: "", blocks: [{ type: "text", content: "" }] }]);

  const removeChapter = (idx: number) =>
    setChapters(chapters.filter((_, i) => i !== idx));

  const handleTitleChange = (idx: number, value: string) => {
    const newChapters = [...chapters];
    newChapters[idx].title = value;
    setChapters(newChapters);
  };

  const handleSubmit = () => {
    const storyData: StoryUpload = {
      storyTitle,
      type: storyType,
      chapters,
    };
    console.log("Story uploaded:", storyData);
    alert("Story uploaded! Kiểm tra console để xem kết quả.");
  };

  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Upload New Story</h1>

      {/* Story Info */}
      <div className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Story Title"
          className="px-4 py-2 border rounded w-full"
          value={storyTitle}
          onChange={(e) => setStoryTitle(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded w-full"
          value={storyType}
          onChange={(e) => setStoryType(e.target.value as "TEXT" | "COMIC")}
        >
          <option value="TEXT">Truyện chữ</option>
          <option value="COMIC">Truyện tranh</option>
        </select>
      </div>

      {/* Chapters */}
      <div className="space-y-6">
        {chapters.map((chapter, idx) => (
          <div key={idx} className="border p-4 rounded">
            <div className="flex justify-between items-center mb-2">
              <input
                type="text"
                placeholder="Chapter Title"
                className="px-2 py-1 border rounded w-full"
                value={chapter.title}
                onChange={(e) => handleTitleChange(idx, e.target.value)}
              />
              <button
                onClick={() => removeChapter(idx)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
              >
                X
              </button>
            </div>

            <RichEditor
            blocks={chapter.blocks}
            onChange={(newBlocks: Block[]) => {
              const newChapters = [...chapters];
              newChapters[idx].blocks = newBlocks;
              setChapters(newChapters);
            }}
          />

          </div>
        ))}
      </div>

      <div className="mt-6 space-x-2">
        <button
          onClick={addChapter}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          + Add Chapter
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Submit Story
        </button>
      </div>
    </main>
  );
}
