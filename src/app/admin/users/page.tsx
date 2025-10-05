'use client'

import React, { useEffect, useState } from 'react'
import {
  Button,
  Input,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui'
import { MoreVertical } from 'lucide-react'

interface User {
  _id: string
  username: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Fetch danh sách user
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users', { cache: 'no-store' })
      const data = await res.json()
      const userList = Array.isArray(data) ? data : data.users
      setUsers(userList || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa user này?')) return
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.message) fetchUsers()
    } catch (err) {
      console.error(err)
    }
  }

  const handleSave = async () => {
    if (!editingUser) return
    try {
      const res = await fetch(`/api/users/${editingUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingUser),
      })
      const data = await res.json()
      if (data) {
        setIsDialogOpen(false)
        fetchUsers()
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <p>Đang tải...</p>

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Quản lý Users</h1>

      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 font-medium">Username</th>
              <th className="text-left py-3 px-4 font-medium">Email</th>
              <th className="text-left py-3 px-4 font-medium">Role</th>
              <th className="text-left py-3 px-4 font-medium">Created At</th>
              <th className="text-left py-3 px-4 font-medium">Updated At</th>
              <th className="text-center py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">{user.username}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4 capitalize">{user.role}</td>
                <td className="py-3 px-4 text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">
                  {new Date(user.updatedAt).toLocaleString()}
                </td>
                <td className="py-3 px-4 text-center relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" sideOffset={4} className="z-[9999]">
                      <DropdownMenuItem onClick={() => handleEdit(user)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(user._id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialog Edit User */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin User</DialogTitle>
          </DialogHeader>

          {editingUser && (
            <div className="space-y-3 mt-2">
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <Input
                  value={editingUser.username}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, username: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <Select
                  value={editingUser.role}
                  onValueChange={(value) =>
                    setEditingUser({ ...editingUser, role: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="reader">Reader</SelectItem>
                    <SelectItem value="author">Author</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end pt-3">
                <Button onClick={handleSave} className="bg-green-500 text-white">
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
