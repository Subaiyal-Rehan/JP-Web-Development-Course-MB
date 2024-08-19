import { useEffect, useState } from "react"
import SRInput from "../../Components/SRInput"
import { getData, setData } from "../../Config/FirebaseMethods"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import SRSelect from "../../Components/SRSelect"
import SRButton from "../../Components/SRButton"
import { toastGreen, toastRed } from "../../Components/My Toasts"
import SRLoader from "../../Components/SRLoader"

function Booking() {
    const initialObj = {
        CheckInDate: "",
        CheckOutDate: "",
        CustomerName: "",
        RoomId: "",
        RoomNumber: "",
        RoomPrice: "",
    }
    const [loader, setLoader] = useState<boolean>(false)
    const [roomData, setRoomData] = useState<any>({})
    const [selectedData, setSelectedData] = useState<any>({})
    const [roomNumberOption, setRoomNumberOption] = useState<any>([])
    const [bookingData, setBookingData] = useState<any>(initialObj)
    const [RoomId, setRoomId] = useState<any>("")
    const fetchData = (id?: any) => {
        if (id) {
            getData("Rooms", id).then((res: any) => {
                setSelectedData(res);
                setBookingData({ ...bookingData, RoomId: res.id, RoomNumber: res.RoomNumber, RoomPrice: res.RoomPrice });
            }).catch((err) => {
                console.log(err);
            });
        } else {
            getData("Rooms").then((res: any) => {
                setRoomData(res);
                setRoomNumberOption([
                    ...res.map((item: any) => ({
                        value: item.id,
                        label: item.RoomNumber
                    }))
                ]);
            }).catch((err) => {
                console.log(err);
            });
        }
    }
    const fetchBookingData = () => {
        getData("Bookings").then((res: any) => {
            let a = res[res.length - 1].BookingId
            a && setBookingData({ ...roomData, BookingId: Number(a) + 1 })
        }).catch((err) => {
            err && setBookingData({ ...roomData, BookingId: 1 })
        })
    }

    useEffect(() => {
        fetchData()
        fetchBookingData()
    }, [])

    const handleReset = (checkSubmit?:boolean) => {
        let currentBookingID;
        if (checkSubmit) {
            currentBookingID = bookingData.BookingId + 1
        } else {
            currentBookingID = bookingData.BookingId
        }
        setBookingData({...initialObj, BookingId : currentBookingID});
        setRoomData({ RoomId: "" });
        setSelectedData({})
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoader(true)
        if (selectedData.RoomStatus == "Occupied") {
            setLoader(false)
            toastRed("The Room is already occupied.")
            return;
        }
        try {
            await Promise.all([
                setData("Bookings", bookingData),
                setData("Rooms", { ...selectedData, RoomStatus: "Occupied" })
            ]);

            setLoader(false)
            toastGreen("Your booking has been confirmed successfully!");
            handleReset(true);
        } catch (err) {
            setLoader(false)
            toastRed("Booking could not be processed. Please try again later.");
        }
    }

    useEffect(() => {
        if (RoomId) {
            fetchData(RoomId)
        }
    }, [RoomId])

    return (
        <>
            {loader && <SRLoader />}
            <div className='custom-black'>
                <h2 className="fs-heading">Create a Booking</h2>
                <form onSubmit={handleSubmit}>
                    <Row>
                        <h3 className="m-0 fs-5 mt-4">Customer Details</h3>
                        <Col lg={4} md={6} sm={12}>
                            <SRInput disabled={true} value={bookingData && bookingData.BookingId} label="Booking ID (Auto Generated)" />
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                            <SRInput disabled={true} value={bookingData && bookingData.BookingId} label="Customer ID (Auto Generated)" />
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                            <SRInput value={bookingData.CustomerName} onChange={(e: any) => setBookingData({ ...bookingData, CustomerName: e.target.value })} label="Enter Customer Full Name" placeholder="Customer full name" />
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                            <SRInput type="date" value={bookingData.CheckInDate} onChange={(e: any) => setBookingData({ ...bookingData, CheckInDate: e.target.value })} label="Check in Date" />
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                            <SRInput type="date" value={bookingData.CheckOutDate} onChange={(e: any) => setBookingData({ ...bookingData, CheckOutDate: e.target.value })} label="Check out Date" />
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <h3 className="m-0 fs-5">Room Details</h3>
                        <Col lg={4} md={6} sm={12}>
                            <SRSelect label="Select Room by ID" options={roomNumberOption} required value={roomData.RoomId} onChange={(e: any) => { setRoomId(e.target.value) }} />
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                            <SRInput disabled={true} value={selectedData.RoomNumber || "First Select the Room"} label="Confirm Room Number" />
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                            <SRInput disabled={true} value={selectedData.RoomType || "First Select the Room"} label="Confirm Room Type" />
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                            <SRInput disabled={true} value={selectedData.RoomStatus || "First Select the Room"} label="Confirm Room Status" />
                        </Col>
                        <Col lg={4} md={6} sm={12}>
                            <SRInput disabled={true} value={selectedData.RoomPrice || "First Select the Room"} label="Confirm Room Price" />
                        </Col>
                    </Row>
                    <div className="mt-4">
                        <SRButton btnValue="Book" className="px-4" type="submit" />
                        <SRButton btnValue="Reset" onClick={()=>handleReset(false)} className="px-4 ms-3" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default Booking