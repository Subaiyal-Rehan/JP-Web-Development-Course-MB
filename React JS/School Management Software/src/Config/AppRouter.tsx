import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import AllStudents from '../Pages/Students/AllStudents';
import AdmissionForm from '../Pages/Students/AdmissionForm';

function AppRouter() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/students/allStudents' element={<AllStudents />} />
                <Route path='/students/admissionForm' element={<AdmissionForm />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default AppRouter
