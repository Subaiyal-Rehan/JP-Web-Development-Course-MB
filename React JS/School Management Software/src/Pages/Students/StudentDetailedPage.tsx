import { useParams } from 'react-router-dom'
import Sidebar from '../../Layout/Sidebar'
import { useEffect, useState } from 'react'
import { getData } from '../../Config/FirebaseMethods'

function StudentDetailedPage() {
    const params = useParams()
    const [studentData, setStudentData] = useState<any>(false)
    const fetchData = () => {
        getData("Students", params.id).then((res:any)=>{
            console.log(res)
            setStudentData(res)
        }).catch((err)=>{
            console.log(err)
        })
    }
    

    useEffect(() => {
      fetchData()
    }, [])
    

    const content = () => {
        return (
          <>
            {studentData && `${studentData.StudentFirstName}  ${studentData.StudentLastName}`}
          </>
        )
      }
    
      return (
        <>
          <Sidebar element={content()} breadcrumbLink="Students" pageName="Student Detailed Page" breadcrumbNestedLink="Student Detailed Page" />
        </>
  )
}

export default StudentDetailedPage
