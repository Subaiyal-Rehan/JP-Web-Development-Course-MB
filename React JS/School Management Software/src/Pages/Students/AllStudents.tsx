import { useEffect, useState } from "react"
import Grid from "../../Components/MyGrid"
import Sidebar from "../../Layout/Sidebar"
import { getData } from "../../Config/FirebaseMethods"
import MyLoader from "../../Components/MyLoader"
import MyBlueButton from "../../Components/MyBlueButton"
import { Tooltip } from "@mui/material"

function AllStudents() {
  const [loader, setLoader] = useState(false)
  const [allStudentsData, setAllStudentsData] = useState<any>(false)
  useEffect(() => {
    setLoader(true)
    getData("Students").then((res: any) => {
      setAllStudentsData(res)
      setLoader(false)
    }).catch((err) => {
      console.log(err)
      setLoader(false)
    })
  }, [])

  const handleDelete = (obj: any) => {
    console.log("DELETE", obj)
  };
  const handleEdit = (obj: any) => {
    console.log("EDIT", obj)
  };

  const renderActions = (row: any) => (
    <>
      <Tooltip title="Edit" placement="top">
        <span>
          <MyBlueButton className="p-0 px-2 py-1 me-2" btnValue={<lord-icon src="https://cdn.lordicon.com/zfzufhzk.json" style={{ width: "35px", height: "35px" }} trigger="hover" />} onClick={() => handleEdit(row)} />
        </span>
      </Tooltip>
      <Tooltip title="Delete" placement="top">
        <span>
          <MyBlueButton className="p-0 px-2 py-1 me-2" btnValue={<lord-icon src="https://cdn.lordicon.com/xekbkxul.json" style={{ width: "35px", height: "35px" }} trigger="hover" colors="primary:#121331,secondary:#9ce5f4,tertiary:#646e78,quaternary:#ebe6ef" />} onClick={() => handleDelete(row)} />
        </span>
      </Tooltip>
      <Tooltip title="View Details" placement="top">
        <span>
          <MyBlueButton className="p-0 px-2 py-1 me-2" btnValue={<lord-icon src="https://cdn.lordicon.com/anqzffqz.json" trigger="hover" style={{ width: "35px", height: "35px" }} />} onClick={() => handleDelete(row)} />
        </span>
      </Tooltip>
    </>
  );

  const content = () => {
    return (
      <>
      <h1>MAKE Fs-6 class and Make the font little bit big of the table and make view details page</h1>
        {loader ? <MyLoader /> : <Grid data={allStudentsData ? allStudentsData : null} handleDelete={handleDelete} handleEdit={handleEdit} columns={[
          { id: 'StudentRoll', label: 'Roll' },
          { id: 'StudentFirstName', label: 'First Name' },
          { id: 'StudentLastName', label: 'Last Name' },
          { id: 'StudentGender', label: 'Gender' },
          { id: 'StudentDOB', label: 'Date of Birth' },
          { id: 'StudentFatherName', label: 'Father Full Name' },
          { id: 'StudentGuardianEmail', label: 'Guardian Email' },
          { id: 'StudentClass', label: 'Class' },
          { id: 'StudentGuardianPhone', label: 'Guardian Phone' },
          { id: 'actions', label: 'Actions', isAction: true, render: renderActions },
        ]} />}

      </>
    )
  }

  return (
    <>
      <Sidebar element={content()} breadcrumbLink="Students" pageName="All Students" breadcrumbNestedLink="All Students" />
    </>
  )
}

export default AllStudents
