import { useEffect, useState } from "react"
import SRHeader from "../../Layouts/SRHeader"
import { getData } from "../../Config/FirebaseMethods"
import { useParams } from "react-router-dom"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import Footer from "../../Layouts/Footer"
import SRInput from "../../Components/SRInput"
import { useSelector } from "react-redux"
import SRButton from "../../Components/SRButton"

function CustomerBooking() {
    const [roomData, setRoomData] = useState<any>({})
    const [bookingData, setBookingData] = useState<any>([])
    const userData = useSelector((user: any) => user.user)
    const params = useParams()

    useEffect(() => {
        getData("Rooms", params.id).then((res: any) => {
            setRoomData(res)
            setBookingData({ ...bookingData, RoomId: res.id, RoomNumber: res.RoomNumber, RoomPrice: res.RoomPrice, CustomerName: userData.Username });
        }).catch(() => setRoomData("ERROR"))
        getData("Bookings").then((res: any) => {
            let a = res[res.length - 1].BookingId
            a && setBookingData({ ...roomData, BookingId: Number(a) + 1 })
        }).catch((err) => err && setBookingData({ ...roomData, BookingId: 1 }))
        console.log(userData)
    }, [userData])

    const { RoomStatus, RoomDescription, RoomId, RoomImg, RoomNumber, RoomPrice, RoomType } = roomData;

    return (
        <>
            <main>
                <div className="heroSection">
                    <SRHeader />
                    <div style={{ backgroundImage: `url(${roomData && RoomImg})` }} className="heroTextDiv">
                        <div className="overlayDiv d-flex flex-column justify-content-center align-items-center">
                            <h1 className="text-white text-center fs-3 fw-light text-uppercase">Reserve Your Spot in Paradise</h1>
                            <h2 className="text-white text-center display-4 fw-bold">Simple, Quick, and Secure Bookings</h2>
                        </div>
                    </div>
                </div>
                <div className="RoomDetails container mt-5">
                    {Object.keys(roomData).length !== 0 ? (
                        <Row className="text-white">
                            <Col lg={6} md={12}>
                                <h2>Room Details</h2>
                                <div className="RoomImgContainer">
                                    <img src={RoomImg} width="100%" alt="Room Image" />
                                </div>
                                <div className="mt-4">
                                    <h3 className="fs-2">{RoomType}</h3>
                                    <p className="fs-5 text-white-50">{RoomDescription}</p>
                                    <div className="d-flex flex-column gap-1">
                                        <h4 className="d-flex justify-content-between border-bottom pb-1 fs-5"><span>Room ID:</span> <span className="fw-light">{RoomId}</span></h4>
                                        <h4 className="d-flex justify-content-between border-bottom pb-1 fs-5"><span>Room Number:</span> <span className="fw-light">{RoomNumber}</span></h4>
                                        <h4 className="d-flex justify-content-between border-bottom pb-1 fs-5"><span>Room Status:</span> <span className="fw-light">{RoomStatus}</span></h4>
                                        <h4 className="d-flex justify-content-between border-bottom pb-1 fs-5"><span>Room Price:</span> <span className="fw-light">{RoomPrice} / Day</span></h4>
                                    </div>
                                </div>
                            </Col>

                            <Col lg={6} md={12}>
                                <h2>Booking Form</h2>
                                <form>
                                    <h3 className="fs-5 mb-0 border-bottom pb-1">Personal Details</h3>
                                    <SRInput disabled={true} label="User Name" value={userData.Username} placeholder="Enter user name" />
                                    <SRInput disabled={true} label="Email Address" value={userData.Email} placeholder="Enter email address" />
                                    <SRInput disabled={true} label="Phone Number" value={userData.Number} placeholder="Enter phone number" />
                                    <h3 className="fs-5 mb-0 mt-4 border-bottom pb-1">Booking Details</h3>
                                    <Row>
                                        <Col lg={12}>
                                            <SRInput disabled={true} label="Booking ID (Auto Generated)" value={bookingData && bookingData.BookingId} placeholder="Loading..." />
                                        </Col>
                                        <Col lg={6} md={12}>
                                            <SRInput type="date" value={bookingData.CheckInDate} onChange={(e: any) => setBookingData({ ...bookingData, CheckInDate: e.target.value })} label="Check in Date" />
                                        </Col>
                                        <Col lg={6} md={12}>
                                            <SRInput type="date" value={bookingData.CheckOutDate} onChange={(e: any) => setBookingData({ ...bookingData, CheckOutDate: e.target.value })} label="Check out Date" />
                                        </Col>
                                    </Row>
                                    <div className="mt-4 text-end">
                                        <SRButton btnValue="Book" className="px-4" type="submit" />
                                    </div>
                                </form>
                            </Col>
                        </Row>
                    ) : (
                        <>

                        </>
                    )}
                </div>
            </main>
            <footer className="py-4">
                <Footer />
            </footer>
        </>
    )
}

export default CustomerBooking
