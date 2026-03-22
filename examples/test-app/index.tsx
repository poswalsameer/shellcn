import React from "react"
import { render } from "ink"
import { Alert } from "./src/components/shellcn/alert.js"

const App = () => {
  return (
    <>
      <Alert variant="info" title="Welcome to shellcn!">
        You have successfully initialized the library and added the alert component.
      </Alert>
      <Alert variant="success" radius="round" alignItems="center">
        Everything is working perfectly.
      </Alert>
      <Alert variant="warning" borderStyle="double">
        This is a warning alert with a double border.
      </Alert>
      <Alert variant="error" radius="none" borderColor="magenta">
        Custom error alert with a magenta border!
      </Alert>
    </>
  )
}

render(<App />)
