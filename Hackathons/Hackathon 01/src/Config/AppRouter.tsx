import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import Protected from './Protected'
import Dashboard from '../Layouts/Dashboard'
import NotfFound from '../Pages/NotfFound'

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard/*" element={<Protected Component={Dashboard} />} />
            <Route path="*" element={<NotfFound />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
