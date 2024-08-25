import Col from "react-bootstrap/esm/Col"
import SRDashboardBox from "../Components/SRDashboardBox"
import { MdMeetingRoom, MdCancel, MdPending } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import Row from "react-bootstrap/esm/Row";
import { useEffect, useState } from "react";
import { getData } from "../Config/FirebaseMethods";

function Admin() {
  const [allRoomsData, setAllRoomsData] = useState<any>([])
  const [allReservationsData, setAllReservationsData] = useState<any>([])
  const [allBookingssData, setAllBookingssData] = useState<any>([])
  const [allCancelledData, setAllCancelledData] = useState<any>([])
  const [allStaffData, setAllStaffData] = useState<any>([])
  const [availableRooms, setAvailableRooms] = useState<any>([])
  const [acceptedReservations, setAcceptedReservations] = useState<any>([])
  const [occupiedRooms, setOccupiedRooms] = useState<any>([])

  const fetchRoomsData = () => {
    getData("Rooms").then((res:any)=>{
      setAllRoomsData(res)
      setAvailableRooms(res.filter((item:any)=>item.RoomStatus == "Available"))
      setOccupiedRooms(res.filter((item:any)=>item.RoomStatus == "Occupied"))
    })
  }
  
  const fetchReservationsData = () => {
    getData("Reservations").then((res)=>{
      setAllReservationsData(res)
    })
  }
  
  const fetchBookingssData = () => {
    getData("Bookings").then((res:any)=>{
      setAllBookingssData(res)
      setAcceptedReservations(res.filter((item: any) => item.Accepted));
    })
  }
  
  const fetchCancelledReserData = () => {
    getData("Cancelled").then((res:any)=>{
      setAllCancelledData(res)
    })
  }
  
  const fetchStaffData = () => {
    getData("Staff").then((res:any)=>{
      setAllStaffData(res)
    })
  }

  useEffect(() => {
    fetchRoomsData()
    fetchReservationsData()
    fetchBookingssData()
    fetchCancelledReserData()
    fetchStaffData()
  }, [])
  

  const Boxes: any = [
    {
      title: "Pending Reservations",
      count: allReservationsData.length,
      bgColor: "#d58714",
      color: "white",
      icon: <MdPending />,
      link: "/dashboard/reservations/pendingreservations"
    },
    {
      title: "Approved Reservations",
      count: acceptedReservations.length,
      bgColor: "var(--lightBlue)",
      color: "white",
      icon: <FaCheckCircle />,
      link: "/dashboard/reservations/approvedreservations"
    },
    {
      title: "Canceled Reservations",
      count: allCancelledData.length,
      bgColor: "var(--darkBlue)",
      color: "white",
      icon: <MdCancel />,
      link: "/dashboard/reservations/cancelledreservations"
    },
    {
      title: "Total Rooms",
      count: allRoomsData.length,
      bgColor: "#d58714",
      color: "white",
      icon: <MdMeetingRoom />,
      link: "/dashboard/rooms/allrooms"
    },
    {
      title: "Available Rooms",
      count: availableRooms.length,
      bgColor: "#01a55b",
      color: "white",
      icon: <MdMeetingRoom />,
      link: "/dashboard/rooms/allrooms"
    },
    {
      title: "Occupied Rooms",
      count: occupiedRooms.length,
      bgColor: "var(--darkBlue)",
      color: "white",
      icon: <MdMeetingRoom />,
      link: "/dashboard/rooms/allrooms"
    },
    {
      title: "Total Staff",
      count: allStaffData.length,
      bgColor: "#01a55b",
      color: "white",
      icon: <MdMeetingRoom />,
      link: "/dashboard/staff/allstaff"
    },
    {
      title: "Total Bookings",
      count: allBookingssData.length,
      bgColor: "var(--lightBlue)",
      color: "white",
      icon: <MdMeetingRoom />,
      link: "/dashboard/bookings/allbooking"
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
