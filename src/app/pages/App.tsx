import { BrowserRouter } from "react-router"
import Router from "../router/Router"
import "./pages.css"

const App = () => {
  return (
    <BrowserRouter>
        <Router />
    </BrowserRouter>
  )
}

export default App