"use client";

import { useState } from "react";
import * as React from "react";
import { storyData, StoryWithChapters, Story } from "@/components/data/Storydata";

interface Props {
  params: Promise<{ id: string }>;
}

export default function StoryPage({ params }: Props) {
  const { id } = React.use(params); // unwrap param
  const storyWithChapters: StoryWithChapters | undefined = storyData[id];
  const chapterIds = storyWithChapters ? Object.keys(storyWithChapters.chapters) : [];
  const [currentChapterId, setCurrentChapterId] = useState<string | null>(
    chapterIds.length > 0 ? chapterIds[0] : null
  );

  if (!storyWithChapters || !currentChapterId) {
    return (
      <div className="container mx-auto py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Story not found</h1>
        <a href="/reading" className="text-blue-500 hover:underline">
          ← Back to Reading List
        </a>
      </div>
    );
  }

  const chapter: Story = storyWithChapters.chapters[currentChapterId];

  return (
    <main className="container mx-auto py-24 px-4">
      <h1 className="text-4xl font-bold mb-6">{storyWithChapters.storyTitle}</h1>

      {/* Dropdown chọn chapter */}
      <div className="mb-6">
        <label className="mr-4 font-semibold">Select Chapter:</label>
        <select
          className="px-4 py-2 border rounded-lg"
          value={currentChapterId}
          onChange={(e) => setCurrentChapterId(e.target.value)}
        >
          {chapterIds.map((chapId) => (
            <option key={chapId} value={chapId}>
              {storyWithChapters.chapters[chapId].title}
            </option>
          ))}
        </select>
      </div>

      {/* Hiển thị blocks */}
      <div className="space-y-6">
        {chapter.blocks.map((block, idx) => {
          if (block.type === "text") {
            return (
              <p key={idx} className="text-gray-700 leading-relaxed whitespace-pre-line">
                {block.content}
              </p>
            );
          }

          if (block.type === "image") {
            return (
              <img
                key={idx}
                src={block.src}
                alt={block.alt || `${chapter.title} - ${idx + 1}`}
                className="w-full shadow-md object-cover"
              />
            );
          }

          return null;
        })}
      </div>

      <a href="/reading" className="inline-block mt-8 text-blue-500 hover:underline">
        ← Back to Reading List
      </a>
    </main>
  );
}
