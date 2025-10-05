'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, LayoutDashboard, Users, BookOpen, Home } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const menus = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/stories', label: 'Stories', icon: BookOpen },
    { href: '/', label: 'Home Page', icon: Home },
  ]

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 transition-all duration-300 shadow-lg ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Header */}
        <div className="flex items-center px-4 py-3 border-b border-gray-700">
          <div
            className={`flex items-center overflow-hidden transition-all duration-300 ${
              collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
            }`}
          >
            <h1 className="text-lg font-semibold tracking-wide text-white whitespace-nowrap flex-shrink-0">
              Admin Panel
            </h1>
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-gray-300 flex-shrink-0"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Menu items */}
        <nav className="flex-1 p-3 space-y-1">
          {menus.map((m) => {
            const Icon = m.icon
            const isActive = pathname === m.href
            return (
              <Link
                key={m.href}
                href={m.href}
                className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gray-700 text-white shadow-inner'
                    : 'hover:bg-gray-800 hover:text-white'
                }`}
                title={collapsed ? m.label : ''}
              >
                <Icon
                  size={20}
                  className={`${
                    isActive ? 'text-indigo-400' : 'text-gray-400 group-hover:text-gray-200'
                  } transition-colors duration-200`}
                />
                <span
                  className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                    collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'
                  }`}
                >
                  {m.label}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-700 p-4 text-xs text-gray-500 text-center">
          <span
            className={`block transition-all duration-300 ${
              collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'
            }`}
          >
            © 2025 Admin Panel
          </span>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  )
}
