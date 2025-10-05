"use client"

import { useEffect, useState } from "react"
import * as React from "react"
import { Chapter, Story } from "@/types/story"

interface Props {
  params: Promise<{ id: string }> 
}

export default function StoryPage({ params }: Props) {
  const { id } = React.use(params)

  const [story, setStory] = useState<Story | null>(null)
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await fetch(`/api/stories/${id}`)
        const data = await res.json()
        console.log("📖 Story data:", data)

        setStory(data.story)
        if (data.story?.chapters?.length > 0) {
          setCurrentChapter(data.story.chapters[0])
        }
      } catch (err) {
        console.error("❌ Lỗi fetch story:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchStory()
  }, [id])

  if (loading) {
    return <div className="p-6 text-center">⏳ Đang tải truyện...</div>
  }

  if (!story) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">❌ Truyện không tồn tại</h1>
        <a href="/reading" className="text-blue-500 hover:underline">
          ← Quay lại danh sách
        </a>
      </div>
    )
  }

  // ✅ Luôn có mảng chapters
  const chapters = story.chapters ?? []
  const currentIndex = currentChapter
    ? chapters.findIndex((c) => c._id === currentChapter._id)
    : -1

  // ✅ Hàm đổi chương + scroll top
  const goToChapter = (chapter: Chapter | null) => {
    if (chapter) {
      setCurrentChapter(chapter)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <main className="container mx-auto py-24 px-4">
      <h1 className="text-4xl font-bold mb-6">{story.title}</h1>
      <p className="mb-4 text-gray-600">Tác giả: {story.author}</p>

      {/* Dropdown chọn chapter */}
      {chapters.length > 0 && (
        <div className="mb-6">
          <label className="mr-4 font-semibold">Chọn chương:</label>
          <select
            className="px-4 py-2 border rounded-lg"
            value={currentChapter?._id || ""}
            onChange={(e) => {
              const chap = chapters.find((c) => c._id === e.target.value) || null
              goToChapter(chap)
            }}
          >
            {chapters.map((chap) => (
              <option key={chap._id} value={chap._id}>
                {chap.title}
              </option>
            ))}
          </select>

          {/* ✅ Nút điều hướng ở đầu trang */}
          <div className="flex justify-between mt-4">
            {currentIndex > 0 && (
              <button
                onClick={() => goToChapter(chapters[currentIndex - 1])}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                ← Chương trước
              </button>
            )}

            {currentIndex < chapters.length - 1 && (
              <button
                onClick={() => goToChapter(chapters[currentIndex + 1])}
                className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Chương tiếp theo →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Nội dung chương */}
      {currentChapter && (
        <div className="space-y-6">
          {story.type === "novel" && (
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {currentChapter.content}
            </p>
          )}

          {story.type === "comic" &&
            currentChapter.images?.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`${currentChapter.title} - ${idx + 1}`}
                className="w-full shadow-md object-cover"
              />
            ))}

          {/* ✅ Điều hướng ở cuối trang */}
          <div className="flex justify-between mt-8">
            {currentIndex > 0 && (
              <button
                onClick={() => goToChapter(chapters[currentIndex - 1])}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                ← Chương trước
              </button>
            )}

            {currentIndex < chapters.length - 1 && (
              <button
                onClick={() => goToChapter(chapters[currentIndex + 1])}
                className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Chương tiếp theo →
              </button>
            )}
          </div>
        </div>
      )}

      <a href="/reading" className="inline-block mt-8 text-blue-500 hover:underline">
        ← Quay lại danh sách
      </a>
    </main>
  )
}
