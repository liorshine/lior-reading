"use client"

import { useEffect, useState } from "react"
import ChapterDialog from "./ChapterDialog"
// Kiểu Chapter
export interface Chapter {
  title: string
  content?: string
  images?: string[]
}

// Kiểu Story
export interface Story {
  _id?: string
  title: string
  author: string
  type: "comic" | "novel"
  description?: string
  chapters: Chapter[]
}

interface StoryDialogProps {
  open: boolean
  onClose: () => void
  onSave: (story: Omit<Story, "_id"> & { _id?: string }) => void
  initialData?: Story
}

export default function StoryDialog({
  open,
  onClose,
  onSave,
  initialData,
}: StoryDialogProps) {
  const [form, setForm] = useState<Omit<Story, "_id">>({
    title: "",
    author: "",
    type: "comic",
    description: "",
    chapters: [],
  })

  const [editChapterIndex, setEditChapterIndex] = useState<number | null>(null)
  const [chapterForm, setChapterForm] = useState<Chapter>({ title: "", content: "" })
  const [chapterDialogOpen, setChapterDialogOpen] = useState(false)
  const isEditMode = Boolean(initialData)

  useEffect(() => {
    console.log("Load initialData:", initialData)
    if (initialData) {
      setForm({
        title: initialData.title,
        author: initialData.author,
        type: initialData.type,
        description: initialData.description ?? "",
        chapters: initialData.chapters ?? [],
      })
    } else {
      setForm({
        title: "",
        author: "",
        type: "comic",
        description: "",
        chapters: [],
      })
    }
    setEditChapterIndex(null)
  }, [initialData])

  if (!open) return null

  // Thêm chương mới (chỉ edit)
  const handleAddChapter = () => {
    if (!isEditMode) return
    setForm({
      ...form,
      chapters: [...form.chapters, { title: "", content: "" }],
    })
  }

  // Bắt đầu sửa chương
  const handleEditChapter = (index: number) => {
    setEditChapterIndex(index)
    setChapterDialogOpen(true)
  }

  // Lưu chương sau khi sửa
  const handleSaveChapter = (chapter: Chapter) => {
  if (editChapterIndex === null) return
  const updated = [...form.chapters]
  updated[editChapterIndex] = chapter
  setForm({ ...form, chapters: updated })
  setChapterDialogOpen(false)
  setEditChapterIndex(null)
    }

  // Xóa chương
  const handleDeleteChapter = (index: number) => {
    const updated = [...form.chapters]
    updated.splice(index, 1)
    setForm({ ...form, chapters: updated })
  }

  // Lưu truyện (create hoặc update)
  const handleSaveStory = () => {
    if (isEditMode && initialData?._id) {
        console.log(" Lưu truyện với _id:", initialData._id, form)
      onSave({ ...form, _id: initialData._id }) // gửi kèm _id
    } else {
        console.log("Lưu truyện mới:", form)
      onSave(form) // tạo mới
    }
  }

  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-[1000px] max-w-full max-h-[100vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? "✏️ Sửa Truyện" : "➕ Thêm Truyện"}
        </h2>

        {/* Thông tin cơ bản */}
        <div className="mb-4 flex flex-col gap-2">
          <input
            className="border p-2 rounded w-full"
            placeholder="Tiêu đề"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            className="border p-2 rounded w-full"
            placeholder="Tác giả"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />
          <select
            className="border p-2 rounded w-full"
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value as "comic" | "novel" })
            }
          >
            <option value="comic">Truyện tranh</option>
            <option value="novel">Truyện chữ</option>
          </select>
          {form.type === "novel" && (
            <textarea
              className="border p-2 rounded w-full h-50"
              placeholder="Mô tả"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          )}
        </div>

        {/* Bảng chương */}
        {form.chapters.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Chapters</h3>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Tiêu đề</th>
                  <th className="p-2 border">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {form.chapters.map((chapter, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-2 border">{idx}</td>
                    <td className="p-2 border">{chapter.title || "(Chưa đặt tên)"}</td>
                    <td className="p-2 border flex gap-2">
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                        onClick={() => handleEditChapter(idx)}
                      >
                        Sửa
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded"
                        onClick={() => handleDeleteChapter(idx)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Nút thêm chương (chỉ khi edit) */}
        {isEditMode && (
          <button
            className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleAddChapter}
          >
            + Thêm chương
          </button>
        )}

        {/* Mini form sửa chương */}
        <ChapterDialog
            open={chapterDialogOpen}
            onClose={() => {
                setChapterDialogOpen(false)
                setEditChapterIndex(null)
            }}
            onSave={handleSaveChapter}
            initialData={editChapterIndex !== null ? form.chapters[editChapterIndex] : undefined}
            index={editChapterIndex !== null ? editChapterIndex : undefined}
            />

        {/* Nút hành động chính */}
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-400 text-white"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-500 text-white"
            onClick={handleSaveStory}
          >
            Lưu Truyện
          </button>
        </div>
      </div>
    </div>
  )
}
