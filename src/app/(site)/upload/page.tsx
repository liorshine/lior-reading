// "use client";

// import { useState } from "react";
// import { Button } from "@/components/Button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export default function UploadPages() {
//   const [files, setFiles] = useState<File[]>([]);
//   const [previews, setPreviews] = useState<string[]>([]);

//   // chọn nhiều file
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     const newFiles = Array.from(e.target.files);
//     setFiles(newFiles);

//     // tạo preview
//     const previewUrls = newFiles.map((file) => URL.createObjectURL(file));
//     setPreviews(previewUrls);
//   };

//   // gọi API upload
//   const handleUpload = async () => {
//     if (files.length === 0) return;

//     const formData = new FormData();
//     files.forEach((file) => formData.append("files", file));

//     try {
//       const res = await fetch("/api/v1/upload-pages/1", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Upload failed");
//       alert("Upload thành công!");
//     } catch (error) {
//       console.error(error);
//       alert("Upload thất bại!");
//     }
//   };

//   return (
//     <Card className="max-w-3xl mx-auto mt-6">
//       <CardHeader>
//         <CardTitle>Upload Pages (Chapter 1)</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={handleFileChange}
//           className="mb-4"
//         />

//         {previews.length > 0 && (
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
//             {previews.map((src, idx) => (
//               <img
//                 key={idx}
//                 src={src}
//                 alt={`page-${idx}`}
//                 className="w-full h-48 object-cover rounded"
//               />
//             ))}
//           </div>
//         )}

//         <Button onClick={handleUpload} disabled={files.length === 0}>
//           Upload
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }


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