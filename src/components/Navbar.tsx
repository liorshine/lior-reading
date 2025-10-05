"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, BookOpen, Info, Phone, User, LogOut, X, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const Navbar = () => {
  const { isLoggedIn, username, role, refresh } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/users/logout", { method: "POST" });
      await refresh(); 
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  const baseMenuItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Reading", href: "/reading", icon: BookOpen },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  const menuItems =
    role === "admin"
      ? [...baseMenuItems, { name: "Admin", href: "/admin", icon: Shield }]
      : baseMenuItems;

  return (
    <>
      <nav className="fixed w-full z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-500">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
              Lior Reading
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8 font-medium">
            {menuItems.map(({ name, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={name}
                  href={href}
                  className={`relative transition group ${
                    isActive ? "text-green-600 font-semibold" : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  {name}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-green-500 transition-all ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              );
            })}

            {!isLoggedIn ? (
              <div className="space-x-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 transition"
                >
                  <User className="w-5 h-5" />
                  <span>{username || "User"}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                    >
                      {username || "Profile"}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isOpen && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsOpen(false)} />}

        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform z-50 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-lg font-semibold text-green-600">Menu</h2>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <div className="flex flex-col space-y-3 p-4">
            {menuItems.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 px-2 py-2 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-600 ${
                  pathname === href ? "bg-green-50 text-green-600 font-medium" : ""
                }`}
              >
                <Icon className="w-5 h-5" />
                {name}
              </Link>
            ))}

            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 border border-green-500 text-green-600 rounded-md text-center hover:bg-green-50"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 bg-green-500 text-white rounded-md text-center hover:bg-green-600"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-green-50 text-gray-700 hover:text-green-600"
                >
                  <User className="w-5 h-5" />
                  {username || "Profile"}
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-2 px-2 py-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="h-20 md:h-20"></div>
    </>
  );
};
