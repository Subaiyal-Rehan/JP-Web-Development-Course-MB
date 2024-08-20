import { useEffect, useState } from "react"
import { getData, setData } from "../../Config/FirebaseMethods"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import SRInput from "../../Components/SRInput"
import SRTable from "../../Components/SRTable"
import SRSelect from "../../Components/SRSelect"
import SRButton from "../../Components/SRButton"
import SRModal from "../../Components/SRModal"
import { FiEdit } from "react-icons/fi";
import { toastGreen, toastRed } from "../../Components/My Toasts"
import SRLoader from "../../Components/SRLoader"
import { Tooltip } from "@mui/material"

function AllStaff() {
    const [loader, setLoader] = useState<any>(false)
    const [allData, setAllData] = useState<any>([])
    const [filteredData, setFilteredData] = useState<any>([])
    const [selectedRow, setSelectedRow] = useState<any>({})
    const [searchData, setSearchData] = useState<any>({
        idSearch: "",
        staffNameSearch: "",
        departSearch: "",
    })
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [editedObj, setEditedObj] = useState<any>({})

    const fetchData = () => {
        getData("Staff").then((res) => {
            setAllData(res)
        }).catch((err) => {
            console.log(err)
        })
    }


    useEffect(() => {
        fetchData()
    }, [])

    const handleClick = (row: any) => {
        setSelectedRow(row)
        setIsOpen(true);
    }

    useEffect(() => {
        let filteredData = allData;

        if (searchData.idSearch !== "") {
            filteredData = filteredData.filter((item: any) => item.StaffId == searchData.idSearch)
        }

        if (searchData.staffNameSearch !== "") {
            filteredData = filteredData.filter((item: any) => item.StaffName.toLowerCase().includes(searchData.staffNameSearch.toLowerCase()));
        }

        if (searchData.departSearch !== "" && searchData.departSearch !== "All") {
            filteredData = filteredData.filter((item: any) => item.StaffDepartment == searchData.departSearch);
        }

        setFilteredData(filteredData)
    }, [searchData, allData])

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
        const finalObj = { ...selectedRow, ...editedObj }
        setData("Staff", finalObj).then(() => {
            handleCloseModal()
            setEditedObj({})
            setSelectedRow({})
            fetchData()
            setLoader(false)
            toastGreen(`Staff ${selectedRow.StaffId} has been successfully edited`);
        }).catch(() => {
            setLoader(false)
            toastRed(`Failed to edit staff ${selectedRow.StaffId}. Please try again later.`)
        })
    }

    const handleChange = (node: string, value: any) => {
        setEditedObj({ ...editedObj, [node]: value.target.value })
    }

    const handleEmptyInput = (field: string) => {
        return editedObj[field] !== undefined ? editedObj[field] : selectedRow[field]
    }


    return (
        <>
            {loader && <SRLoader />}
            <div className='custom-black'>
                <h2 className="fs-heading">All Staff</h2>
                <Row>
                    <Col lg={4} md={12}>
                        <SRInput value={searchData.idSearch} label="Enter staff id to search" placeholder="Enter staff id to search" onChange={(e: any) => setSearchData({ ...searchData, idSearch: e.target.value })} />
                    </Col>
                    <Col lg={4} md={12}>
                        <SRInput value={searchData.staffNameSearch} label="Enter staff name to search" placeholder="Enter staff name to search" onChange={(e: any) => setSearchData({ ...searchData, staffNameSearch: e.target.value })} />
                    </Col>
                    <Col lg={4} md={12}>
                        <SRSelect value={searchData.departSearch} label="Select staff department to search" options={["All", "Food and Beverage", "Housekeeper", "Front Desk Agent", "Security", "Guest Services", "Financial Controller", "Maintenance Technician"]} onChange={(e: any) => setSearchData({ ...searchData, departSearch: e.target.value })} />
                    </Col>
                </Row>
                <div className="mt-4">
                    <SRTable data={filteredData} cols={[
                        {
                            value: "ID",
                            id: "StaffId"
                        },
                        {
                            value: "Staff Name",
                            id: "StaffName"
                        },
                        {
                            value: "Staff Department",
                            id: "StaffDepartment"
                        },
                        {
                            value: "Staff Gender",
                            id: "StaffGender"
                        },
                        {
                            value: "Staff Salary",
                            id: "StaffSalary"
                        },
                        {
                            render: (row: any) => {
                                return (
                                    <Tooltip title="Edit" placement="top">
                                        <span>
                                            <SRButton btnValue={<FiEdit />} className="py-1 fs-4" onClick={() => { handleClick(row) }} />
                                        </span>
                                    </Tooltip>
                                )
                            },
                            value: "Actions",
                        },
                    ]} />
                </div>
                <SRModal title="Edit Staff" onClose={handleCloseModal} isOpen={isOpen}
                    body={(
                        <>
                            <form onSubmit={handleEdit}>
                                <Row>
                                    <h3 className="m-0 fs-5 text-white">Personal Details</h3>
                                    <Col lg={6} md={12}>
                                        <SRInput disabled={true} value={selectedRow && selectedRow.StaffId} label="Staff ID (Auto Generated)" />
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
                                        <SRSelect value={editedObj.StaffGender || selectedRow.StaffGender} options={["Male", "Female"]} onChange={(e: any) => handleChange('StaffGender', e)} label="Select Staff Gender" />
                                    </Col>
                                    <Col lg={6} md={12}>
                                        <SRInput value={handleEmptyInput("StaffAddress")} onChange={(e: any) => handleChange('StaffAddress', e)} label="Enter Staff Address" placeholder="Staff address" />
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <h3 className="m-0 fs-5 text-white">Job Details</h3>
                                    <Col lg={6} md={12}>
                                        <SRSelect value={editedObj.StaffDepartment || selectedRow.StaffDepartment} options={["Food and Beverage", "Housekeeper", "Front Desk Agent", "Security", "Guest Services", "Financial Controller", "Maintenance Technician"]} onChange={(e: any) => handleChange('StaffDepartment', e)} label="Select Staff Department" />
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

export default AllStaff
