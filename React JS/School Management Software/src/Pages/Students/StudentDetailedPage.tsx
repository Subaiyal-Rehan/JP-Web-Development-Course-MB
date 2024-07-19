import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../Layout/Sidebar'
import { useEffect, useState } from 'react'
import { deleteData, getData, setData } from '../../Config/FirebaseMethods'
import MyLoader from '../../Components/MyLoader'
import ProfileBoy from '../../Images/Profile Boy.png'
import ProfileGirl from '../../Images/Profile Girl.png'
import { Tooltip } from '@mui/material'
import MyButton from '../../Components/MyButton'
import MyModal from '../../Components/MyModal'
import { toastGreen, toastRed } from '../../Components/My Toasts'
import { Col, Row } from 'react-bootstrap'
import FloatingInput from '../../Components/FloatingInput'
import MySelect from '../../Components/MySelect'
import MyTextarea from '../../Components/MyTextarea'
import ConfirmModal from '../../Components/ConfirmModal'

function StudentDetailedPage() {
  const params = useParams()
  const [loader, setLoader] = useState<boolean>(false)
  const [actionLoader, setActionLoader] = useState(false);
  const [studentData, setStudentData] = useState<any>(false)
  const [editedStudentObj, setEditedStudentObj] = useState<any>({})
  const [editIsOpen, setEditIsOpen] = useState<boolean>(false)
  const [delIsOpen, setDelIsOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const fetchData = () => {
    setLoader(true)
    getData("Students", params.id).then((res: any) => {
      setLoader(false)
      setStudentData(res)
    }).catch((err) => {
      setLoader(false)
      console.log(err)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    console.log(editedStudentObj)
  }, [editedStudentObj])

  const handleDelete = () => {
    setActionLoader(true);
    deleteData("Students", studentData.id).then(() => {
      handleCloseModal()
      setStudentData({})
      fetchData()
      setActionLoader(false);
      toastGreen("Record successfully deleted!")
      navigate("/students/allStudents")
    }).catch((err) => {
      console.log(err)
      toastRed("Failed to delete the data. Please try again.")
    })
  };
  const handleEdit = (e: any) => {
    e.preventDefault();
    const finalObj = { ...studentData, ...editedStudentObj }
    console.log({ ...studentData, ...editedStudentObj });
    console.log(studentData, "Student OBJ")
    console.log(editedStudentObj, "EDITED OBJ")
    setActionLoader(true);
    setData("Students", finalObj).then(() => {
      setStudentData({}); setEditedStudentObj({})
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
    return editedStudentObj[field] !== undefined ? editedStudentObj[field] : studentData[field];
  }


  const StudentDetails = [
    {
      label: "First Name",
      objName: "StudentFirstName"
    },
    {
      label: "Last Name",
      objName: "StudentLastName"
    },
    {
      label: "Gender",
      objName: "StudentGender"
    },
    {
      label: "Father Name",
      objName: "StudentFatherName"
    },
    {
      label: "Date Of Birth",
      objName: "StudentDOB"
    },
    {
      label: "Religion",
      objName: "StudentReligion"
    },
    {
      label: "Father Occupation",
      objName: "StudentFatherOccupation"
    },
    {
      label: "Guardian Email",
      objName: "StudentGuardianEmail"
    },
    {
      label: "Admission Date",
      objName: "StudentAdmissionDate"
    },
    {
      label: "Class",
      objName: "StudentClass"
    },
    {
      label: "Roll",
      objName: "StudentRoll"
    },
    {
      label: "Address",
      objName: "StudentAddress"
    },
    {
      label: "Guardian Phone",
      objName: "StudentGuardianPhone"
    },
  ]

  const content = () => {
    return (
      <>
        <div className="container-fluid bg-white p-3 rounded">
          {actionLoader ? <MyLoader /> : null}
          {loader ? <MyLoader /> : studentData &&
            (<div className='d-flex justify-content-between'>
              <div className="StudentInfo d-flex gap-5">
                <div className="StudentImage centerImg bg-orange rounded" style={{ height: "350px", width: "300px" }}>
                  <img src={studentData.StudentGender == "Male" ? ProfileBoy : ProfileGirl} />
                </div>
                <div className="StudentDetails">
                  <h2 className='fs-3'>{`${studentData.StudentFirstName} ${studentData.StudentLastName}`}</h2>
                  <p className='w-75'>{studentData.StudentShortBio ? studentData.StudentShortBio : "No Bio"}</p>
                  <table>
                    <tbody>
                      {StudentDetails.map((item, index) => {
                        const value = studentData[item.objName];
                        const displayValue = item.objName === 'StudentAdmissionDate' ? new Date(JSON.parse(value)).toISOString().slice(0, 10) : value;
                        return (
                          <tr key={index}>
                            <td className='py-2'> {item.label}:</td>
                            <td className='fw-bold py-2 text-black'>{displayValue} {(item.label === "Admission Date" || item.label === "Date Of Birth") && <span className="text-secondary fw-light">(yyyy-mm-dd)</span>}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="Actions d-flex">
                <div>
                <Tooltip title="Edit" placement="top">
                  <span>
                    <MyButton bgColor="var(--green)" hoverBgColor="#00943e" className="p-0 px-1 pt-1 me-2" btnValue={<lord-icon src="https://cdn.lordicon.com/zfzufhzk.json" style={{ width: "37px", height: "37px" }} trigger="hover" />} onClick={() => { setEditIsOpen(true) }} />
                  </span>
                </Tooltip>
                </div>
                <div>
                <Tooltip title="Delete" placement="top">
                  <span>
                    <MyButton bgColor="var(--red)" hoverBgColor="rgb(139, 0, 0)" className="p-0 px-1 pt-1 me-2" btnValue={<lord-icon src="https://cdn.lordicon.com/xekbkxul.json" style={{ width: "37px", height: "37px" }} trigger="hover" colors="primary:#121331,secondary:#9ce5f4,tertiary:#646e78,quaternary:#ebe6ef" />} onClick={() => { setDelIsOpen(true) }} />
                  </span>
                </Tooltip>
                </div>
              </div>
            </div>)}
        </div>
      </>
    )
  }

  return (
    <>
      <Sidebar element={content()} breadcrumbLink="Students" pageName="Student Detailed Page" breadcrumbNestedLink="Student Detailed Page" />

      <MyModal title="Edit Students Details" height="65vh" onClose={handleCloseModal} isOpen={editIsOpen}
        body={(
          <>
            <form onSubmit={(e)=>{handleEdit(e)}}>
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
                    label="Student Date Of Birth"
                    required={true}
                    onChange={(e: any) => setEditedStudentObj({ ...editedStudentObj, StudentDOB: e.target.value })}
                    myValue={getValue("StudentDOB")}
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
                    label="Select Blood Group"
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
                    label="Students Fathers CNIC"
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
                    label="Guardian Email"
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
                    options={["Beginner", "KGI", "KGII", "One", "Two", "Three", "Four"]}
                  />
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
                    studentData.StudentImage && (
                      <div>
                        <p>Current file: {studentData.StudentImage}</p>
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


      <ConfirmModal title={`Are you sure you want to delete ${studentData.StudentFirstName} ${studentData.StudentLastName}`}
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

export default StudentDetailedPage
