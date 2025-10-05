"use client"

import { useEffect, useState } from "react"
import axios from "axios"

interface Chapter {
  title: string
  content?: string
  images?: string[]
}

interface Story {
  _id: string
  title: string
  author: string
  type: "comic" | "novel"   // 👈 backend trả về đúng 2 loại này
  description?: string
  chapters: Chapter[]
}

interface StorySummary {
  id: string
  title: string
  type: "comic" | "novel"   // 👈 giữ nguyên như backend
  description?: string
}

export default function ReadingPage() {
  const [stories, setStories] = useState<StorySummary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get<{ success: boolean; stories: Story[] }>("/api/stories")
        console.log("📚 Stories từ backend:", res.data)

        const summaries: StorySummary[] = res.data.stories.map((story) => ({
          id: story._id,
          title: story.title,
          type: story.type, // 👈 lấy thẳng từ backend
          description: story.description,
        }))

        setStories(summaries)
      } catch (error) {
        console.error("❌ Lỗi fetch stories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStories()
  }, [])

  if (loading) {
    return (
      <main className="container mx-auto py-24 px-4 text-center">
        <p>Đang tải truyện...</p>
      </main>
    )
  }

  return (
    <main className="container mx-auto py-24 px-4">
      <h1 className="text-4xl font-bold mb-12 text-center">
        Our{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
          Stories
        </span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {stories.map(({ id, title, description, type }) => (
          <a
            key={id}
            href={`/stories/${id}`}
            className="block p-6 border rounded-xl shadow hover:shadow-lg transition hover:scale-105 duration-200"
          >
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              ({type === "novel" ? "Truyện chữ" : "Truyện tranh"})
            </p>
            {description && <p className="mt-2 text-gray-700">{description}</p>}
          </a>
        ))}
      </div>
    </main>
  )
}
