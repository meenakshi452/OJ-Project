import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"


function App() {

  return (
    // <BrowserRouter>
    //   <Routes>
    //       <Route path="/" element={<Home/>}/>
    //       <Route path="/signup" element={<SignUp/>}/>
    //   </Routes>
    // </BrowserRouter>
    <>
    <Home/>
    <SignUp/>
    <SignIn/>
    </>
  )
}

export default App
