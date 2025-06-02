"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Zap, Settings, Phone } from "lucide-react"
import Link from "next/link"
// Replace the import
import EnhancedChatSidebar from "@/components/dashboard/enhanced-chat-sidebar"
import ProfileMenu from "@/components/dashboard/profile-menu"
import WelcomeMessage from "@/components/dashboard/welcome-message"
import ChatMessage from "@/components/dashboard/chat-message"
import ReportPreview from "@/components/dashboard/report-preview"

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

export default function Dashboard() {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [activeSession, setActiveSession] = useState<ChatSession | null>(null)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    // Load sessions from localStorage on mount
    const savedSessions = localStorage.getItem("ai-cost-advisor-sessions")
    if (savedSessions) {
      try {
        const parsedSessions = JSON.parse(savedSessions, (key, value) => {
          // Convert date strings back to Date objects
          if (key === "lastModified" || key === "timestamp") {
            return new Date(value)
          }
          return value
        })

        // Ensure all sessions have proper Date objects
        const sessionsWithDates = parsedSessions.map((session: any) => ({
          ...session,
          lastModified: new Date(session.lastModified),
          messages: session.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        }))

        setSessions(sessionsWithDates)
        const active = sessionsWithDates.find((s: ChatSession) => s.isActive)
        if (active) {
          setActiveSession(active)
          // Check if the active session has an assistant message (indicating a report was generated)
          if (active.messages.some((msg: Message) => msg.role === 'assistant')) {
            setShowReport(true)
          } else {
            setShowReport(false)
          }
        } else {
          // If no active session, ensure report is hidden
          setShowReport(false)
        }
      } catch (error) {
        console.error("Error loading sessions:", error)
        // If there's an error, start with empty sessions
        setSessions([])
      }
    }
  }, [])

  useEffect(() => {
    // Save sessions to localStorage whenever sessions change
    if (sessions.length > 0) {
      try {
        localStorage.setItem("ai-cost-advisor-sessions", JSON.stringify(sessions))
      } catch (error) {
        console.error("Error saving sessions:", error)
      }
    }
  }, [sessions])

  const createNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New Conversation",
      messages: [],
      lastModified: new Date(),
      isActive: true,
    }

    setSessions((prev) => [newSession, ...prev.map((s) => ({ ...s, isActive: false }))])
    setActiveSession(newSession)
    setShowReport(false)
  }

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    let currentSession = activeSession

    // Create new session if none exists
    if (!currentSession) {
      currentSession = {
        id: Date.now().toString(),
        title: content.slice(0, 50) + (content.length > 50 ? "..." : ""),
        messages: [],
        lastModified: new Date(),
        isActive: true,
      }
      setSessions((prev) => [currentSession!, ...prev.map((s) => ({ ...s, isActive: false }))])
      setActiveSession(currentSession)
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    }

    // Update session with user message
    const updatedSession = {
      ...currentSession,
      messages: [...currentSession.messages, userMessage],
      lastModified: new Date(),
      title:
        currentSession.messages.length === 0
          ? content.slice(0, 50) + (content.length > 50 ? "..." : "")
          : currentSession.title,
    }

    setSessions((prev) => prev.map((s) => (s.id === updatedSession.id ? updatedSession : s)))
    setActiveSession(updatedSession)
    setInputValue("")
    setIsTyping(true)

    console.log('sendMessage called with content:', content);

    // *** Call your new API route to interact with the Lyzr agent ***
    try {
      const requestBody = {
        userId: 'your-user-id', // Replace with a real user ID
        agentId: '683d24f83b7c57f1745cfbe8', // Your Lyzr Agent ID
        sessionId: updatedSession.id, // Use the current session ID
        message: content,
      };

      console.log('Sending request to /api/chat with body:', requestBody);

      const response = await fetch('/api/chat', { // Call your local API route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Received response from /api/chat:', response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error from your API route:', response.status, errorData);
        // Handle the error in the UI, e.g., show an error message
        setIsTyping(false);
        return;
      }

      const data = await response.json();
      console.log('Parsed response data:', data);

      const agentMessageContent = data.agentMessage; // Get the agent's message from your API response
      console.log('Extracted agent message:', agentMessageContent);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: agentMessageContent, // Use the message from the Lyzr agent
        timestamp: new Date(),
      }

      const finalSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, aiMessage],
        lastModified: new Date(),
      }

      setSessions((prev) => prev.map((s) => (s.id === finalSession.id ? finalSession : s)))
      setActiveSession(finalSession)
      setIsTyping(false)
      setShowReport(true) // Assuming an agent response means a potential report update
    } catch (error) {
      console.error('Error sending message to API route:', error);
      // Handle network errors or other issues
      setIsTyping(false);
    }
    // ***************************************************************
  }

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      "Based on your requirements, I've analyzed the cost implications of implementing AI for customer support. Here's what I found:\n\n**Cost Analysis:**\n- Initial setup: $15,000-25,000\n- Monthly operational costs: $2,500-4,000\n- Expected ROI: 180% within 18 months\n\n**Recommendations:**\n1. Start with GPT-4 for complex queries\n2. Use Claude for routine responses\n3. Implement token optimization strategies\n\nWould you like me to generate a detailed report with these findings?",

      "I've compared GPT-4 and Claude for your specific use case. Here's the breakdown:\n\n**GPT-4:**\n- Cost per 1K tokens: $0.03 (input), $0.06 (output)\n- Best for: Complex reasoning, creative tasks\n- Monthly estimate: $3,200\n\n**Claude:**\n- Cost per 1K tokens: $0.015 (input), $0.075 (output)\n- Best for: Long-form content, analysis\n- Monthly estimate: $2,800\n\n**Recommendation:** Use Claude for your use case - 12% cost savings with comparable quality.",

      "Here's your ROI projection for AI implementation:\n\n**Investment Breakdown:**\n- Year 1: $45,000 total investment\n- Year 2: $35,000 operational costs\n- Year 3: $38,000 with scaling\n\n**Returns:**\n- Cost savings: $65,000/year\n- Efficiency gains: $25,000/year\n- Revenue increase: $40,000/year\n\n**Net ROI: 245% over 3 years**\n\nThe payback period is approximately 14 months.",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleNudgeClick = (prompt: string) => {
    sendMessage(prompt)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(inputValue)
    }
  }

  // Add these functions before the return statement:
  const deleteSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId))
    if (activeSession?.id === sessionId) {
      setActiveSession(null)
      setShowReport(false)
    }
  }

  const renameSession = (sessionId: string, newTitle: string) => {
    setSessions((prev) => prev.map((s) => (s.id === sessionId ? { ...s, title: newTitle } : s)))
    if (activeSession?.id === sessionId) {
      setActiveSession((prev) => (prev ? { ...prev, title: newTitle } : null))
    }
  }

  return (
    <div className="flex h-screen bg-background relative">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Update the sidebar component call: */}
        <EnhancedChatSidebar
          sessions={sessions}
          activeSession={activeSession}
          onSessionSelect={setActiveSession}
          onNewChat={createNewChat}
          onDeleteSession={deleteSession}
          onRenameSession={renameSession}
        />

        <main className="flex flex-1 relative z-0">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col min-w-0 relative">
            {/* Top Navigation */}
            <header className="border-b bg-background/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-2">
                  {/* Add your logo image here */}
                  {/* Example: <img src="/path/to/your/logo.png" alt="AI Cost Advisor Logo" className="h-8 w-auto" /> */}
                   <Phone className="h-8 w-auto text-lavender" />
                </Link>
              </div>

              {/* Profile Menu */}
              <div className="flex items-center gap-4">
                <ProfileMenu />
              </div>
            </header>

            {/* Messages */}
            <ScrollArea className="flex-1 px-6 py-4">
              {!activeSession || activeSession.messages.length === 0 ? (
                <WelcomeMessage onNudgeClick={handleNudgeClick} />
              ) : (
                <div className="space-y-6 max-w-4xl mx-auto">
                  {activeSession.messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  {isTyping && (
                    <div className="flex items-start gap-4">
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback className="bg-gradient-to-br from-lavender to-lavender-dark text-white text-xs">
                          AI
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-2xl px-4 py-3 max-w-[80%]">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-lavender rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-lavender rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-lavender rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t px-6 py-4">
              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about AI costs, ROI, or optimization strategies..."
                    className="pr-12 h-12 rounded-xl border-2 focus:border-lavender focus:ring-lavender/20"
                  />
                  <Button
                    size="sm"
                    className="absolute right-2 top-2 h-8 w-8 rounded-lg bg-gradient-to-r from-lavender to-lavender-dark hover:opacity-90"
                    onClick={() => sendMessage(inputValue)}
                    disabled={!inputValue.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Report Preview */}
          <div className="w-96 border-l bg-cream/20">
            <ReportPreview showReport={showReport} session={activeSession} />
          </div>
        </main>
      </div>
    </div>
  )
}
