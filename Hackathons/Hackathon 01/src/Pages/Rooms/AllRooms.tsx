import { useEffect, useState } from "react"
import SRTable from "../../Components/SRTable"
import { getData, setData } from "../../Config/FirebaseMethods"
import SRButton from "../../Components/SRButton"
import { cancelAlert, confirmAlert, successAlert } from "../../Components/ConfirmAlert"
import SRLoader from "../../Components/SRLoader"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import SRInput from "../../Components/SRInput"
import SRSelect from "../../Components/SRSelect"
import { MdPublishedWithChanges } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Tooltip } from "@mui/material"
import { FiEdit } from "react-icons/fi";
import SRModal from "../../Components/SRModal"
import SRTextarea from "../../Components/SRTextarea"
import { toastGreen, toastRed } from "../../Components/My Toasts"
import { useNavigate } from "react-router-dom"

function AllRooms() {
  const [allData, setAllData] = useState<any>({})
  const [loader, setLoader] = useState<boolean>(false)
  const [filteredData, setFilteredData] = useState<any>([])
  const [searchData, setSearchData] = useState<any>({
    numberSearch: "",
    statusSearch: "",
    typeSearch: "",
  })
  const [selectedRow, setSelectedRow] = useState<any>({})
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [editedObj, setEditedObj] = useState<any>({})
  const navigate = useNavigate()

  const fetchData = () => {
    getData("Rooms").then((res) => {
      setAllData(res)
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleCloseModal = () => {
    setIsOpen(false);
  }

  const handleClick = (row: any, check?: string) => {
    setSelectedRow(row)
    if (check == "edit") {
      setIsOpen(true);
    }

    if (check == "status") {
      const newStatus = row.RoomStatus === "Available" ? "Occupied" : "Available";
      confirmAlert({
        mainTitle: `Change room status from ${row.RoomStatus} to ${newStatus}?`,
        mainText: `This will update room ${row.RoomNumber} to ${newStatus}.`,
        confirmBtnText: "Yes, change it!"
      }).then(() => {
        setLoader(true)
        setData("Rooms", { ...row, RoomStatus: newStatus }).then(() => {
          setLoader(false)
          fetchData()
          successAlert({})
        }).catch(() => {
          setLoader(false)
          cancelAlert({})
        })
      }).catch(() => {
        cancelAlert({})
      })
    }

  };


  useEffect(() => {
    fetchData()
  }, [])

  // Search Mechanism
  useEffect(() => {
    let filteredData = allData;

    if (searchData.numberSearch !== "") {
      filteredData = filteredData.filter((item: any) => item.RoomNumber == searchData.numberSearch);
    }

    if (searchData.typeSearch !== "") {
      filteredData = filteredData.filter((item: any) => item.RoomType == searchData.typeSearch);
    }

    if (searchData.statusSearch !== "" && searchData.statusSearch !== "All") {
      filteredData = filteredData.filter((item: any) => item.RoomStatus == searchData.statusSearch);
    }

    setFilteredData(filteredData);
  }, [searchData, allData])

  const getValue = (field: string) => {
    return editedObj[field] !== undefined ? editedObj[field] : selectedRow[field]
  }

  const handleChange = (node: string, value: any) => {
    setEditedObj({ ...editedObj, [node]: value.target.value })
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
    setData("Rooms", finalObj).then(() => {
      handleCloseModal()
      setEditedObj({})
      setSelectedRow({})
      fetchData()
      setLoader(false)
      toastGreen(`Room ${selectedRow.RoomId} has been successfully edited`);
    }).catch(() => {
      setLoader(false)
      toastRed(`Failed to edit Room ${selectedRow.RoomId}. Please try again later.`)
    })
  }


  return (
    <>
      {loader && <SRLoader />}
      <div className="custom-black">
        <h2 className="fs-heading">All Rooms</h2>
        <Row>
          <Col lg={4} md={12}>
            <SRInput value={searchData.numberSearch} label="Enter room number to search" placeholder="Enter room number to search" onChange={(e: any) => setSearchData({ ...searchData, numberSearch: e.target.value })} />
          </Col>
          <Col lg={4} md={12}>
            <SRInput value={searchData.typeSearch} label="Enter room type to search" placeholder="Enter room type to search" onChange={(e: any) => setSearchData({ ...searchData, typeSearch: e.target.value })} />
          </Col>
          <Col lg={4} md={12}>
            <SRSelect value={searchData.statusSearch} label="Select room status to search" options={["All", "Available", "Occupied"]} onChange={(e: any) => setSearchData({ ...searchData, statusSearch: e.target.value })} />
          </Col>
        </Row>
        <div className="mt-4">
          <SRTable data={filteredData} cols={[
            {
              value: "ID",
              id: "RoomId"
            },
            {
              render: (row: any) => (<img width={60} src={row.RoomImg} />),
              value: "Snapshot",
            },
            {
              value: "Room Number",
              id: "RoomNumber"
            },
            {
              value: "Room Type",
              id: "RoomType"
            },
            {
              value: "Room Price",
              id: "RoomPrice"
            },
            {
              value: "Room Status",
              id: "RoomStatus"
            },
            {
              value: "Room Description",
              id: "RoomDescription"
            },
            {
              width: 230,
              render: (row: any) => {
                return (
                  <>
                    <Tooltip title="Change Status" placement="top">
                      <span>
                        <SRButton btnValue={<MdPublishedWithChanges />} className="py-1 fs-4" onClick={() => handleClick(row, "status")} />
                      </span>
                    </Tooltip>
                    <Tooltip title="Edit" placement="top">
                      <span>
                        <SRButton btnValue={<FiEdit />} className="ms-2 py-1 fs-4" onClick={() => handleClick(row, "edit")} />
                      </span>
                    </Tooltip>
                    <Tooltip title="View Details" placement="top">
                      <span>
                        <SRButton btnValue={<FaMagnifyingGlass />} className="ms-2 py-1 fs-4" onClick={() => navigate(`/dashboard/rooms/${row.id}`)} />
                      </span>
                    </Tooltip>
                  </>
                )
              },
              value: "Actions",
            },
          ]} />
        </div>
        <SRModal title="Edit Room" onClose={handleCloseModal} isOpen={isOpen}
          body={(
            <form onSubmit={handleEdit}>
              <Row>
                <Col lg={6} md={12}>
                  <SRInput labelClass="mt-0" id="ID" placeholder="Loading..." disabled={true} value={selectedRow.RoomId} label="Room ID (Auto Generated)" />
                </Col>
                <Col lg={6} md={12}>
                  <SRInput labelClass="mt-0" placeholder="Room Number" label="Enter Room Number" value={getValue("RoomNumber")} onChange={(e: any) => handleChange("RoomNumber", e)} />
                </Col>
                <Col lg={6} md={12}>
                  <SRSelect labelClass="mt-0" label="Enter Room Type" options={["Single Room", "Double Room", "Suite", "Family Room"]} value={editedObj.RoomType || selectedRow.RoomType} onChange={(e: any) => handleChange("RoomType", e)} />
                </Col>
                <Col lg={6} md={12}>
                  <SRSelect label="Enter Room Status" options={["Available", "Occupied"]} value={editedObj.RoomStatus || selectedRow.RoomStatus} onChange={(e: any) => handleChange("RoomStatus", e)} />
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

export default AllRooms