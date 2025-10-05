"use client"

import { useState, useEffect } from "react"
import { Chapter } from "@/types/story"
interface ChapterDialogProps {
  open: boolean
  onClose: () => void
  onSave: (chapter: Chapter) => void
  initialData?: Chapter
  index?: number
}

export default function ChapterDialog({
  open,
  onClose,
  onSave,
  initialData,
  index,
}: ChapterDialogProps) {
  const [chapterForm, setChapterForm] = useState<Chapter>({
    title: "",
    content: "",
    images: [],
  })

  useEffect(() => {
    if (initialData) {
      setChapterForm(initialData)
    } else {
      setChapterForm({ title: "", content: "", images: [] })
    }
  }, [initialData])

  if (!open) return null

  const handleSave = () => {
    console.log("💾 Lưu chương:", index, chapterForm)
    onSave(chapterForm)
  }

  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white border-2 p-6 rounded shadow-md w-[1000px] max-h-[100vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">
          {index !== undefined ? `✏️ Sửa chương #${index}` : "➕ Thêm chương"}
        </h2>

        <input
          className="border p-2 rounded w-full mb-2"
          placeholder="Tiêu đề chương"
          value={chapterForm.title}
          onChange={(e) => setChapterForm({ ...chapterForm, title: e.target.value })}
        />

        <textarea
          className="border p-2 rounded w-full mb-2 h-180"
          placeholder="Nội dung chương"
          value={chapterForm.content}
          onChange={(e) => setChapterForm({ ...chapterForm, content: e.target.value })}
        />

        {/* Nếu sau này có images thì xử lý thêm ở đây */}

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 rounded bg-gray-400 text-white"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-500 text-white"
            onClick={handleSave}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  )
}
