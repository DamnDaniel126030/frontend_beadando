import FirstPage from "./pages/firstpage"
import SecondPage from "./pages/secondpage"
import { Route, Routes } from "react-router-dom"

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<FirstPage/>}/>
        <Route path='/firstpage' element={<FirstPage/>}/>
        <Route path='/secondpage' element={<SecondPage/>}/>
      </Routes>
    </>
  )
}

export default App
