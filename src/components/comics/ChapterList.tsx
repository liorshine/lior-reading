"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/ui/card";

interface Chapter {
  id: number;
  title: string;
}

export default function ChapterList({
  comic,
  onSelect,
  onBack,
}: {
  comic: { id: number; title: string };
  onSelect: (chapter: Chapter) => void;
  onBack: () => void;
}) {
  const [chapters] = useState<Chapter[]>([
    { id: 1, title: "Chapter 100 - Wano Arc" },
    { id: 2, title: "Chapter 101 - Next Arc" },
  ]);

  return (
    <div className="p-4">
      <Button onClick={onBack} className="mb-4">← Quay lại</Button>
      <h2 className="text-xl font-bold mb-4">{comic.title} - Chapters</h2>

      <div className="space-y-2">
        {chapters.map((ch) => (
          <Card key={ch.id} className="flex items-center justify-between p-4">
            <CardContent className="p-0">{ch.title}</CardContent>
            <Button onClick={() => onSelect(ch)}>Upload Pages</Button>
          </Card>
        ))}
      </div>

      <Button className="mt-4">+ Thêm Chapter</Button>
    </div>
  );
}
