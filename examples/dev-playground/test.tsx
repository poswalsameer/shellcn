import React, { useState, useEffect } from "react"
import { render, Box, Text } from "ink"
import { Input } from "../../packages/registry/components/input.js"

const TestApp = () => {
  const [text, setText] = useState("")

  useEffect(() => {
    const id = setInterval(() => { }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <Box flexDirection="column">
      <Input
        label="Test"
        value={text}
        onChange={setText}
        focus={true}
        placeholder="Type here..."
      />
      <Text>Typed text so far: {text}</Text>
    </Box>
  )
}

render(<TestApp />)
