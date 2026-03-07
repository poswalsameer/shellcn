import React, { useState, useEffect } from "react"
import { render, Box as InkBox, Text as InkText, useApp } from "ink"

// Import shellcn components from the registry
import { Text } from "../../packages/registry/components/text.js"
import { Box } from "../../packages/registry/components/box.js"
import { Card } from "../../packages/registry/components/card.js"
import { Spinner } from "../../packages/registry/components/spinner.js"
import { Input } from "../../packages/registry/components/input.js"

/**
 * Demo Chat Application
 *
 * A simple AI chat CLI demonstrating:
 * - Input component for message entry
 * - Card component for message bubbles
 * - Spinner component for "thinking" state
 * - Text component for styled content
 */

interface Message {
  role: "user" | "assistant"
  content: string
}

/** Simulated AI responses. */
const AI_RESPONSES = [
  "That's a great question! Let me think about that...",
  "I'd recommend using TypeScript for better type safety.",
  "Here's what I think: shellcn makes CLI development much easier!",
  "Interesting! Have you tried using the Table component for data display?",
  "The terminal can be beautiful too — try the Alert and Card components!",
]

const ChatApp: React.FC = () => {
  const { exit } = useApp()
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm shellcn AI. Ask me anything about terminal UIs. (Type 'quit' to exit)" },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isThinking, setIsThinking] = useState(false)

  const handleSubmit = (value: string) => {
    if (!value.trim()) return

    if (value.trim().toLowerCase() === "quit") {
      exit()
      return
    }

    // Add user message
    const userMessage: Message = { role: "user", content: value.trim() }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsThinking(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const response = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)]
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsThinking(false)
    }, 1500)
  }

  return (
    <InkBox flexDirection="column" padding={1}>
      {/* Header */}
      <Box borderStyle="double" borderColor="cyan" padding={1} paddingY={0}>
        <Text color="cyan" bold>shellcn Chat Demo</Text>
      </Box>

      <InkText> </InkText>

      {/* Messages */}
      {messages.map((msg, i) => (
        <InkBox key={i} marginBottom={1} justifyContent={msg.role === "user" ? "flex-end" : "flex-start"}>
          <Card
            borderColor={msg.role === "user" ? "blue" : "green"}
            borderStyle="round"
            title={msg.role === "user" ? "You" : "AI"}
            titleColor={msg.role === "user" ? "blue" : "green"}
          >
            <Text>{msg.content}</Text>
          </Card>
        </InkBox>
      ))}

      {/* Thinking indicator */}
      {isThinking && (
        <InkBox marginBottom={1}>
          <Spinner label="AI is thinking..." color="yellow" type="dots" />
        </InkBox>
      )}

      {/* Input */}
      <Box borderStyle="round" borderColor="gray" padding={1} paddingY={0}>
        <Input
          label="You:"
          placeholder="Type a message..."
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
          focus={!isThinking}
        />
      </Box>
    </InkBox>
  )
}

render(<ChatApp />)
