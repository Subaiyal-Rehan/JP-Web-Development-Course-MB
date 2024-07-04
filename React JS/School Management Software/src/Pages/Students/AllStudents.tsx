import { useEffect, useState } from "react"
import Grid from "../../Components/MyGrid"
import Sidebar from "../../Layout/Sidebar"
import { deleteData, getData, setData } from "../../Config/FirebaseMethods"
import MyLoader from "../../Components/MyLoader"
import { Tooltip } from "@mui/material"
import MyModal from "../../Components/MyModal"
import MyButton from "../../Components/MyButton"
import FloatingInput from "../../Components/FloatingInput"
import { Col, Row } from "react-bootstrap"
import MySelect from "../../Components/MySelect"
import MyTextarea from "../../Components/MyTextarea"
import { toastGreen, toastRed } from "../../Components/My Toasts"
import ConfirmModal from "../../Components/ConfirmModal"
import { useNavigate } from "react-router-dom"

function AllStudents() {
  const [loader, setLoader] = useState(false)
  const [actionLoader, setActionLoader] = useState(false);
  const [allStudentsData, setAllStudentsData] = useState<any>(false)
  const [allClassesData, setAllClassesData] = useState<any>(false)
  const [filteredStudentsData, setFilteredStudentsData] = useState<any>(false)
  const [classesName, setClassesName] = useState<any>([])
  const [editIsOpen, setEditIsOpen] = useState<boolean>(false)
  const [delIsOpen, setDelIsOpen] = useState<boolean>(false)
  const [studentObj, setStudentObj] = useState<any>({})
  const [editedStudentObj, setEditedStudentObj] = useState<any>({})
  const [rollSearch, setRollSearch] = useState<any>("")
  const [nameSearch, setNameSearch] = useState<any>("")
  const [classSearch, setClassSearch] = useState<any>("")
  const navigate = useNavigate()

  const fetchData = () => {
    setLoader(true)
    getData("Students").then((res: any) => {
      setAllStudentsData(res)
      setLoader(false)
    }).catch((err) => {
      console.log(err)
      setLoader(false)
    })
  }

  const fetchClassesData = () => {
    setLoader(true)
    getData("Classes").then((res: any) => {
      setAllClassesData(res)
      setLoader(false)
    }).catch((err) => {
      console.log(err)
      setLoader(false)
    })
  }

  useEffect(() => {
    if (allClassesData) {
        if (classesName.length !== allClassesData.length) {
            setClassesName([...allClassesData.map((item: any) => item.ClassName)]);
        }
    }
}, [allClassesData])

  useEffect(() => {
    fetchData();
    fetchClassesData();
  }, [])

  useEffect(() => {
    console.log(allClassesData)
  }, [allClassesData])

  const handleDelete = () => {
    setActionLoader(true);
    deleteData("Students", studentObj.id).then(() => {
      handleCloseModal()
      setStudentObj({})
      fetchData()
      setActionLoader(false);
      toastGreen("Record successfully deleted!")
    }).catch((err) => {
      console.log(err)
      setActionLoader(false);
      toastRed("Failed to delete the data. Please try again.")
    })
  };
  const handleEdit = (e: any) => {
    e.preventDefault();
    const finalObj = { ...studentObj, ...editedStudentObj };
    console.log(studentObj,"STUDENT OBJ")
    console.log(editedStudentObj,"EDITED STUDENT OBJ")
    console.log(finalObj);
    setActionLoader(true);
    setData("Students", finalObj).then(() => {
      setStudentObj({}); setEditedStudentObj({})
      fetchData()
      handleCloseModal()
      setActionLoader(false);
      toastGreen("Record successfully updated!")
    }).catch((err) => {
      console.log(err)
      setActionLoader(false);
      toastRed("Failed to update data. Please try again.")
    })
  };

  const handleCloseModal = () => {
    setEditIsOpen(false);
    setDelIsOpen(false);
    setEditedStudentObj({})
  };

  const getValue = (field: string) => {
    return editedStudentObj[field] !== undefined ? editedStudentObj[field] : studentObj[field];
  }


  // Search Mechanism
  useEffect(() => {
    let filteredData = allStudentsData;

    if (rollSearch !== "") {
      filteredData = filteredData.filter((item: any) => item.StudentRoll == rollSearch);
    }

    if (nameSearch !== "") {
      filteredData = filteredData.filter((item: any) => item.StudentFirstName.toLowerCase().includes(nameSearch.toLowerCase()) || item.StudentLastName.toLowerCase().includes(nameSearch.toLowerCase()));
    }

    if (classSearch !== "") {
      filteredData = filteredData.filter((item: any) => item.StudentClass.toLowerCase().includes(classSearch.toLowerCase()));
    }

    setFilteredStudentsData(filteredData);
  }, [rollSearch, nameSearch, classSearch, allStudentsData]);


  // Action Buttons
  const renderActions = (row: any) => (
    <>
      <Tooltip title="Edit" placement="top">
        <span>
          <MyButton bgColor="var(--green)" hoverBgColor="#00943e" className="p-0 px-1 pt-1 me-2" btnValue={<lord-icon src="https://cdn.lordicon.com/zfzufhzk.json" style={{ width: "37px", height: "37px" }} trigger="hover" />} onClick={() => { setStudentObj(row); setEditIsOpen(true) }} />
        </span>
      </Tooltip>

      <Tooltip title="Delete" placement="top">
        <span>
          <MyButton bgColor="var(--red)" hoverBgColor="rgb(139, 0, 0)" className="p-0 px-1 pt-1 me-2" btnValue={<lord-icon src="https://cdn.lordicon.com/xekbkxul.json" style={{ width: "37px", height: "37px" }} trigger="hover" colors="primary:#121331,secondary:#9ce5f4,tertiary:#646e78,quaternary:#ebe6ef" />} onClick={() => { setStudentObj(row); setDelIsOpen(true) }} />
        </span>
      </Tooltip>
      <Tooltip title="View Details" placement="top">
        <span>
          <MyButton bgColor="var(--orange)" hoverBgColor="#b87a00" className="p-0 px-1 pt-1" btnValue={<lord-icon src="https://cdn.lordicon.com/anqzffqz.json" trigger="hover" style={{ width: "37px", height: "37px" }} />} onClick={() => { navigate(`/students/${row.id}`) }} />
        </span>
      </Tooltip>
    </>
  );

  const content = () => {
    return (
      <>
        <div className="container-fluid bg-white p-3 rounded">
          <h2 className='fs-4 mb-3'>All Students Data</h2>
          <Row>
            <Col sm={12} md={4}>
              <FloatingInput label="Search by Roll" placeholder="Search by Students Roll" myValue={rollSearch} onChange={(e: any) => { setRollSearch(e.target.value) }} type="text" />
            </Col>
            <Col sm={12} md={4}>
              <FloatingInput label="Search by Name" placeholder="Search by Students Name" myValue={nameSearch} onChange={(e: any) => { setNameSearch(e.target.value) }} type="text" />
            </Col>
            <Col sm={12} md={4}>
              <FloatingInput label="Search by Class" placeholder="Search by Students Class" myValue={classSearch} onChange={(e: any) => { setClassSearch(e.target.value) }} type="text" />
            </Col>
          </Row>

          {actionLoader ? <MyLoader /> : null}
          {loader ? <MyLoader /> : <Grid data={filteredStudentsData ? filteredStudentsData : null} columns={[
            { id: 'StudentRoll', label: 'Roll' },
            { id: 'StudentFirstName', label: 'First Name' },
            { id: 'StudentLastName', label: 'Last Name' },
            { id: 'StudentGender', label: 'Gender' },
            { id: 'StudentDOB', label: 'Date of Birth' },
            { id: 'StudentFatherName', label: 'Father Full Name' },
            { id: 'StudentGuardianEmail', label: 'Guardian Email' },
            { id: 'StudentClass', label: 'Class' },
            { id: 'StudentGuardianPhone', label: 'Guardian Phone' },
            { id: 'actions', label: 'Actions', isAction: true, render: renderActions, minWidth: "195px" },
          ]} />}
        </div>
      </>
    )
  }

  return (
    <>
      <Sidebar element={content()} breadcrumbLink="Students" pageName="All Students" breadcrumbNestedLink="All Students" />
      <MyModal title="Edit Students Details" height="65vh" onClose={handleCloseModal} isOpen={editIsOpen}
        body={(
          <>
            <form onSubmit={(e)=>handleEdit(e)}>
              <div className='mb-0'>
                <h3 className='fs-5 mb-0'>Personal Information</h3> <hr className='mt-2' />
              </div>
              <Row>
                <Col md={12} lg={6}>
                  <FloatingInput
                    label="Student First Name"
                    required={true}
                    onChange={(e: any) => setEditedStudentObj({ ...editedStudentObj, StudentFirstName: e.target.value })}
                    placeholder="Edit Students First Name"
                    myValue={getValue("StudentFirstName")}
                    type="text"
                  />
                </Col>
                <Col md={12} lg={6}>
                  <FloatingInput
                    label="Student Last Name"
                    required={true}
                    onChange={(e: any) => setEditedStudentObj({ ...editedStudentObj, StudentLastName: e.target.value })}
                    placeholder="Edit Students Last Name"
                    myValue={getValue("StudentLastName")}
                    type="text"
                  />
                </Col>
                <Col md={12} lg={6}>
                  <MySelect
                    label="Select Gender*"
                    required={true}
                    defaultValue="Please Select Gender"
                    value={getValue("StudentGender")}
                    onChange={(e: any) => setEditedStudentObj({ ...editedStudentObj, StudentGender: e.target.value })}
                    options={["Male", "Female"]}
                  />
                </Col>
                <Col md={12} lg={6}>
                  <FloatingInput
                    label="Student Date Of Birth*"
                    required={true}
                    onChange={(e: any) => setEditedStudentObj({ ...editedStudentObj, StudentDOB: e.target.value })}
                    myValue={editedStudentObj.StudentDOB || studentObj.StudentDOB}
                    placeholder="Edit Students Date of birth"
                    type="date"
                  />
                </Col>
                <Col md={12} lg={6}>
                  <FloatingInput
                    label="Student Address"
                    required={true}
                    onChange={(e: any) => setEditedStudentObj({ ...editedStudentObj, StudentAddress: e.target.value })}
                    myValue={getValue("StudentAddress")}
                    placeholder="Edit Students Address"
                    type="text"
                  />
                </Col>
                <Col md={12} lg={6}>
                  <MySelect
                    label="Select Blood Group*"
                    required={true}
                    defaultValue="Please Select Blood Group"
                    value={getValue("StudentBloodGroup")}
                    onChange={(e: any) => setEditedStudentObj({ ...editedStudentObj, StudentBloodGroup: e.target.value })}
                    options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                  />
                </Col>
                <Col md={12} lg={6}>
                  <MySelect
                    label="Select Religion*"
                    required={true}
                    defaultValue="Please Select Religion"
                    value={getValue("StudentReligion")}
                    onChange={(e: any) => setEditedStudentObj({ ...editedStudentObj, StudentReligion: e.target.value })}
                    options={["Islam", "Hindu", "Christian", "Others"]}
                  />
                </Col>
              </Row>
              <div className='mt-4'>
                <h3 className='fs-5 mb-0'>Parental/Guardian Information</h3> <hr className='mt-2' />
              </div>
              <Row>
                <Col md={12} lg={6}>
                  <FloatingInput
                    label="Students Fathers Full Name"
                    placeholder="Edit Students Fathers Full Name"
                    required={true}
                    myValue={getValue("StudentFatherName")}
                    type="text"
                    onChange={(e: any) => setEditedStudentObj({ ...editedStudentObj, StudentFatherName: e.target.value })}
                  />
                </Col>
                <Col md={12} lg={6}>
                  <FloatingInput
                    label="Students Fathers CNIC*"
                    placeholder="Edit Students Fathers CNIC"
                    required={true}
                    myValue={getValue("StudentFatherCNIC")}
                    type="text"
                    onChange={(e: any) => setEditedStudentObj({ ...editedStudentObj, StudentFatherCNIC: e.target.value })}
                  />
                </Col>
                <Col md={12} lg={6}>
                  <FloatingInput
                    label="Students Fathers Occupation"
                    placeholder="Edit Students Fathers Occupation"
                    required={true}
                    myValue={getValue("StudentFatherOccupation")}
                    type="text"
                    onChange={(e: any) => setEditedStudentObj({ ...editedStudentObj, StudentFatherOccupation: e.target.value })}
                  />
                </Col>
                <Col md={12} lg={6}>
                  <FloatingInput
                    label="Guardian Email*"
                    required={true}
                    myValue={getValue("StudentGuardianEmail")}
                    onChange={(e: any) => setEditedStudentObj({ ...editedStudentObj, StudentGuardianEmail: e.target.value })}
                    placeholder="Edit Guardians Email Address"
                    type="email"
                  />
                </Col>
                <Col md={12} lg={6}>
                  <FloatingInput
                    label="Guardian Phone*"
                    required={true}
                    myValue={getValue("StudentGuardianPhone")}
                    onChange={(e: any) => setEditedStudentObj({ ...editedStudentObj, StudentGuardianPhone: e.target.value })}
                    placeholder="Edit Guardians Phone Number"
                    type="text"
                  />
                </Col>
              </Row>
              <div className='mt-4'>
                <h3 className='fs-5 mb-0'>Academic Information</h3> <hr className='mt-2' />
              </div>
              <Row>
                <Col md={12} lg={6}>
                  <FloatingInput
                    label="Roll (Auto Generated)"
                    disabled
                    placeholder=""
                    required={true}
                    myValue={getValue("StudentRoll")}
                    type="text"
                  />
                </Col>
                <Col md={12} lg={6}>
                  <MySelect
                    label="Select Class*"
                    required={true}
                    defaultValue="Please Select Class"
                    value={getValue("StudentClass")}
                    onChange={(e: any) => setEditedStudentObj({ ...editedStudentObj, StudentClass: e.target.value })}
                    options={classesName}
                  />
                </Col>
                <Col md={12} lg={6}>
                <FloatingInput label="Fees*" required={true} myValue={getValue("StudentFees")} onChange={(e: any) => setEditedStudentObj({ ...editedStudentObj, StudentFees: e.target.value })} placeholder="Enter Student Fees" type="number" />
                </Col>
              </Row>
              <div className='mt-4'>
                <h3 className='fs-5 mb-0'>Additional Information</h3> <hr className='mt-2' />
              </div>
              <Row>
                <Col lg={12} xl={6}>
                  <MyTextarea
                    required={false}
                    value={getValue("StudentShortBio")}
                    onChange={(e: any) => setEditedStudentObj({ ...editedStudentObj, StudentShortBio: e.target.value })}
                    label="Students Short Bio"
                  />
                </Col>
                <Col lg={12} xl={6}>
                  <div>
                    <label htmlFor='imageInput'>Upload Student Photo (150px X 150px)</label> <br />
                    <input
                      type="file"
                      onChange={(e: any) => setEditedStudentObj({ ...editedStudentObj, StudentImage: e.target.value })}
                      id='imageInput'
                      accept='image/*'
                    />
                  </div>
                  {editedStudentObj.StudentImage ? (
                    <div>
                      <p>Selected file: {editedStudentObj.StudentImage}</p>
                    </div>
                  ) : (
                    studentObj.StudentImage && (
                      <div>
                        <p>Current file: {studentObj.StudentImage}</p>
                      </div>
                    )
                  )}
                </Col>
              </Row>
              <hr className="mt-4 mb-2" />
              <div className="text-end" >
                <MyButton bgColor="var(--darkBlue)" hoverBgColor="var(--orange)" className="me-2" btnValue={(<div className="d-flex align-items-center gap-2">Save <lord-icon src="https://cdn.lordicon.com/dangivhk.json" trigger="hover" style={{ width: "37px", height: "37px" }} /></div>)} type="submit" />
              </div>
            </form>
          </>
        )}
        footer={(
          <div>
            <MyButton bgColor="var(--darkBlue)" hoverBgColor="var(--orange)" className="me-2" btnValue="Close" onClick={handleCloseModal} />
          </div>
        )} />


      <ConfirmModal title={`Are you sure you want to delete ${studentObj.StudentFirstName} ${studentObj.StudentLastName}`}
        icon={(<lord-icon src="https://cdn.lordicon.com/jxzkkoed.json" trigger="hover" style={{ width: "120px", height: "120px" }} />)}
        onClose={handleCloseModal} isOpen={delIsOpen}
        body={(
          <>
            <MyButton bgColor="var(--red)" hoverBgColor="rgb(139, 0, 0)" className="me-4" btnValue="Yes, Delete" onClick={()=>{handleCloseModal(); handleDelete()}} />
            <MyButton bgColor="var(--green)" hoverBgColor="#00943e" btnValue="No, Cancel" onClick={handleCloseModal} />
          </>
        )} />
    </>
  )
}

export default AllStudents
