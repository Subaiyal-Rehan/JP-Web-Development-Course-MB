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

function AllRooms() {
  const [allData, setAllData] = useState<any>({})
  const [loader, setLoader] = useState<boolean>(false)
  const [filteredData, setFilteredData] = useState<any>([])
  const [searchData, setSearchData] = useState<any>({
    numberSearch: "",
    statusSearch: "",
    typeSearch: "",
  })
  const fetchData = () => {
    getData("Rooms").then((res) => {
      setAllData(res)
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleClick = (row: any) => {
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
              render: (row: any) => {
                return (<SRButton btnValue="Status" className="py-1" onClick={() => handleClick(row)} />)
              },
              value: "Actions",
            },
          ]} />
        </div>
      </div>
    </>
  )
}

export default AllRooms