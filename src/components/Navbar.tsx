'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, LayoutDashboard, Users, BookOpen, Home } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const menus = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/stories', label: 'Stories', icon: BookOpen },
    { href: '/', label: 'Home Page', icon: Home },
  ]

  return (
    <aside
      className={`flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 transition-all duration-300 shadow-lg ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="relative flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <div className="relative h-6 overflow-hidden flex-1">
          <h1
            className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold tracking-wide text-white whitespace-nowrap transition-all duration-300 ${
              collapsed ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'
            }`}
          >
            Admin Panel
          </h1>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-gray-300 flex-shrink-0"
        >
          <Menu size={22} className="!transform-none" />
        </button>
      </div>

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
                className={`whitespace-nowrap transition-all duration-300 ${
                  collapsed ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'
                }`}
              >
                {m.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
