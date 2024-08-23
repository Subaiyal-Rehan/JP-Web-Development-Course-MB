import { useSelector } from "react-redux"
import SRHeader from "../../Layouts/SRHeader"
import { Link } from "react-router-dom"
import { FaRegUserCircle } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import SRTable from "../../Components/SRTable";
import { useEffect, useState } from "react";
import { getData } from "../../Config/FirebaseMethods";

function MyBookings() {
    const userData = useSelector((state: any) => state.user)
    const [allData, setAllData] = useState<any>([])
    const [allRoomsData, setAllRoomsData] = useState<any>([])
    const [selectedRooms, setSelectedRooms] = useState<any>([])

    const fetchUserData = () => {
        getData("Users", userData.Uid).then((res: any) => {
            const bookings = res.Bookings ? Object.values(res.Bookings) : [];
            setAllData(bookings);
        }).catch(() => { })
    }

    const fetchRoomsData = () => {
        getData("Rooms").then((res) => {
            setAllRoomsData(res)
        })
    }

    useEffect(() => {
        if (allRoomsData.length !== 0 && allData.length !== 0) {
            let arr: any = []
            allData.map((item: any) => {
                allRoomsData.map((room: any) => {
                    if (room.id == item.RoomId) {
                        arr.push(room)
                        console.log(arr)
                    }
                })
            })
            setSelectedRooms(arr)
        }
    }, [allRoomsData, allData])


    useEffect(() => {
        fetchUserData()
        fetchRoomsData()
    }, [])

    return (
        <>
            <SRHeader />
            <h1 className="heading-h1 text-center text-white pb-2 fs-1">My Bookings</h1>
            <Row className="container mx-auto text-white mt-4 row-gap-4">
                <Col lg={3} md={12} className="AccountMenu p-2 px-4 border d-flex flex-column fs-5">
                    <Link to="/account" className="text-white text-decoration-none d-flex align-items-center gap-3 my-2"><FaRegUserCircle /> Profile</Link>
                    <Link to="/mybookings" className="text-white text-decoration-none d-flex align-items-center gap-3 my-2"><BsCart2 /> My Bookings</Link>
                </Col>
                <Col lg={9} md={12} className="AccountDetails">
                    <SRTable data={selectedRooms} cols={[
                        {
                            value: "ID",
                            id: "RoomId"
                        },
                        {
                            render: (row: any) => (<img width={60} src={row.RoomImg} alt="Room Img" />),
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
                    ]} />
                </Col>
            </Row>
        </>
    )
}

export default MyBookings
