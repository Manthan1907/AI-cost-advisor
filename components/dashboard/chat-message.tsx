"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content)
  }

  const formatTime = (timestamp: Date | string | number) => {
    if (!timestamp) return ""

    try {
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp)
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } catch (error) {
      return "Unknown time"
    }
  }

  return (
    <div className={`flex items-start gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarFallback
          className={
            message.role === "user"
              ? "bg-gradient-to-br from-lavender to-lavender-dark text-white text-xs font-medium"
              : "bg-muted text-xs font-medium"
          }
        >
          {message.role === "user" ? "You" : "AI"}
        </AvatarFallback>
      </Avatar>

      <div className={`max-w-[75%] ${message.role === "user" ? "text-right" : ""}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            message.role === "user"
              ? "bg-gradient-to-r from-lavender to-lavender-dark text-white"
              : "bg-muted border border-border"
          }`}
        >
          <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
        </div>

        <div
          className={`flex items-center gap-2 mt-2 text-xs text-muted-foreground ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <span>{formatTime(message.timestamp)}</span>
          {message.role === "assistant" && (
            <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-6 w-6 p-0 hover:bg-lavender/10">
              <Copy className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
