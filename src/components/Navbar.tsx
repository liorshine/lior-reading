"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Info, Phone, Upload } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Reading", href: "/reading", icon: BookOpen },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Phone },
    { name: "Upload", href: "/upload", icon: Upload },
  ];

  return (
    <>
      <nav className="fixed w-full z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-blue-500">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
              Lior Reading
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-8 font-medium">
            {menuItems.map(({ name, href }) => {
              const isActive = pathname === href;
              return (
                <a
                  key={name}
                  href={href}
                  className={`relative transition group ${
                    isActive
                      ? "text-green-600 font-semibold"
                      : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  {name}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-green-500 transition-all ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </a>
              );
            })}
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

        <div
          className={`fixed top-0 left-0 h-full w-full bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col mt-16">
            {menuItems.map(({ name, href, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <a
                  key={name}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`group relative flex items-center gap-3 px-6 py-4 transition ${
                    isActive
                      ? "bg-green-50 text-green-600 font-semibold"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                  }`}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  <span className="relative z-10">{name}</span>
                  <span
                    className={`absolute left-0 bottom-0 h-[2px] bg-green-500 transition-all ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/25 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-20 md:h-20"></div>
    </>
  );
};
