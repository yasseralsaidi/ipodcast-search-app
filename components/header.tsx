"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { UserAccountNav } from "@/components/auth/user-account-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Menu, Search } from "lucide-react"
import Link from "next/link"
import type React from "react"
import { useState } from "react"

interface HeaderProps {
  onSearch?: (term: string) => void
  searchTerm?: string
  onMenuToggle?: () => void
  isMobile?: boolean
}

export function Header({ onSearch, searchTerm, onMenuToggle, isMobile }: HeaderProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "")
  const { user, isLoading } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(localSearchTerm)
  }

  return (
    <header className={`
      bg-background border-b h-16 flex items-center justify-between px-4 lg:px-6 fixed top-0 z-10
      ${isMobile ? 'left-0 right-0' : 'right-64 left-0'}
    `}>
      {/* Mobile Menu Button */}
      {isMobile && onMenuToggle && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="lg:hidden"
          aria-label="فتح القائمة"
        >
          <Menu className="w-5 h-5" />
        </Button>
      )}

      {/* Search Bar */}
      <div className={`
        flex-1 mx-4
        ${isMobile ? 'max-w-none' : 'max-w-2xl mx-8'}
      `}>
        <form onSubmit={handleSubmit} className="relative">
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="ابحث عن اي بودكاست او حلقة..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            className="w-full bg-background border-input text-foreground placeholder-muted-foreground pr-12 pl-4 py-2 rounded-full focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </form>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        {isLoading ? (
          <Skeleton className="h-9 w-20" />
        ) : user ? (
          <UserAccountNav />
        ) : (
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-accent">
            <Link href="/auth">تسجيل الدخول</Link>
          </Button>
        )}
      </div>
    </header>
  )
}
