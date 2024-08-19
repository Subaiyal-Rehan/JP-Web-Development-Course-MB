import { useEffect, useState } from "react"
import { getData } from "../../Config/FirebaseMethods"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import SRInput from "../../Components/SRInput"
import SRTable from "../../Components/SRTable"
import SRSelect from "../../Components/SRSelect"
import SRButton from "../../Components/SRButton"
import SRModal from "../../Components/SRModal"
import { FiEdit } from "react-icons/fi";

function AllStaff() {
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

    useEffect(() => {
        getData("Staff").then((res) => {
            setAllData(res)
        }).catch((err) => {
            console.log(err)
        })
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

    const handleEdit = () => {
      
    }

    const handleChange = (node:string, value:any) => {
      setEditedObj({...editedObj, [node]: value.target.value})
    }
    

    return (
        <>
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
                                return (<SRButton btnValue={<FiEdit className="text-black" />} className="py-1" onClick={() => { handleClick(row) }} />)
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
                                    <h3 className="m-0 fs-5 mt-4">Personal Details</h3>
                                    <Col lg={4} md={6} sm={12}>
                                        <SRInput disabled={true} value={selectedRow && selectedRow.StaffId} label="Staff ID (Auto Generated)" />
                                    </Col>
                                    <Col lg={4} md={6} sm={12}>
                                        <SRInput value={selectedRow.StaffName} onChange={(e: any) => handleChange('StaffName', e)} label="Enter Staff Full Name" placeholder="Staff full name" />
                                    </Col>
                                    <Col lg={4} md={6} sm={12}>
                                        <SRInput type="number" value={selectedRow.StaffNumber} onChange={(e: any) => handleChange('StaffNumber', e)} label="Enter Staff Phone Number" placeholder="Staff phone number" />
                                    </Col>
                                    <Col lg={4} md={6} sm={12}>
                                        <SRInput value={selectedRow.StaffEmail} onChange={(e: any) => handleChange('StaffEmail', e)} label="Enter Staff Email Address" placeholder="Staff email address" />
                                    </Col>
                                    <Col lg={4} md={6} sm={12}>
                                        <SRSelect value={selectedRow.StaffGender} options={["Male", "Female"]} onChange={(e: any) => handleChange('StaffGender', e)} label="Select Staff Gender" />
                                    </Col>
                                    <Col lg={4} md={6} sm={12}>
                                        <SRInput value={selectedRow.StaffAddress} onChange={(e: any) => handleChange('StaffAddress', e)} label="Enter Staff Address" placeholder="Staff address" />
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <h3 className="m-0 fs-5">Job Details</h3>
                                    <Col lg={4} md={6} sm={12}>
                                        <SRSelect value={selectedRow.StaffDepartment} options={["Food and Beverage", "Housekeeper", "Front Desk Agent", "Security", "Guest Services", "Financial Controller", "Maintenance Technician"]} onChange={(e: any) => handleChange('StaffDepartment', e)} label="Select Staff Department" />
                                    </Col>
                                    <Col lg={4} md={6} sm={12}>
                                        <SRInput type="number" value={selectedRow.StaffSalary} onChange={(e: any) => handleChange('StaffSalary', e)} label="Enter Staff Salary" placeholder="Staff salary" />
                                    </Col>
                                </Row>
                                <div className="mt-4">
                                    <SRButton btnValue="Save" className="px-4" type="submit" />
                                </div>
                            </form>
                        </>)}
                    footer={(<><SRButton btnValue="Close" className="px-4" /></>)} />
            </div>
        </>
    )
}

export default AllStaff
