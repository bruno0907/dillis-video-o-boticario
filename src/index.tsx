import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { App } from "./pages/App"
import { theme } from "./styles/theme"

const container = document.getElementById("root")
const root = ReactDOM.createRoot(container!)

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
