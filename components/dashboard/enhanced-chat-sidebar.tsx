"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Plus, MessageSquare, Search, MoreHorizontal, Edit3, Trash2, Archive, Settings, Crown, Phone } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import SettingsModal from "./settings-modal"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatSession {
  id: string
  title: string
  messages: Message[]
  lastModified: Date | string | number
  isActive: boolean
}

interface EnhancedChatSidebarProps {
  sessions: ChatSession[]
  activeSession: ChatSession | null
  onSessionSelect: (session: ChatSession) => void
  onNewChat: () => void
  onDeleteSession?: (sessionId: string) => void
  onRenameSession?: (sessionId: string, newTitle: string) => void
}

export default function EnhancedChatSidebar({
  sessions,
  activeSession,
  onSessionSelect,
  onNewChat,
  onDeleteSession,
  onRenameSession,
}: EnhancedChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [editingSession, setEditingSession] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [showSettings, setShowSettings] = useState(false)

  // Group sessions by time periods
  const formatDate = (date: Date | string | number) => {
    if (!date) return ""

    try {
      // If it's already a Date object, use it directly
      if (date instanceof Date) {
        return date.toLocaleDateString()
      }
      // Otherwise try to create a new Date object
      return new Date(date).toLocaleDateString()
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Unknown date"
    }
  }

  const groupSessionsByTime = (sessions: ChatSession[]) => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    const groups = {
      today: [] as ChatSession[],
      yesterday: [] as ChatSession[],
      lastWeek: [] as ChatSession[],
      lastMonth: [] as ChatSession[],
      older: [] as ChatSession[],
    }

    sessions.forEach((session) => {
      // Ensure we have a proper Date object
      const sessionDate = session.lastModified instanceof Date ? session.lastModified : new Date(session.lastModified)

      if (sessionDate >= today) {
        groups.today.push(session)
      } else if (sessionDate >= yesterday) {
        groups.yesterday.push(session)
      } else if (sessionDate >= lastWeek) {
        groups.lastWeek.push(session)
      } else if (sessionDate >= lastMonth) {
        groups.lastMonth.push(session)
      } else {
        groups.older.push(session)
      }
    })

    return groups
  }

  const filteredSessions = sessions.filter((session) => session.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const groupedSessions = groupSessionsByTime(filteredSessions)

  const handleRename = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId)
    if (session) {
      setEditingSession(sessionId)
      setEditTitle(session.title)
    }
  }

  const saveRename = () => {
    if (editingSession && editTitle.trim() && onRenameSession) {
      onRenameSession(editingSession, editTitle.trim())
    }
    setEditingSession(null)
    setEditTitle("")
  }

  const cancelRename = () => {
    setEditingSession(null)
    setEditTitle("")
  }

  const SessionGroup = ({
    title,
    sessions,
    showTitle = true,
  }: {
    title: string
    sessions: ChatSession[]
    showTitle?: boolean
  }) => {
    if (sessions.length === 0) return null

    return (
      <div className="mb-4">
        {showTitle && (
          <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</div>
        )}
        <div className="space-y-1">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`group relative rounded-lg transition-all duration-200 ${
                activeSession?.id === session.id ? "bg-lavender/15 border border-lavender/30" : "hover:bg-lavender/5"
              }`}
              style={{ position: "relative", zIndex: 1 }}
            >
              {editingSession === session.id ? (
                <div className="p-2">
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveRename()
                      if (e.key === "Escape") cancelRename()
                    }}
                    onBlur={saveRename}
                    className="h-8 text-sm"
                    autoFocus
                  />
                </div>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left h-auto p-3 hover:bg-transparent pr-10"
                  onClick={() => onSessionSelect(session)}
                >
                  <div className="flex items-start gap-3 w-full min-w-0">
                    <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0 text-lavender" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate leading-5">{session.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{formatDate(session.lastModified)}</p>
                    </div>
                  </div>
                </Button>
              )}

              {editingSession !== session.id && (
                <div
                  className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ zIndex: 50 }}
                >
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 hover:bg-lavender/20 focus:bg-lavender/20"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-40"
                      side="right"
                      sideOffset={5}
                      style={{ zIndex: 9999 }}
                      onCloseAutoFocus={(e) => e.preventDefault()}
                    >
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRename(session.id)
                        }}
                      >
                        <Edit3 className="h-3 w-3 mr-2" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                      >
                        <Archive className="h-3 w-3 mr-2" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          onDeleteSession?.(session.id)
                        }}
                        className="text-destructive"
                      >
                        <Trash2 className="h-3 w-3 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="w-80 border-r bg-background flex flex-col h-full relative" style={{ zIndex: 10 }}>
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-lg font-semibold bg-gradient-to-r from-lavender to-lavender-dark bg-clip-text text-transparent">
              AI Cost Advisor
            </Link>
          </div>

          <Button
            onClick={onNewChat}
            className="w-full bg-gradient-to-r from-lavender to-lavender-dark hover:opacity-90 text-white mb-4"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-9"
            />
          </div>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1 px-2">
          <div className="py-2">
            <SessionGroup title="Today" sessions={groupedSessions.today} />
            <SessionGroup title="Yesterday" sessions={groupedSessions.yesterday} />
            <SessionGroup title="Previous 7 Days" sessions={groupedSessions.lastWeek} />
            <SessionGroup title="Previous 30 Days" sessions={groupedSessions.lastMonth} />
            <SessionGroup title="Older" sessions={groupedSessions.older} />

            {filteredSessions.length === 0 && searchQuery && (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No conversations found</p>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Bottom Section */}
        <div className="border-t p-4 space-y-2">
          {/* Upgrade Plan */}
          <Button variant="outline" className="w-full justify-start h-auto p-3 border-lavender/20 hover:bg-lavender/5">
            <div className="flex items-center gap-3 w-full">
              <Crown className="h-4 w-4 text-lavender" />
              <div className="text-left">
                <p className="text-sm font-medium">Upgrade plan</p>
                <p className="text-xs text-muted-foreground">More access to advanced features</p>
              </div>
            </div>
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            className="w-full justify-start h-auto p-3 hover:bg-lavender/5"
            onClick={() => setShowSettings(true)}
          >
            <div className="flex items-center gap-3 w-full">
              <Settings className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Settings</span>
            </div>
          </Button>
        </div>
      </div>

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </>
  )
}
