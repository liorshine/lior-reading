"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import StoryDialog from "@/components/StoryDialog"
import { Story } from "@/types/story"

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editStory, setEditStory] = useState<Story | null>(null)
  const [viewStory, setViewStory] = useState<Story | null>(null)

  const fetchStories = async () => {
    try {
      const res = await axios.get("/api/stories")
      console.log("Data from backend:", res.data)
      setStories(res.data.stories || [])
    } catch (err) {
      console.error("Failed to fetch stories", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchStories() }, [])

  const openAddDialog = () => {
    setEditStory(null)
    setViewStory(null)
    setDialogOpen(true)
  }

  const openEditDialog = (story: Story) => {
    setEditStory(story)
    setViewStory(null)
    setDialogOpen(true)
  }

  const handleSave = async (formData: Omit<Story, "_id">) => {
    try {
      if (editStory) {
        await axios.put(`/api/stories/${editStory._id}`, formData)
      } else {
        await axios.post("/api/stories", formData)
      }
      setDialogOpen(false)
      fetchStories()
    } catch (err) {
      console.error("Failed to save story", err)
    }
  }

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

      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={openAddDialog}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Thêm mới truyện
        </button>
      </div>

      {/* Table */}
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
              <td className="p-2 border">{story.type === "comic" ? "Truyện tranh" : "Truyện chữ"}</td>
              <td className="p-2 border">
                
                <button
                  onClick={() => openEditDialog(story)}
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
              <td colSpan={4} className="text-center p-2">Chưa có truyện nào</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Dialog */}
      <StoryDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditStory(null); setViewStory(null) }}
        onSave={handleSave}
        initialData={editStory
          ? { ...editStory, chapters: editStory.chapters || [] }
          : viewStory
          ? { ...viewStory, chapters: viewStory.chapters || [] }
          : undefined}
      />
    </div>
  )
}
