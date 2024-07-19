import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import Profile from "./pages/Profile"
import Problem from "./pages/Problem"
import ProblemsList from "./components/ProblemsList"
import ProblemCreate from "./pages/ProblemCreate"
import UpdateProblem from "./pages/UpdateProblem"


function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/problem/:id" element={<Problem/>}/>
          <Route path="/problemList" element={<ProblemsList/>}/>
          <Route path="/createProblem" element={<ProblemCreate/>}/>
          <Route path="/updateProblem/:id" element={<UpdateProblem/>}/>
      </Routes>
    </BrowserRouter>
  )
}


export default App
