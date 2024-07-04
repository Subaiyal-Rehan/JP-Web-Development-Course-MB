import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import AllStudents from '../Pages/Students/AllStudents';
import AdmissionForm from '../Pages/Students/AdmissionForm';
import StudentDetailedPage from '../Pages/Students/StudentDetailedPage';
import AllTeachers from '../Pages/Teachers/AllTeachers';
import AddTeachers from '../Pages/Teachers/AddTeachers';
import TeacherDetailedPage from '../Pages/Teachers/TeacherDetailedPage';
import TeacherAllocation from '../Pages/Teachers/TeacherAllocation';
import StudentPromotion from '../Pages/Students/StudentPromotion';
import AllSubjects from '../Pages/Subjects/AllSubjects';
import AddSubject from '../Pages/Subjects/AddSubject';
import AddClass from '../Pages/Classes/AddClass';
import AllClasses from '../Pages/Classes/AllClasses';
import FeeSubmission from '../Pages/Fees/GenerateFee';
import FeeVoucher from '../Pages/Fees/FeeVoucher';
import FeePaymentStatus from '../Pages/Fees/FeePaymentStatus';
import Registration from '../Pages/School/Registration';
import AllSyllabuses from '../Pages/Syllabus/AllSyllabuses';
import AddSyllabus from '../Pages/Syllabus/AddSyllabus';
import AddExam from '../Pages/Exams/AddExam';
import AllExamsShedule from '../Pages/Exams/AllExamsShedule';

function AppRouter() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/students/allStudents' element={<AllStudents />} />
                <Route path='/students/admissionForm' element={<AdmissionForm />} />
                <Route path='/students/:id' element={<StudentDetailedPage />} />
                <Route path='/students/studentPromotion' element={<StudentPromotion />} />
                <Route path='/teachers/allTeachers' element={<AllTeachers />} />
                <Route path='/teachers/addTeachers' element={<AddTeachers />} />
                <Route path='/teachers/:id' element={<TeacherDetailedPage />} />
                <Route path='/teachers/teacherAllocation' element={<TeacherAllocation />} />
                <Route path='/subjects/allSubjects' element={<AllSubjects />} />
                <Route path='/subjects/addSubjects' element={<AddSubject />} />
                <Route path='/classes/addClass' element={<AddClass />} />
                <Route path='/classes/allClasses' element={<AllClasses />} />
                <Route path='/fees/generateFee' element={<FeeSubmission />} />
                <Route path='/fees/feesVoucher' element={<FeeVoucher />} />
                <Route path='/fees/feePaymentStatus' element={<FeePaymentStatus />} />
                <Route path='/school/registration' element={<Registration />} />
                <Route path='/syllabus/allSyllabuses' element={<AllSyllabuses />} />
                <Route path='/syllabus/addSyllabus' element={<AddSyllabus />} />
                <Route path='/exams/addExam' element={<AddExam />} />
                <Route path='/exams/allExamSchedule' element={<AllExamsShedule />} />
                </Routes>
        </BrowserRouter>
    </>
  )
}

export default AppRouter
