import { render } from "ink"
import Text from "./src/components/shellcn/text"


const App = () => {
  return (
    <Text color="green" italic>Hello world</Text>
  )
}

render(<App />)
