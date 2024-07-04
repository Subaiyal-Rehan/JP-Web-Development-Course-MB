import { Col, Row } from "react-bootstrap";
import MyButton from "../../Components/MyButton";
import MyLoader from "../../Components/MyLoader";
import MySelect from "../../Components/MySelect";
import Sidebar from "../../Layout/Sidebar";
import FloatingInput from "../../Components/FloatingInput";
import { toastGreen, toastRed } from "../../Components/My Toasts";
import { getData, setData } from "../../Config/FirebaseMethods";
import { useEffect, useState } from "react";

function AddExam() {
    const [examData, setExamData] = useState({
        examName: '',
        examClass: '',
        examSubject: '',
        examDate: '',
        examDuration: '',
        totalMarks: '',
        passingMarks: '',
        examStatus: '',
    });
    const [classesName, setClassesName] = useState([]);
    const [subjectsName, setSubjectsName] = useState([]);
    const [loader, setLoader] = useState(false);

    const fetchData = () => {
        setLoader(true);
        getData("Classes").then((res: any) => {
            setClassesName(res.map((item: any) => item.ClassName));
        }).catch((err) => {
            console.log(err);
        });

        getData("Subjects").then((res: any) => {
            setSubjectsName(res.map((item: any) => item.SubjectName));
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoader(false);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleReset = () => {
        setExamData({
            examName: '',
            examClass: '',
            examSubject: '',
            examDate: '',
            examDuration: '',
            totalMarks: '',
            passingMarks: '',
            examStatus: '',
        });
    }


    const handleSave = (e: any) => {
        e.preventDefault();
        // setLoader(true);
        console.log(examData)
        setData("Exams", examData).then(() => {
            handleReset()
            toastGreen("Exam has been successfully added!");
        }).catch((err) => {
            console.log(err);
            toastRed("Failed to add exam. Please try again.");
        }).finally(() => {
            setLoader(false);
        });
    };
    const content = () => {
        return (
            <div className="container-fluid bg-white p-3 rounded">
                <h2 className='fs-4 mb-3'>Add New Exam</h2>
                <form onSubmit={handleSave}>
                    <Row>
                        <Col md={12} lg={6} xl={4} className="mb-3">
                            <FloatingInput
                                label="Exam Name*"
                                required={true}
                                onChange={(e: any) => setExamData({ ...examData, examName: e.target.value })}
                                placeholder="Enter Exam Name"
                                myValue={examData.examName}
                                type="text"
                            />
                        </Col>
                        <Col md={12} lg={6} xl={4} className="mb-3">
                            <MySelect
                                label="Select Class*"
                                required={true}
                                defaultValue="Please Select Class"
                                value={examData.examClass}
                                onChange={(e: any) => setExamData({ ...examData, examClass: e.target.value })}
                                options={classesName}
                            />
                        </Col>
                        <Col md={12} lg={6} xl={4} className="mb-3">
                            <MySelect
                                label="Select Subject*"
                                required={true}
                                defaultValue="Please Select Subject"
                                value={examData.examSubject}
                                onChange={(e: any) => setExamData({ ...examData, examSubject: e.target.value })}
                                options={subjectsName}
                            />
                        </Col>
                        <Col md={12} lg={6} xl={4} className="mb-3">
                            <FloatingInput
                                label="Exam Date*"
                                required={true}
                                onChange={(e: any) => setExamData({ ...examData, examDate: e.target.value })}
                                placeholder="Enter Exam Date"
                                myValue={examData.examDate}
                                type="date"
                            />
                        </Col>
                        <Col md={12} lg={6} xl={4} className="mb-3">
                            <FloatingInput
                                label="Exam Duration (in minutes)*"
                                required={true}
                                onChange={(e: any) => setExamData({ ...examData, examDuration: e.target.value })}
                                placeholder="Enter Exam Duration"
                                myValue={examData.examDuration}
                                type="number"
                            />
                        </Col>
                        <Col md={12} lg={6} xl={4} className="mb-3">
                            <FloatingInput
                                label="Total Marks*"
                                required={true}
                                onChange={(e: any) => setExamData({ ...examData, totalMarks: e.target.value })}
                                placeholder="Enter Total Marks"
                                myValue={examData.totalMarks}
                                type="number"
                            />
                        </Col>
                        <Col md={12} lg={6} xl={4} className="mb-3">
                            <FloatingInput
                                label="Passing Marks*"
                                required={true}
                                onChange={(e: any) => setExamData({ ...examData, passingMarks: e.target.value })}
                                placeholder="Enter Passing Marks"
                                myValue={examData.passingMarks}
                                type="number"
                            />
                        </Col>
                        <Col md={12} lg={6} xl={4} className="mb-3">
                            <MySelect
                                label="Exam Status*"
                                required={true}
                                defaultValue="Please Select Status"
                                value={examData.examStatus}
                                onChange={(e: any) => setExamData({ ...examData, examStatus: e.target.value })}
                                options={["Scheduled", "Completed", "Canceled"]}
                            />
                        </Col>
                    </Row>
                    <div className='d-flex gap-4'>
                        <MyButton type="submit" bgColor="var(--orange)" textColor="black" hoverBgColor="var(--darkBlue)" className="px-4 py-3" btnValue={(<div className="d-flex align-items-center gap-2">Save <lord-icon src="https://cdn.lordicon.com/dangivhk.json" trigger="hover" style={{ width: "30px", height: "30px" }} /></div>)} />
                        <MyButton btnValue={(<div className="d-flex align-items-center gap-2">Reset <lord-icon src="https://cdn.lordicon.com/abaxrbtq.json" trigger="hover" style={{ width: "30px", height: "30px" }} /></div>)} bgColor="var(--darkBlue)" hoverBgColor="var(--orange)" className="px-4 py-3" onClick={handleReset} />
                    </div>
                </form>
                {loader && <MyLoader />}
            </div>
        );
    }
    return (
        <>
            <Sidebar element={content()} breadcrumbLink="Exams" pageName="Add Exam" breadcrumbNestedLink="Add Exam" />
        </>
    )
}

export default AddExam
