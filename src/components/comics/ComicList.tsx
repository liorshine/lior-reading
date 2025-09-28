"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Comic {
  id: number;
  title: string;
  cover: string;
  chapters: number;
}

export default function ComicList({ onSelect }: { onSelect: (comic: Comic) => void }) {
  const [comics] = useState<Comic[]>([
    { id: 1, title: "One Piece", cover: "/covers/onepiece.jpg", chapters: 100 },
    { id: 2, title: "Naruto", cover: "/covers/naruto.jpg", chapters: 700 },
  ]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {comics.map((comic) => (
        <Card key={comic.id} className="cursor-pointer" onClick={() => onSelect(comic)}>
          <CardHeader>
            <CardTitle>{comic.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={comic.cover} alt={comic.title} className="w-full h-48 object-cover rounded mb-2" />
            <p>{comic.chapters} chapters</p>
          </CardContent>
        </Card>
      ))}
      <Card className="flex items-center justify-center cursor-pointer">
        <CardContent>
          <Button>+ Thêm Truyện</Button>
        </CardContent>
      </Card>
    </div>
  );
}
