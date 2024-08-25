import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login'
import Protected from './Protected'
import Dashboard from '../Layouts/Dashboard'
import NotfFound from '../Pages/NotfFound'
import Home from '../Pages/CustomerPages/Home'
import CustomerBooking from '../Pages/CustomerPages/CustomerBooking'
import CustomerSignup from '../Pages/CustomerPages/CustomerSignup'
import CustomerProtected from './CustomerProtected'
import Account from '../Pages/CustomerPages/Account'
import MyBookings from '../Pages/CustomerPages/MyBookings'
import Signup from '../Pages/Signup'

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<CustomerProtected Component={Home} Booking={false} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userSignup" element={<CustomerSignup />} />
            <Route path="/signup" element={<Protected Component={Signup} />} />
            <Route path="/customerBooking/:id" element={<CustomerProtected Component={CustomerBooking} Booking={true} />} />
            <Route path="/account" element={<CustomerProtected Component={Account} Booking={true} />} />
            <Route path="/mybookings" element={<CustomerProtected Component={MyBookings} Booking={true} />} />
            <Route path="/dashboard/*" element={<Protected Component={Dashboard} />} />
            <Route path="*" element={<NotfFound />} />
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
