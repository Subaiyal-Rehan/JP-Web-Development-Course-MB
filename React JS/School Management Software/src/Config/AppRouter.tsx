import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import AllStudents from '../Pages/Students/AllStudents';
import AdmissionForm from '../Pages/Students/AdmissionForm';
import StudentDetailedPage from '../Pages/Students/StudentDetailedPage';
import AllTeachers from '../Pages/Teachers/AllTeachers';
import AddTeachers from '../Pages/Teachers/AddTeachers';

function AppRouter() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/students/allStudents' element={<AllStudents />} />
                <Route path='/students/admissionForm' element={<AdmissionForm />} />
                <Route path='/students/:id' element={<StudentDetailedPage />} />
                <Route path='/teachers/allTeachers' element={<AllTeachers />} />
                <Route path='/teachers/addTeachers' element={<AddTeachers />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default AppRouter
