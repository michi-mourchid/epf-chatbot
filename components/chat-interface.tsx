"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { MarkdownMessage } from "./markdown-message"

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
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch("https://epf-n8n.mourchid.me/webhook/invoke_n8n_agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
        }),
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      const data = await response.json()
      console.log("Réponse du webhook n8n:", data)

      const botOutput = Array.isArray(data) ? data[0]?.output : data.output
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botOutput || "Je n'ai pas pu traiter ta demande. Veuillez réessayer.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Erreur lors de l'appel au webhook:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Désolé, une erreur s'est produite. Veuillez réessayer plus tard.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
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
                className={`max-w-[85%] rounded-3xl px-4 py-3 shadow-sm md:max-w-[75%] md:px-5 md:py-4 ${message.sender === "user" ? "bg-[#470A68] text-white" : "bg-secondary text-secondary-foreground"
                  }`}
              >
                <MarkdownMessage
                  content={message.content}
                  className={message.sender === "user" ? "prose-invert" : ""}
                />
                <p className={`mt-2 text-xs ${message.sender === "user" ? "text-white/70" : "text-muted-foreground"}`}>
                  {message.timestamp.toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-3xl bg-secondary px-4 py-3 md:px-5 md:py-4">
                <div className="flex gap-2">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            </div>
          )}
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
                disabled={isLoading}
                className="h-12 rounded-full border-input bg-background pr-4 text-sm focus-visible:ring-[#470A68] disabled:opacity-50 md:h-14 md:text-base"
              />
            </div>
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              size="icon"
              className="h-12 w-12 shrink-0 rounded-full bg-[#470A68] text-white shadow-md transition-all hover:bg-[#5a0d85] hover:shadow-lg disabled:opacity-50 md:h-14 md:w-14"
            >
              <Send className="h-5 w-5 md:h-6 md:w-6" />
              <span className="sr-only">Envoyer le message</span>
            </Button>
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground md:text-sm">Propriété EPF</p>
        </div>
      </div>
    </div>
  )
}
