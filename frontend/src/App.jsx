import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import Profile from "./pages/Profile"
import Problem from "./pages/Problem"
import ProblemsList from "./components/ProblemsList"


function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/problem" element={<Problem/>}/>
          <Route path="/problemList" element={<ProblemsList/>}/>
      </Routes>
    </BrowserRouter>
  )
}


export default App
