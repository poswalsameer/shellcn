import React from "react"
import { render, Text, Box } from "ink"

const App = () => {
  return (
    <Box padding={2} borderStyle="round" borderColor="green">
      <Text color="green" bold>
        Welcome to your shellcn test app!
      </Text>
    </Box>
  )
}

render(<App />)
