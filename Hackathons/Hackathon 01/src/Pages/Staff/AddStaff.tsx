import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/esm/Row"
import SRInput from "../../Components/SRInput"
import SRButton from "../../Components/SRButton"
import { useEffect, useState } from "react"
import { getData, setData } from "../../Config/FirebaseMethods"
import SRSelect from "../../Components/SRSelect"
import { toastGreen, toastRed } from "../../Components/My Toasts"
import SRLoader from "../../Components/SRLoader"

function AddStaff() {
    const initialObj = {
        StaffName: "",
        StaffNumber: "",
        StaffEmail: "",
        StaffGender: "",
        StaffAddress: "",
        StaffDepartment: "",
        StaffSalary: "",
        StaffJoiningDate: "",
    }
    const [staffData, setStaffData] = useState<any>(initialObj)
    const [loader, setLoader] = useState<any>(false)

    const fetchData = () => {
        getData("Staff").then((res: any) => {
            let a = res[res.length - 1].StaffId
            a && setStaffData({ ...staffData, StaffId: Number(a) + 1 })
        }).catch((err) => {
            err && setStaffData({ ...staffData, StaffId: 1 })
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        console.log(staffData)
    }, [staffData])


    const handleChange = (node: string, value: any) => {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

        setStaffData({
            ...staffData,
            [node]: value.target.value,
            StaffJoiningDate: formattedDate,
        });
    }

    const handleReset = (checkSubmit:boolean) => {
        let currentID;
        if (checkSubmit) {
            currentID = staffData.StaffId + 1
        } else {
            currentID = staffData.StaffId
        }
        setStaffData({...initialObj, StaffId: currentID})
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setLoader(true)
        setData("Staff", staffData).then(() => {
            setLoader(false)
            toastGreen("Staff successfully added.")
            handleReset(true);
        }).catch(() => {
            setLoader(false)
            toastRed("Failed to add the staff. Please try again.")
        })
    }

    return (
        <>
            {loader && <SRLoader />}
            <div className='custom-black'>
                <h2 className="fs-heading">Add Staff</h2>
                <form onSubmit={handleSubmit}>
                    <Row>
                        <h3 className="m-0 fs-5 mt-4 text-white">Personal Details</h3>
                        <Col lg={4} md={6} sm={12}>
                            <SRInput placeholder="Loading..." disabled={true} value={staffData && staffData.StaffId} label="Staff ID (Auto Generated)" />
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                            <SRInput value={staffData.StaffName} onChange={(e: any) => handleChange('StaffName', e)} label="Enter Staff Full Name" placeholder="Staff full name" />
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                            <SRInput type="number" value={staffData.StaffNumber} onChange={(e: any) => handleChange('StaffNumber', e)} label="Enter Staff Phone Number" placeholder="Staff phone number" />
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                            <SRInput value={staffData.StaffEmail} onChange={(e: any) => handleChange('StaffEmail', e)} label="Enter Staff Email Address" placeholder="Staff email address" />
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                            <SRSelect value={staffData.StaffGender} options={["Male", "Female"]} onChange={(e: any) => handleChange('StaffGender', e)} label="Select Staff Gender" />
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                            <SRInput value={staffData.StaffAddress} onChange={(e: any) => handleChange('StaffAddress', e)} label="Enter Staff Address" placeholder="Staff address" />
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <h3 className="m-0 fs-5 text-white">Job Details</h3>
                        <Col lg={4} md={6} sm={12}>
                            <SRSelect value={staffData.StaffDepartment} options={["Food and Beverage", "Housekeeper", "Front Desk Agent", "Security", "Guest Services", "Financial Controller", "Maintenance Technician"]} onChange={(e: any) => handleChange('StaffDepartment', e)} label="Select Staff Department" />
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                            <SRInput type="number" value={staffData.StaffSalary} onChange={(e: any) => handleChange('StaffSalary', e)} label="Enter Staff Salary" placeholder="Staff salary" />
                        </Col>
                    </Row>
                    <div className="mt-4">
                        <SRButton btnValue="Submit" className="px-4" type="submit" />
                        <SRButton btnValue="Reset" onClick={() => handleReset(false)} className="px-4 ms-3" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddStaff
