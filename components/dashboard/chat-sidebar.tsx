"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, MessageSquare } from "lucide-react"

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
  lastModified: Date
  isActive: boolean
}

interface ChatSidebarProps {
  sessions: ChatSession[]
  activeSession: ChatSession | null
  onSessionSelect: (session: ChatSession) => void
  onNewChat: () => void
}

export default function ChatSidebar({ sessions, activeSession, onSessionSelect, onNewChat }: ChatSidebarProps) {
  return (
    <div className="w-64 border-r bg-cream/30 flex flex-col">
      <div className="p-4 border-b bg-gradient-to-r from-lavender to-lavender-dark">
        <h2 className="font-semibold text-white mb-3">Conversations</h2>
        <Button
          onClick={onNewChat}
          className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
          variant="outline"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {sessions.map((session) => (
            <Button
              key={session.id}
              variant={activeSession?.id === session.id ? "secondary" : "ghost"}
              className={`w-full justify-start text-left h-auto p-3 ${
                activeSession?.id === session.id ? "bg-lavender/10 border-lavender/20" : "hover:bg-lavender/5"
              }`}
              onClick={() => onSessionSelect(session)}
            >
              <div className="flex items-start gap-2 w-full">
                <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0 text-lavender" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{session.title}</p>
                  <p className="text-xs text-muted-foreground">{session.lastModified.toLocaleDateString()}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
