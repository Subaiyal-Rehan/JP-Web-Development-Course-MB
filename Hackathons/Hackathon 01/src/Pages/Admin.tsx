import Col from "react-bootstrap/esm/Col"
import SRDashboardBox from "../Components/SRDashboardBox"
import { MdMeetingRoom } from "react-icons/md";
import Row from "react-bootstrap/esm/Row";

function Admin() {

  const Boxes: any = [
    {
      title: "Pending Reservations",
      count: [1, 2, 3].length,
      bgColor: "#f39c1a",
      color: "white",
      icon: <MdMeetingRoom />
    },
    {
      title: "Approved Reservations",
      count: [1, 2, 3].length,
      bgColor: "#01beea",
      color: "white",
      icon: <MdMeetingRoom />
    },
    {
      title: "Canceled Reservations",
      count: [1, 2, 3].length,
      bgColor: "#0272af",
      color: "white",
      icon: <MdMeetingRoom />
    },
    {
      title: "Total Rooms",
      count: [1, 2, 3].length,
      bgColor: "#f39c1a",
      color: "white",
      icon: <MdMeetingRoom />
    },
    {
      title: "Available Rooms",
      count: [1, 2, 3].length,
      bgColor: "#01a55b",
      color: "white",
      icon: <MdMeetingRoom />
    },
    {
      title: "Occupied Rooms",
      count: [1, 2, 3].length,
      bgColor: "#0272af",
      color: "white",
      icon: <MdMeetingRoom />
    },
    {
      title: "Total Staff",
      count: [1, 2, 3].length,
      bgColor: "#01a55b",
      color: "white",
      icon: <MdMeetingRoom />
    },
    {
      title: "Total Enquiries",
      count: [1, 2, 3].length,
      bgColor: "#01beea",
      color: "white",
      icon: <MdMeetingRoom />
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
                <SRDashboardBox titleName={item.title} count={item.count} icon={item.icon} bgColor={item.bgColor} color={item.color} className="flex-fill" />
              </Col>
            )
          })}
        </Row>
      </div>
    </>
  )
}

export default Admin
