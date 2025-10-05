"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import StoryDialog from "@/components/StoryDialog"
import { Story } from "@/types/story"
import { Button } from "@/components/ui/button"

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editStory, setEditStory] = useState<Story | null>(null)

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

  useEffect(() => { fetchStories() }, [])

  const openAddDialog = () => {
    setEditStory(null)
    setDialogOpen(true)
  }

  const openEditDialog = (story: Story) => {
    setEditStory(story)
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
    if (!confirm("Bạn có chắc muốn xóa truyện này?")) return
    try {
      await axios.delete(`/api/stories/${id}`)
      fetchStories()
    } catch (err) {
      console.error("Failed to delete story", err)
    }
  }

  if (loading) return <p>Đang tải...</p>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📚 Quản lý Truyện</h1>
        <Button variant="default" onClick={openAddDialog}>Thêm mới truyện</Button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 font-medium">Tiêu đề</th>
              <th className="text-left py-3 px-4 font-medium">Tác giả</th>
              <th className="text-left py-3 px-4 font-medium">Loại</th>
              <th className="text-center py-3 px-4 font-medium">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {stories.map((story) => (
              <tr key={story._id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">{story.title}</td>
                <td className="py-3 px-4">{story.author}</td>
                <td className="py-3 px-4">{story.type === "comic" ? "Truyện tranh" : "Truyện chữ"}</td>
                <td className="py-3 px-4 text-center">
                  <div className="inline-flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => openEditDialog(story)}>Sửa</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(story._id)}>Xóa</Button>
                  </div>
                </td>
              </tr>
            ))}
            {stories.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-3">Chưa có truyện nào</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <StoryDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initialData={editStory ? { ...editStory, chapters: editStory.chapters || [] } : undefined}
      />
    </div>
  )
}
