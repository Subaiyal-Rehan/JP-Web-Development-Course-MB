import { useEffect, useState } from 'react'
import Sidebar from '../../Layout/Sidebar'
import { getData, setData } from '../../Config/FirebaseMethods'
import MyLoader from '../../Components/MyLoader'
import MySelect from '../../Components/MySelect'
import FloatingInput from '../../Components/FloatingInput'
import { Col, Row } from 'react-bootstrap'
import { toastGreen, toastRed } from '../../Components/My Toasts'
import MyButton from '../../Components/MyButton'

function StudentPromotion() {
    const [allStudentsData, setAllStudentData] = useState<any>(false)
    const [studentsName, setStudentsName] = useState<any>([])
    const [specificStudent, setSpecificStudent] = useState<any>([])
    const [selectedName, setSelectedName] = useState<any>([])
    const [newClass, setNewClass] = useState("")
    const [loader, setLoader] = useState<any>(false)
    const [actionLoader, setActionLoader] = useState(false);

    const fetchData = () => {
        setLoader(true)
        getData("Students").then((res) => {
            setAllStudentData(res)
            setLoader(false)
        }).catch((err) => {
            setLoader(false)
            console.log(err)
        })
    }


    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (allStudentsData) {
            setSpecificStudent(allStudentsData.filter((item: any) => selectedName == item.StudentFirstName))
        }
    }, [selectedName])

    useEffect(() => {
        if (allStudentsData) {
            if (studentsName.length !== allStudentsData.length) {
                setStudentsName([...allStudentsData.map((item: any) => item.StudentFirstName)]);
            }
        }
    }, [allStudentsData])

    const handleEdit = (e: any) => {
        e.preventDefault();
        setActionLoader(true);
        const finalObj = { ...specificStudent[0], StudentClass: newClass }
        console.log(finalObj);
        setData("Students", finalObj).then(() => {
            // setSpecificStudent([""]);
            // setSelectedName([])
            // setNewClass("")
            handleReset()
            fetchData()
            setActionLoader(false);
            toastGreen("Record successfully updated!")
        }).catch((err) => {
            console.log(err)
            setActionLoader(false);
            toastRed("Failed to update data. Please try again.")
        })
    };

    const handleReset = () => {
        setSpecificStudent([""]);
        setSelectedName([])
        setNewClass("")
    }



    const content = () => {
        return (
            <>
                <div className="container-fluid bg-white p-3 rounded">
                    <h2 className='fs-4 mb-4'>Promote Students</h2>
                    <h3 className='fs-5'>Select Student</h3>
                    <form onSubmit={handleEdit}>
                        {actionLoader ? <MyLoader /> : null}
                        {loader ? <MyLoader /> : allStudentsData && (
                            <>
                                <MySelect
                                    label="Students First Name"
                                    required={true}
                                    defaultValue="Students First Name"
                                    value={selectedName}
                                    onChange={(e: any) => setSelectedName(e.target.value)}
                                    options={studentsName} />
                                <Row className='mt-3'>
                                    <Col md={12} lg={4}>
                                        <FloatingInput label="Student Roll" disabled placeholder="" myValue={specificStudent[0] && specificStudent[0].StudentRoll} type="text" />
                                    </Col>
                                    <Col md={12} lg={4}>
                                        <FloatingInput label="Student Gender" disabled placeholder="" myValue={specificStudent[0] && specificStudent[0].StudentGender} type="text" />
                                    </Col>
                                    <Col md={12} lg={4}>
                                        <FloatingInput label="Students Father Name" disabled placeholder="" myValue={specificStudent[0] && specificStudent[0].StudentFatherName} type="text" />
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col md={12} lg={6}>
                                        <h3 className='fs-5'>Promotion From Class</h3>
                                        <FloatingInput label="Student Class" disabled placeholder="" myValue={specificStudent[0] && specificStudent[0].StudentClass} type="text" />
                                    </Col>
                                    <Col md={12} lg={6}>
                                        <h3 className='fs-5'>Promotion To Class</h3>
                                        <MySelect
                                            label="Select Class*"
                                            required={true}
                                            defaultValue="Please Select Class"
                                            value={newClass}
                                            onChange={(e: any) => setNewClass(e.target.value)}
                                            options={["Beginner", "KGI", "KGII", "One", "Two", "Three", "Four"]} />
                                    </Col>
                                </Row>
                                <div className='d-flex gap-4'>
                                    <MyButton type="submit" bgColor="var(--orange)" hoverBgColor="var(--darkBlue)" className="px-4 py-3" btnValue={(<div className="d-flex align-items-center gap-2">Save <lord-icon src="https://cdn.lordicon.com/dangivhk.json" trigger="hover" style={{ width: "30px", height: "30px" }} /></div>)} />
                                    <MyButton btnValue={(<div className="d-flex align-items-center gap-2">Reset <lord-icon src="https://cdn.lordicon.com/abaxrbtq.json" trigger="hover" style={{ width: "30px", height: "30px" }} /></div>)} bgColor="var(--darkBlue)" hoverBgColor="var(--orange)" className="px-4 py-3" onClick={handleReset} />
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </>
        )
    }
    return (
        <>
            <Sidebar element={content()} breadcrumbLink="Students" pageName="Student Promotion" breadcrumbNestedLink="Student Promotion" />
        </>
    )
}

export default StudentPromotion
