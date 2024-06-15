import { BrowserRouter, Route, Routes } from "react-router-dom"
import AllQuestions from "../Pages/AllQuestions"
import AskQuestion from "../Pages/AskQuestion"
import Question from "../Pages/Question"
import Home from "../Pages/Home"

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allQuestions" element={<AllQuestions />} />
            <Route path="/askQuestion" element={<AskQuestion />} />
            <Route path="/question/:id" element={<Question />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter