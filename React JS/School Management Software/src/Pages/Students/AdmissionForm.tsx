import { Row, Col } from 'react-bootstrap';
import Sidebar from '../../Layout/Sidebar'
import FloatingInput from '../../Components/FloatingInput';
import { getData, setData } from '../../Config/FirebaseMethods';
import { useEffect, useState } from 'react';
import MySelect from '../../Components/MySelect';
import MyTextarea from '../../Components/MyTextarea';
import { toastGreen, toastRed } from '../../Components/My Toasts';
import MyButton from '../../Components/MyButton';

function AdmissionForm() {
    const [loader, setLoader] = useState<boolean>(false)
    const [StudentData, setStudentData] = useState<any>({
        StudentFirstName: "",
        StudentLastName: "",
        StudentGender: "",
        StudentDOB: "",
        StudentFatherName: "",
        StudentFatherCNIC: "",
        StudentRoll: "",
        StudentBloodGroup: "",
        StudentReligion: "",
        StudentGuardianEmail: "",
        StudentClass: "",
        StudentGuardianPhone: "",
        StudentShortBio: "",
        StudentImage: "",
    })

    const handleReset = () => {
        setStudentData({
            StudentFirstName: "",
            StudentLastName: "",
            StudentGender: "",
            StudentDOB: "",
            StudentFatherName: "",
            StudentFatherCNIC: "",
            StudentRoll: "",
            StudentBloodGroup: "",
            StudentReligion: "",
            StudentGuardianEmail: "",
            StudentClass: "",
            StudentGuardianPhone: "",
            StudentShortBio: "",
            StudentImage: "",
        })
    }

    const fetchData =() => {
        setLoader(true)
        getData("Students").then((res:any) => {
            setStudentData((a:any) => ({ ...a, StudentRoll: res.length > 0 ? res.slice(-1)[0].StudentRoll + 1 : 1}));
            console.log(res.slice(-1)[0].StudentRoll)
            setLoader(false)
        }).catch((err) => {
            console.log(err)
            setLoader(false)
        })
    }
    useEffect(() => {
        fetchData()
    }, [])


    const handleSave = (e: any) => {
        e.preventDefault();
        setData("Students", StudentData).then(() => {
            toastGreen("Student has been successfully added!")
            handleReset()
            fetchData()
        }).catch((err) => {
            console.log(err)
            toastRed("Failed to add student. Please try again.")
        })
    }


    const content = () => {
        return (
            <>
                <div className="container-fluid bg-white p-3 rounded">
                    <h2 className='fs-4 mb-3'>Add New Students - Use Firebase Storage for the image - Make Select Class Dynamic</h2>
                    <form onSubmit={handleSave}>
                        <div className='mt-4 mb-0'>
                            <h3 className='fs-5 mb-0'>Personal Information</h3> <hr className='mt-2' />
                        </div>
                        <Row className='row-gap-2'>
                            <Col md={12} lg={6} xl={3} className="mb-3">
                                <div style={{ height: "58px" }}>
                                    <FloatingInput label="Student First Name*" required={true} onChange={(e: any) => setStudentData({ ...StudentData, StudentFirstName: e.target.value })} placeholder="Enter Students First Name" myValue={StudentData.StudentFirstName} type="text" />
                                </div>
                            </Col>
                            <Col md={12} lg={6} xl={3} className="mb-3">
                                <div style={{ height: "58px" }}>
                                    <FloatingInput label="Student Last Name*" required={true} onChange={(e: any) => setStudentData({ ...StudentData, StudentLastName: e.target.value })} placeholder="Enter Students Last Name" myValue={StudentData.StudentLastName} type="text" />
                                </div>
                            </Col>
                            <Col md={12} lg={6} xl={3} className="mb-3">
                                <div style={{ height: "58px" }}>
                                    <MySelect label="Select Gender*" required={true} defaultValue="Please Select Gender" value={StudentData.StudentGender} onChange={(e: any) => setStudentData({ ...StudentData, StudentGender: e.target.value })} options={["Male", "Female"]} />
                                </div>
                            </Col>
                            <Col md={12} lg={6} xl={3} className="mb-3">
                                <div style={{ height: "58px" }}>
                                    <FloatingInput label="Date Of Birth*" required={true} onChange={(e: any) => setStudentData({ ...StudentData, StudentDOB: e.target.value })} myValue={StudentData.StudentDOB} placeholder="Enter Students Date of birth" type="date" />
                                </div>
                            </Col>
                            <Col md={12} lg={6} xl={3} className="mb-3">
                                <div style={{ height: "58px" }}>
                                    <MySelect label="Select Blood Group*" required={true} defaultValue="Please Select Blood Group" value={StudentData.StudentBloodGroup} onChange={(e: any) => setStudentData({ ...StudentData, StudentBloodGroup: e.target.value })} options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]} />
                                </div>
                            </Col>
                            <Col md={12} lg={6} xl={3} className="mb-3">
                                <div style={{ height: "58px" }}>
                                    <MySelect label="Select Religion*" required={true} defaultValue="Please Select Religion" value={StudentData.StudentReligion} onChange={(e: any) => setStudentData({ ...StudentData, StudentReligion: e.target.value })} options={["Islam", "Hindu", "Christian", "Others"]} />
                                </div>
                            </Col>
                        </Row>

                        <div className='mt-4'>
                            <h3 className='fs-5 mb-0'>Parental/Guardian Information</h3> <hr className='mt-2' />
                        </div>
                        <Row className='row-gap-2'>
                            <Col md={12} lg={6} xl={3} className="mb-3">
                                <div style={{ height: "58px" }}>
                                    <FloatingInput label="Students Fathers Full Name*" placeholder="Enter Students Fathers Full Name" required={true} myValue={StudentData.StudentFatherName} type="text" onChange={(e: any) => setStudentData({ ...StudentData, StudentFatherName: e.target.value })} />
                                </div>
                            </Col>
                            <Col md={12} lg={6} xl={3} className="mb-3">
                                <div style={{ height: "58px" }}>
                                    <FloatingInput label="Students Fathers CNIC*" placeholder="Enter Students Fathers CNIC" required={true} myValue={StudentData.StudentFatherCNIC} type="text" onChange={(e: any) => setStudentData({ ...StudentData, StudentFatherCNIC: e.target.value })} />
                                </div>
                            </Col>
                            <Col md={12} lg={6} xl={3} className="mb-3">
                                <div style={{ height: "58px" }}>
                                    <FloatingInput label="Guardian Email*" required={true} myValue={StudentData.StudentGuardianEmail} onChange={(e: any) => setStudentData({ ...StudentData, StudentGuardianEmail: e.target.value })} placeholder="Enter Guardians Email Address" type="email" />
                                </div>
                            </Col>
                            <Col md={12} lg={6} xl={3} className="mb-3">
                                <div style={{ height: "58px" }}>
                                    <FloatingInput label="Guardian Phone*" required={true} myValue={StudentData.StudentGuardianPhone} onChange={(e: any) => setStudentData({ ...StudentData, StudentGuardianPhone: e.target.value })} placeholder="Enter Guardians Phone Number" type="text" />
                                </div>
                            </Col>
                        </Row>
                        <div className='mt-4'>
                            <h3 className='fs-5 mb-0'>Academic Information</h3> <hr className='mt-2' />
                        </div>
                        <Row className='row-gap-2'>
                            <Col md={12} lg={6} xl={3} className="mb-3">
                                <div style={{ height: "58px" }}>
                                    <FloatingInput label="Roll (Auto Generated)" disabled placeholder="" required={true} myValue={loader ? "Loading..." : StudentData.StudentRoll} type="text" />
                                </div>
                            </Col>
                            <Col md={12} lg={6} xl={3} className="mb-3">
                                <div style={{ height: "58px" }}>
                                    <MySelect label="Select Class*" required={true} defaultValue="Please Select Class" value={StudentData.StudentClass} onChange={(e: any) => setStudentData({ ...StudentData, StudentClass: e.target.value })} options={["Beginner", "KGI", "KGII", "One", "Two", "Three", "Four"]} />
                                </div>
                            </Col>
                        </Row>
                        <div className='mt-4'>
                            <h3 className='fs-5 mb-0'>Additional Information</h3> <hr className='mt-2' />
                        </div>
                        <Row className='row-gap-2'>
                            <Col lg={12} xl={6} className="mb-3">
                                <div>
                                    <MyTextarea required={false} value={StudentData.StudentShortBio} onChange={(e: any) => setStudentData({ ...StudentData, StudentShortBio: e.target.value })} label="Students Short Bio" />
                                </div>
                            </Col>
                            <Col lg={12} xl={6} className="mb-3">
                                <div>
                                    <label htmlFor='imageInput'>Upload Student Photo (150px X 150px)*</label> <br />
                                    <input type="file" required={true} value={StudentData.StudentImage} onChange={(e: any) => setStudentData({ ...StudentData, StudentImage: e.target.value })} id='imageInput' accept='image/*' />
                                </div>
                            </Col>
                            <div className='d-flex gap-4'>
                                <MyButton type="submit" bgColor="var(--orange)" hoverBgColor="var(--darkBlue)" className="px-5 py-3" btnValue="Save" />
                                <MyButton btnValue="Reset" bgColor="var(--darkBlue)" hoverBgColor="var(--orange)" className="px-5 py-3" onClick={handleReset} />
                            </div>
                        </Row>
                    </form>
                </div>
            </>
        )
    }

    return (
        <>
            <Sidebar element={content()} breadcrumbLink="Students" pageName="Student Admission Form" breadcrumbNestedLink="Admission Form" />
        </>
    )
}

export default AdmissionForm
