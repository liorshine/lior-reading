"use client"

import { useEffect, useState } from "react"
import axios from "axios"

type Story = {
  _id: string
  title: string
  author: string
  type: "comic" | "novel"
  description?: string
}

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    title: "",
    author: "",
    type: "comic",
    description: "",
  })
  const [editingId, setEditingId] = useState<string | null>(null)

  // Fetch danh sách stories
  const fetchStories = async () => {
    try {
      const res = await axios.get("/api/stories")
      setStories(res.data.stories || [])
    } catch (err) {
      console.error("Failed to fetch stories", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStories()
  }, [])

  // Submit form (create or update)
  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(`/api/stories/${editingId}`, form)
      } else {
        await axios.post("/api/stories", form)
      }
      setForm({ title: "", author: "", type: "comic", description: "" })
      setEditingId(null)
      fetchStories()
    } catch (err) {
      console.error("Failed to save story", err)
    }
  }

  // Edit story
  const handleEdit = (story: Story) => {
    setEditingId(story._id)
    setForm({
      title: story.title,
      author: story.author,
      type: story.type,
      description: story.description || "",
    })
  }

  // Delete story
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/stories/${id}`)
      fetchStories()
    } catch (err) {
      console.error("Failed to delete story", err)
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Quản lý Truyện</h1>

      {/* Form thêm / sửa */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-2">
          {editingId ? "✏️ Sửa Truyện" : "➕ Thêm Truyện"}
        </h2>
        <input
          className="border p-2 rounded w-full mb-2"
          placeholder="Tiêu đề"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          className="border p-2 rounded w-full mb-2"
          placeholder="Tác giả"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />
        <select
          className="border p-2 rounded w-full mb-2"
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value as "comic" | "novel" })
          }
        >
          <option value="comic">Truyện tranh</option>
          <option value="novel">Truyện chữ</option>
        </select>
        <textarea
          className="border p-2 rounded w-full mb-2"
          placeholder="Mô tả"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingId ? "Cập nhật" : "Thêm mới"}
        </button>
        {editingId && (
          <button
            onClick={() => {
              setEditingId(null)
              setForm({ title: "", author: "", type: "comic", description: "" })
            }}
            className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
          >
            Hủy
          </button>
        )}
      </div>

      {/* Danh sách stories */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Tiêu đề</th>
            <th className="p-2 border">Tác giả</th>
            <th className="p-2 border">Loại</th>
            <th className="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {stories.map((story) => (
            <tr key={story._id} className="border-b">
              <td className="p-2 border">{story.title}</td>
              <td className="p-2 border">{story.author}</td>
              <td className="p-2 border">
                {story.type === "comic" ? "Truyện tranh" : "Truyện chữ"}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleEdit(story)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(story._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          {stories.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center p-2">
                Chưa có truyện nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
