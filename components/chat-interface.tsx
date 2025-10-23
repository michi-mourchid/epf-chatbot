"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Bonjour ! Je suis ton assistant virtuel EPF. Comment puis-je t'aider aujourd'hui ?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate bot response (replace with actual API call later)
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Merci pour ton message ! Je suis en cours de développement et je serai bientôt connecté à une API pour te répondre de manière plus intelligente.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-4 shadow-sm md:px-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-32 md:h-12 md:w-40">
              <Image
                src="/epf-logo.png"
                alt="EPF Engineering School"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground">Assistant virtuel</p>
            </div>
            <div className="h-2 w-2 rounded-full bg-[#47C464] animate-pulse" />
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 md:px-6">
        <div className="mx-auto max-w-4xl space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-3xl px-4 py-3 shadow-sm md:max-w-[75%] md:px-5 md:py-4 ${
                  message.sender === "user" ? "bg-[#470A68] text-white" : "bg-secondary text-secondary-foreground"
                }`}
              >
                <p className="text-sm leading-relaxed md:text-base">{message.content}</p>
                <p className={`mt-1 text-xs ${message.sender === "user" ? "text-white/70" : "text-muted-foreground"}`}>
                  {message.timestamp.toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div className="border-t border-border bg-card px-4 py-4 shadow-lg md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative flex-1">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Pose ta question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="h-12 rounded-full border-input bg-background pr-4 text-sm focus-visible:ring-[#470A68] md:h-14 md:text-base"
              />
            </div>
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              size="icon"
              className="h-12 w-12 shrink-0 rounded-full bg-[#470A68] text-white shadow-md transition-all hover:bg-[#5a0d85] hover:shadow-lg disabled:opacity-50 md:h-14 md:w-14"
            >
              <Send className="h-5 w-5 md:h-6 md:w-6" />
              <span className="sr-only">Envoyer le message</span>
            </Button>
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground md:text-sm">
            Propriete EPF
          </p>
        </div>
      </div>
    </div>
  )
}
