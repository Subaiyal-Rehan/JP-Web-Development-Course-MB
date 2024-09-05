import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../Pages/Home"
import Products from "../Pages/Products"
import SingleProduct from "../Pages/SingleProduct"
import About from "../Pages/About"

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/Products/:id" element={<SingleProduct />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
