import { useEffect, useState } from "react"
import SRHeader from "../../Layouts/SRHeader"
import { getData, setData } from "../../Config/FirebaseMethods"
import { useParams } from "react-router-dom"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import Footer from "../../Layouts/Footer"
import SRInput from "../../Components/SRInput"
import { useSelector } from "react-redux"
import SRButton from "../../Components/SRButton"
import SRLoader from "../../Components/SRLoader"
import { toastGreen, toastRed } from "../../Components/My Toasts"

function CustomerBooking() {
    const [loader, setLoader] = useState<any>(false)
    const [roomData, setRoomData] = useState<any>({})
    const [bookingData, setBookingData] = useState<any>([])
    const [allBookingData, setAllBookingData] = useState<any>([])
    const [allReservationsData, setAllReservationsData] = useState<any>([])
    const [successful, setSuccessful] = useState<string>("")
    const userData = useSelector((user: any) => user.user)
    const params = useParams()


    const fetchRoomsData = () => {
        getData("Rooms", params.id)
            .then((res: any) => {
                setRoomData(res);
            }).catch((err) => {
                console.error("Error while fetching rooms data", err)
            });
    }

    const fetchReservationsData = () => {
        getData("Reservations")
        .then((res: any) => {
            setAllReservationsData(res)
        }).catch(() => {});
    }

    const fetchBookingsData = () => {
        getData("Bookings")
            .then((res: any) => {
                setAllBookingData(res)
            }).catch(() => {});
    }

    useEffect(() => {
        if (allReservationsData.length !== 0) {
            const lastReservationBookingId = allReservationsData[allReservationsData.length - 1].BookingId;

            setBookingData((prevBookingData: any) => ({
                ...prevBookingData,
                BookingId: lastReservationBookingId + 1
            }));
        } else if (allBookingData.length !== 0) {
            const lastBookingId = allBookingData[allBookingData.length - 1].BookingId;
            setBookingData((prevBookingData: any) => ({
                ...prevBookingData,
                BookingId: lastBookingId + 1
            }));
        } else {
            setBookingData((prevBookingData: any) => ({
                ...prevBookingData,
                BookingId: 1
            }));
        }
    }, [allReservationsData, allBookingData]);
    

    useEffect(() => {
        fetchRoomsData();
        fetchReservationsData();
        fetchBookingsData();
    }, [])

    const { RoomStatus, RoomDescription, RoomId, RoomImg, RoomNumber, RoomPrice, RoomType } = roomData;

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const finalObj = {
            ...bookingData,
            RoomId: roomData.id,
            RoomNumber: roomData.RoomNumber,
            RoomPrice: roomData.RoomPrice,
            CustomerName: userData.Username,
            Number: userData.Number
        };

        if (RoomStatus === "Occupied") {
            toastRed("The Room is already occupied.");
            return;
        }

        setLoader(true);
        try {
            await Promise.all([
                setData("Reservations", finalObj),
                setData("Rooms", { ...roomData, RoomStatus: "Occupied" })
            ]);

            setLoader(false);
            toastGreen("Your booking has been confirmed successfully!");
            setSuccessful("Complete");

            setBookingData({
                CheckInDate: "",
                CheckOutDate: "",
                BookingId: bookingData.BookingId + 1,
            });

            setRoomData((prevData: any) => ({
                ...prevData,
                RoomStatus: "Occupied"
            }));
        } catch (err) {
            setLoader(false);
            toastRed("Booking could not be processed. Please try again later.");
        }
    };

    return (
        <>
            {loader && <SRLoader />}
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
                    {successful == "Complete" ?
                        (
                            <div className="RoomsSection container mt-5">
                                <h2 className="text-center text-white fs-2">Booking Request Received!</h2>
                                <p className="text-white text-center fs-5">Thank you for your booking! Your reservation request has been received and is currently under review. Please allow us some time to process your request. You can check the status wether it's checked or not in 'My Account'. We appreciate your patience!</p>
                            </div>
                        ) : (
                            Object.keys(roomData).length !== 0 ? (
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
                                        <form onSubmit={handleSubmit}>
                                            <h3 className="fs-5 mb-0 border-bottom pb-1">Personal Details (Auto Filled)</h3>
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
                            )
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
