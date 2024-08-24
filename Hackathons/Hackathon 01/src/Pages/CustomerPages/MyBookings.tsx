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
    const [allReservationsData, setAllReservationsData] = useState<any>([])
    const [allCancelledData, setAllCancelledData] = useState<any>([])
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

    const fetchReservationsData = () => {
        getData("Reservations").then((res) => {
            setAllReservationsData(res)
        })
    }

    const fetchCancelledData = () => {
        getData("Cancelled").then((res) => {
            setAllCancelledData(res)
        })
    }
    
    useEffect(() => {
        if (allRoomsData.length !== 0 && allData.length !== 0) {
            let arr: any = [];
    
            allData.forEach((item: any) => {
                const matchingRoom = allRoomsData.find((room: any) => room.id === item.RoomId);
    
                if (matchingRoom) {
                    let status = 'Approved';
    
                    if (allReservationsData.some((reservation: any) => reservation.BookingId === item.BookingId)) {
                        status = 'Pending';
                    }

                    if (allCancelledData.some((cancelled: any) => cancelled.BookingId === item.BookingId)) {
                        status = 'Rejected';
                    }
    
                    const roomWithStatus = {
                        ...matchingRoom,
                        Status: status,
                    };
    
                    arr.push(roomWithStatus);
                }
            });
    
            setSelectedRooms(arr);
        }
    }, [allRoomsData, allReservationsData, allCancelledData, allData]);


    useEffect(() => {
        fetchUserData()
        fetchRoomsData()
        fetchReservationsData()
        fetchCancelledData()
    }, [])

    const classFunc = (status: any) => {
        console.log(status)
        let baseClasses = "px-3 py-2 rounded-pill";

        switch (status) {
            case "Pending":
                return `${baseClasses} bg-warning text-black`;
            case "Rejected":
                return `${baseClasses} bg-danger`;
            case "Approved":
                return `${baseClasses} bg-success`;
            default:
                return baseClasses;
        }
    }


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
                        {
                            render: (row: any) => (
                                <div className="pt-2">
                                    <span className={`${classFunc(row.Status)}`}>{row.Status === "Pending" ? "Pending" : row.Status === "Rejected" ? "Rejected" : "Approved"}</span>
                                </div>
                            ),
                            value: "Status",
                        }
                    ]} />
                </Col>
            </Row>
        </>
    )
}

export default MyBookings
