"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const menus = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/stories", label: "Stories" },
    { href: "/", label: "Home Page" },
  ]

  return (
    <div className="min-h-screen flex flex-col">

      <div className="flex flex-1">
        <aside className="w-64 bg-gray-900 text-white flex flex-col">
          <h1 className="text-xl font-bold p-4 border-b border-gray-700">Admin Panel</h1>
          <nav className="flex-1 p-2">
            {menus.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className={`block px-4 py-2 rounded mb-1 ${
                  pathname === m.href ? "bg-gray-700" : "hover:bg-gray-800"
                }`}
              >
                {m.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  )
}
