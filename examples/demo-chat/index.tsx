import React, { useState, useEffect } from "react"
import { render, useApp, useInput } from "ink"

// Import shellcn components from the registry
import { Text } from "../../packages/registry/components/text.js"
import { Container } from "../../packages/registry/components/container.js"
import { Card, CardTitle } from "../../packages/registry/components/card.js"

import { Input } from "../../packages/registry/components/input.js"

/**
 * Demo Chat Application
 *
 * A simple AI chat CLI demonstrating:
 * - Input component for message entry
 * - Card component for message bubbles
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
    { role: "assistant", content: "Hello! I'm shellcn AI. Ask me anything about terminal UIs. (Type 'quit' or press Ctrl+C to exit)" },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isThinking, setIsThinking] = useState(false)

  // Handle Ctrl+C to exit
  useInput((input, key) => {
    if (key.ctrl && input === "c") {
      exit()
      setTimeout(() => process.exit(0), 100)
    }
  })

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
    <Container flexDirection="column" padding={1}>
      {/* Header */}
      <Container borderStyle="double" borderColor="cyan" padding={1} paddingY={0}>
        <Text color="cyan" bold>shellcn Chat Demo</Text>
      </Container>

      <Text> </Text>

      {/* Messages */}
      {messages.map((msg, i) => (
        <Container key={i} marginBottom={1} justifyContent={msg.role === "user" ? "flex-end" : "flex-start"}>
          {msg.role === "assistant" && (
            <Text color="green" bold>
              {"AI "}&nbsp;
            </Text>
          )}
          <Card
            borderColor={msg.role === "user" ? "gray" : "green"}
            paddingX={1}
          >
            {msg.role !== "assistant" && (
              <CardTitle color="gray">You</CardTitle>
            )}
            <Text color={msg.role === "user" ? "cyan" : "white"}>
              {msg.content}
            </Text>
          </Card>
        </Container>
      ))}

      {/* Thinking indicator */}
      {isThinking && (
        <Container marginBottom={1}>
          <Text color="yellow">AI is thinking...</Text>
        </Container>
      )}

      {/* Input */}
      <Container borderStyle="round" borderColor="gray" padding={1} paddingY={0}>
        <Input
          label="You:"
          placeholder="Type a message..."
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
          focus={!isThinking}
        />
      </Container>
    </Container>
  )
}

render(<ChatApp />)
