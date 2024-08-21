import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteData, getData, setData } from "../../Config/FirebaseMethods"
import SRLoader from "../../Components/SRLoader"
import SRButton from "../../Components/SRButton"
import { MdPublishedWithChanges, MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { cancelAlert, confirmAlert, successAlert } from "../../Components/ConfirmAlert"
import Row from "react-bootstrap/esm/Row"
import SRModal from "../../Components/SRModal"
import { toastGreen, toastRed } from "../../Components/My Toasts"
import Col from "react-bootstrap/esm/Col"
import SRInput from "../../Components/SRInput"
import SRSelect from "../../Components/SRSelect"
import SRTextarea from "../../Components/SRTextarea"
import { Tooltip } from "@mui/material"
import NotFoundImg from '../../Images/Image_Not_Found.png'

function RoomDetails() {
    const [allData, setAllData] = useState<any>({})
    const [loader, setLoader] = useState<any>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [editedObj, setEditedObj] = useState<any>({})
    const navigate = useNavigate()
    const params = useParams()
    useEffect(() => {
        setLoader(true)
        getData('Rooms', params.id).then((res) => {
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
        }

        if (check == "status") {
            const newStatus = allData.RoomStatus === "Available" ? "Occupied" : "Available";
            confirmAlert({
                mainTitle: `Change room status from ${allData.RoomStatus} to ${newStatus}?`,
                mainText: `This will update room ${allData.RoomNumber} to ${newStatus}.`,
                confirmBtnText: "Yes, change it!"
            }).then(() => {
                setLoader(true)
                setData("Rooms", { ...allData, RoomStatus: newStatus }).then(() => {
                    setAllData({ ...allData, RoomStatus: newStatus })
                    setLoader(false)
                    successAlert({})
                }).catch(() => {
                    setLoader(false)
                    cancelAlert({})
                })
            }).catch(() => {
                cancelAlert({})
            })
        }

        if (check == "delete") {
            confirmAlert({
                mainTitle: `Delete Room Number ${allData.RoomNumber}?`,
                mainText: `Once done, this cannot be changed.`,
                confirmBtnText: "Yes, delete it!"
            }).then(() => {
                setLoader(true)
                deleteData("Rooms", allData.id).then(() => {
                    setLoader(false)
                    toastGreen("Room has been deleted successfully.")
                    navigate('/dashboard/rooms/allrooms')
                }).catch(() => {
                    setLoader(false)
                    cancelAlert({})
                })
            }).catch(() => {
                cancelAlert({})
            })
        }
    }

    const getValue = (field: string) => {
        return editedObj[field] !== undefined ? editedObj[field] : allData[field]
    }

    const handleChange = (node: string, value: any) => {
        setEditedObj({ ...editedObj, [node]: value.target.value })
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
        setData("Rooms", finalObj).then(() => {
            handleCloseModal()
            setEditedObj({})
            setAllData({ ...finalObj })
            setLoader(false)
            toastGreen(`Room ${allData.RoomId} has been successfully edited`);
        }).catch(() => {
            setLoader(false)
            toastRed(`Failed to edit Room ${allData.RoomId}. Please try again later.`)
        })
    }

    const propertiesArr = [
        {
            id: "RoomNumber",
            label: "Room Number"
        },
        {
            id: "RoomPrice",
            label: "Room Price"
        },
        {
            id: "RoomType",
            label: "Room Type"
        },
        {
            id: "RoomStatus",
            label: "Room Status"
        },
    ]

    return (
        <>
            {loader && <SRLoader />}
            <div className='custom-black'>
                {allData && (
                    <>
                        <h2 className="fs-4 text-center mb-3">Details of Room ID {allData.RoomId}</h2>
                        <div>
                            <div className="imgContainer position-relative" style={{  backgroundImage: `url(${allData.RoomImg}), url(${NotFoundImg})` }}>
                                <Row className="textContainerPosition position-absolute px-3 py-4 rounded row-gap-22">
                                    {propertiesArr.map((item: any, index: any) => (
                                        <Col key={index} lg={3} md={6} sm={12} className={`p-2 d-flex justify-content-center align-items-center ${index !== 3 && 'border-end'} flex-column mx-auto`}>
                                            <h3 className="fs-4">{item.label}:</h3>
                                            <h4 className="fs-4">{allData[item.id]}</h4>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                            <div className="descDiv d-flex">
                                <h3 className="fs-4 me-2">Room Description:</h3>
                                <h4 className="fs-4">{allData.RoomDescription}</h4>
                            </div>

                            <div className="d-flex align-items-center gap-4 mt-3">
                                <h3 className="fs-4">Actions:</h3>
                                <div className="d-flex gap-4">
                                    <Tooltip title="Change Status" placement="top">
                                        <span>
                                            <SRButton btnValue={<MdPublishedWithChanges />} className="p-3 fs-3" onClick={() => handleClick("status")} />
                                        </span>
                                    </Tooltip>
                                    <Tooltip title="Edit" placement="top">
                                        <span>
                                            <SRButton btnValue={<FiEdit />} className="p-3 fs-3" onClick={() => handleClick("edit")} />
                                        </span>
                                    </Tooltip>
                                    <Tooltip title="Delete" placement="top">
                                        <span>
                                            <SRButton btnValue={<MdDeleteOutline />} className="p-3 fs-3" onClick={() => handleClick("delete")} />
                                        </span>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <SRModal title="Edit Room" onClose={handleCloseModal} isOpen={isOpen}
                    body={(
                        <form onSubmit={handleEdit}>
                            <Row>
                                <Col lg={6} md={12}>
                                    <SRInput labelClass="mt-0" id="ID" placeholder="Loading..." disabled={true} value={allData.RoomId} label="Room ID (Auto Generated)" />
                                </Col>
                                <Col lg={6} md={12}>
                                    <SRInput labelClass="mt-0" placeholder="Room Number" label="Enter Room Number" value={getValue("RoomNumber")} onChange={(e: any) => handleChange("RoomNumber", e)} />
                                </Col>
                                <Col lg={6} md={12}>
                                    <SRSelect labelClass="mt-0" label="Enter Room Type" options={["Single Room", "Double Room", "Suite", "Family Room"]} value={editedObj.RoomType || allData.RoomType} onChange={(e: any) => handleChange("RoomType", e)} />
                                </Col>
                                <Col lg={6} md={12}>
                                    <SRSelect label="Enter Room Status" options={["Available", "Occupied"]} value={editedObj.RoomStatus || allData.RoomStatus} onChange={(e: any) => handleChange("RoomStatus", e)} />
                                </Col>
                                <Col lg={6} md={12}>
                                    <SRInput type="number" placeholder="Room Price (per day)" label="Enter Room Price (per day)" value={getValue("RoomPrice")} onChange={(e: any) => handleChange("RoomPrice", e)} />
                                </Col>
                                <Col lg={6} md={12}>
                                    <SRInput placeholder="Room Image" label="Enter Room Image Link" value={getValue("RoomImg")} onChange={(e: any) => handleChange("RoomImg", e)} />
                                </Col>
                                <Col lg={6} md={12}>
                                    <SRTextarea label="Enter Room Description" placeholder="Room Description" value={getValue("RoomDescription")} onChange={(e: any) => handleChange("RoomDescription", e)} />
                                </Col>
                            </Row>
                            <div className="mt-4 mb-1">
                                <SRButton btnValue="Edit" className="px-4" type="submit" />
                            </div>
                        </form>
                    )}
                    footer={(<SRButton btnValue="Close" onClick={handleCloseModal} className="px-4" />)} />
            </div>
        </>
    )
}

export default RoomDetails
