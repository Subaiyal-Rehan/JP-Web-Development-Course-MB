import Col from "react-bootstrap/esm/Col"
import SRDashboardBox from "../Components/SRDashboardBox"
import { MdMeetingRoom, MdCancel, MdPending } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import Row from "react-bootstrap/esm/Row";
import { useEffect, useState } from "react";
import { getData } from "../Config/FirebaseMethods";

function Admin() {
  const [allRoomsData, setAllRoomsData] = useState<any>([])
  const [availableRooms, setAvailableRooms] = useState<any>([])
  const [occupiedRooms, setOccupiedRooms] = useState<any>([])

  const fetchRoomsData = () => {
    getData("Rooms").then((res:any)=>{
      setAllRoomsData(res)
      setAvailableRooms(res.filter((item:any)=>item.RoomStatus == "Available"))
      setOccupiedRooms(res.filter((item:any)=>item.RoomStatus == "Occupied"))
    }).catch((err)=>console.log(err, "Error while fetching room data"))
  }
  
  useEffect(() => {
    fetchRoomsData()
  }, [])
  

  const Boxes: any = [
    {
      title: "Pending Reservations",
      count: [1, 2, 3].length,
      bgColor: "#d58714",
      color: "white",
      icon: <MdPending />,
      link: "/dashboard/rooms/allrooms"
    },
    {
      title: "Approved Reservations",
      count: [1, 2, 3].length,
      bgColor: "var(--lightBlue)",
      color: "white",
      icon: <FaCheckCircle />,
      link: "/dashboard/rooms/allrooms"
    },
    {
      title: "Canceled Reservations",
      count: [1, 2, 3].length,
      bgColor: "var(--darkBlue)",
      color: "white",
      icon: <MdCancel />,
      link: "/dashboard/rooms/allrooms"
    },
    {
      title: "Total Rooms",
      count: allRoomsData ? allRoomsData.length : "***",
      bgColor: "#d58714",
      color: "white",
      icon: <MdMeetingRoom />,
      link: "/dashboard/rooms/allrooms"
    },
    {
      title: "Available Rooms",
      count: availableRooms ? availableRooms.length : "***",
      bgColor: "#01a55b",
      color: "white",
      icon: <MdMeetingRoom />,
      link: "/dashboard/rooms/allrooms"
    },
    {
      title: "Occupied Rooms",
      count: occupiedRooms ? occupiedRooms.length : "***",
      bgColor: "var(--darkBlue)",
      color: "white",
      icon: <MdMeetingRoom />,
      link: "/dashboard/rooms/allrooms"
    },
    {
      title: "Total Staff",
      count: [1, 2, 3].length,
      bgColor: "#01a55b",
      color: "white",
      icon: <MdMeetingRoom />,
      link: "/dashboard/rooms/allrooms"
    },
    {
      title: "Total Enquiries",
      count: [1, 2, 3].length,
      bgColor: "var(--lightBlue)",
      color: "white",
      icon: <MdMeetingRoom />,
      link: "/dashboard/rooms/allrooms"
    },
  ]
  return (
    <>
      <div className="custom-black">
        <h2 className="fs-heading">Admin Dashbaord</h2>
        <Row className="row-gap-4 mt-4">
          {Boxes.map((item: any, index: any) => {
            return (
              <Col md={12} lg={6} xl={3} key={index} className="d-flex flex-column justify-content-center">
                <SRDashboardBox titleName={item.title} link={item.link} count={item.count} icon={item.icon} bgColor={item.bgColor} color={item.color} className="flex-fill" />
              </Col>
            )
          })}
        </Row>
      </div>
    </>
  )
}

export default Admin
