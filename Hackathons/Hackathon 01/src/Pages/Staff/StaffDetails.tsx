import { useNavigate, useParams } from "react-router-dom"
import { deleteData, getData, setData } from "../../Config/FirebaseMethods"
import { useEffect, useState } from "react"
import SRLoader from "../../Components/SRLoader"
import FemaleStaff from '../../Images/Female_Staff.jpg'
import MaleStaff from '../../Images/Male_Staff.jpg'
import { Tooltip } from "@mui/material"
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import SRButton from "../../Components/SRButton"
import { cancelAlert, confirmAlert } from "../../Components/ConfirmAlert"
import { toastGreen, toastRed } from "../../Components/My Toasts"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import SRInput from "../../Components/SRInput"
import SRModal from "../../Components/SRModal"
import SRSelect from "../../Components/SRSelect"
import errorImg from '../../Images/404_Page.gif'

function StaffDetails() {
    const [loader, setLoader] = useState<any>(false)
    const [allData, setAllData] = useState<any>({})
    const [isOpen, setIsOpen] = useState<any>(false)
    const [editedObj, setEditedObj] = useState<any>({})
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setLoader(true)
        getData("Staff", params.id).then((res) => {
            setLoader(false)
            setAllData(res)
        }).catch((err) => {
            setLoader(false)
            console.log(err)
        })

    }, [])

    const handleClick = (check: string) => {
        if (check == "edit") {
            setIsOpen(true);
        } else {
            confirmAlert({
                mainTitle: `Delete Staff ${allData.StaffName}?`,
                mainText: `Once done, this cannot be changed.`,
                confirmBtnText: "Yes, delete it!"
            }).then(() => {
                setLoader(true)
                deleteData("Staff", allData.id).then(() => {
                    setLoader(false)
                    toastGreen("Staff has been deleted successfully.")
                    navigate('/dashboard/staff/allstaff')
                }).catch(() => {
                    setLoader(false)
                    cancelAlert({})
                })
            }).catch(() => {
                cancelAlert({})
            })
        }
    }

    const handleCloseModal = () => {
        setIsOpen(false);
    }

    const handleEdit = (e: any) => {
        e.preventDefault();
        if (Object.keys(editedObj).length == 0) {
            toastRed("No changes were made.")
            handleCloseModal()
            return;
        }
        setLoader(true)
        const finalObj = { ...allData, ...editedObj }
        setData("Staff", finalObj).then(() => {
            handleCloseModal()
            setEditedObj({})
            setAllData({ ...finalObj })
            setLoader(false)
            toastGreen(`Staff ${allData.StaffId} has been successfully edited`);
        }).catch(() => {
            setLoader(false)
            toastRed(`Failed to edit staff ${allData.StaffId}. Please try again later.`)
        })
    }

    const handleChange = (node: string, value: any) => {
        setEditedObj({ ...editedObj, [node]: value.target.value })
    }

    const handleEmptyInput = (field: string) => {
        return editedObj[field] !== undefined ? editedObj[field] : allData[field]
    }

    const propertiesArr = [
        {
            id: "StaffId",
            label: "Staff ID"
        },
        {
            id: "StaffName",
            label: "Staff Full Name"
        },
        {
            id: "StaffGender",
            label: "Staff Gender"
        },
        {
            id: "StaffSalary",
            label: "Staff Salary"
        },
        {
            id: "StaffEmail",
            label: "Staff Email Address"
        },
        {
            id: "StaffNumber",
            label: "Staff Number"
        },
        {
            id: "StaffDepartment",
            label: "Staff Department"
        },
        {
            id: "StaffAddress",
            label: "Staff Address"
        },
        {
            id: "StaffJoiningDate",
            label: "Staff Joining Date"
        },
    ]

    return (
        <>
            {loader && <SRLoader />}
            <div className="custom-black">
                <h2 className="fs-heading">Staff Details</h2>
                {allData.id && !loader ? (
                    <>
                        <div className="StaffContainer d-flex gap-4 mt-4">
                            <div>
                                <div className="imgDiv">
                                    <img src={allData.StaffGender == "Male" ? MaleStaff : FemaleStaff} alt="Staff Img" />
                                </div>
                                <div className="d-flex align-items-center gap-3 mt-4">
                                    <h3>Actions:</h3>
                                    <Tooltip title="Edit" placement="top">
                                        <span>
                                            <SRButton btnValue={<FiEdit />} className="p-3 fs-4" onClick={() => { handleClick("edit") }} />
                                        </span>
                                    </Tooltip>
                                    <Tooltip title="Delete" placement="top">
                                        <span>
                                            <SRButton btnValue={<MdDeleteOutline />} className="p-3 ms-2 fs-4" onClick={() => { handleClick("delete") }} />
                                        </span>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="d-fle justify-cotent-between">
                                <div className="d-flex flex-column gap-4">
                                    {propertiesArr.map((item: any, index: any) => (
                                        <div key={index} className="StaffDetailsDiv border-bottom d-flex align-items-center gap-3">
                                            <h3 className="fs-4">{item.label}:</h3>
                                            <h4 className="fs-4">{allData[item.id]}</h4>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                ): (
                    <div className="d-flex justify-content-center">
                        <img src={errorImg} alt="Staff Not Found Image" />
                    </div>
                )}
                <SRModal title="Edit Staff" onClose={handleCloseModal} isOpen={isOpen}
                    body={(
                        <>
                            <form onSubmit={handleEdit}>
                                <Row>
                                    <h3 className="m-0 fs-5 text-white">Personal Details</h3>
                                    <Col lg={6} md={12}>
                                        <SRInput disabled={true} value={allData.StaffId} label="Staff ID (Auto Generated)" />
                                    </Col>
                                    <Col lg={6} md={12}>
                                        <SRInput value={handleEmptyInput("StaffName")} onChange={(e: any) => handleChange('StaffName', e)} label="Enter Staff Full Name" placeholder="Staff full name" />
                                    </Col>
                                    <Col lg={6} md={12}>
                                        <SRInput type="number" value={handleEmptyInput("StaffNumber")} onChange={(e: any) => handleChange('StaffNumber', e)} label="Enter Staff Phone Number" placeholder="Staff phone number" />
                                    </Col>
                                    <Col lg={6} md={12}>
                                        <SRInput value={handleEmptyInput("StaffEmail")} onChange={(e: any) => handleChange('StaffEmail', e)} label="Enter Staff Email Address" placeholder="Staff email address" />
                                    </Col>
                                    <Col lg={6} md={12}>
                                        <SRSelect value={editedObj.StaffGender || allData.StaffGender} options={["Male", "Female"]} onChange={(e: any) => handleChange('StaffGender', e)} label="Select Staff Gender" />
                                    </Col>
                                    <Col lg={6} md={12}>
                                        <SRInput value={handleEmptyInput("StaffAddress")} onChange={(e: any) => handleChange('StaffAddress', e)} label="Enter Staff Address" placeholder="Staff address" />
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <h3 className="m-0 fs-5 text-white">Job Details</h3>
                                    <Col lg={6} md={12}>
                                        <SRSelect value={editedObj.StaffDepartment || allData.StaffDepartment} options={["Food and Beverage", "Housekeeper", "Front Desk Agent", "Security", "Guest Services", "Financial Controller", "Maintenance Technician"]} onChange={(e: any) => handleChange('StaffDepartment', e)} label="Select Staff Department" />
                                    </Col>
                                    <Col lg={6} md={12}>
                                        <SRInput type="number" value={handleEmptyInput("StaffSalary")} onChange={(e: any) => handleChange('StaffSalary', e)} label="Enter Staff Salary" placeholder="Staff salary" />
                                    </Col>
                                </Row>
                                <div className="mt-4">
                                    <SRButton btnValue="Save" className="px-4" type="submit" />
                                </div>
                            </form>
                        </>)}
                    footer={(<SRButton btnValue="Close" onClick={handleCloseModal} className="px-4" />)} />
            </div>
        </>
    )
}

export default StaffDetails
