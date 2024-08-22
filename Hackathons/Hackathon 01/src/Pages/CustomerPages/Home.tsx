import { useEffect, useState } from "react"
import SRHeader from "../../Layouts/SRHeader"
import { getData } from "../../Config/FirebaseMethods"
import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/esm/Row"
import SRButton from "../../Components/SRButton"
import Footer from "../../Layouts/Footer"

function Home() {
    const [roomsData, setRoomsData] = useState<any>([])

    useEffect(() => {
        getData("Rooms").then((res) => setRoomsData(res)).catch(() => { setRoomsData("ERROR") })
    }, [])


    return (
        <>
            <main>
                <div className="heroSection">
                    <SRHeader />
                    <div className="heroTextDiv d-flex flex-column justify-content-center align-items-center">
                        <h1 className="text-white text-center fs-3 fw-light text-uppercase">Experience the Height of Comfort on Your Dream Holiday!</h1>
                        <h2 className="text-white text-center display-4 fw-bold">Where Relaxation Meets Elegance</h2>
                    </div>
                </div>
                <div className="RoomsSection container mt-5">
                    <h2 className="text-center text-white fs-1">Featured Rooms</h2>
                    {roomsData !== "ERROR" ? (
                        <>
                            <Row className="row-gap-4">
                                {roomsData.map((item: any, index: any) => (
                                    <Col lg={4} md={6} sm={12} className="mx-auto" key={index}>
                                        <div className="RoomCard overflow-hidden rounded">
                                            <div className="RoomCardImg">
                                                <img src={item.RoomImg} alt="Room Img" />
                                            </div>
                                            <div className="RoomCardBottom p-3 text-white text-center">
                                                <div className="RoomCardTitle">
                                                    <h3>{item.RoomType}</h3>
                                                </div>
                                                <div className="RoomCardDesc">
                                                    <p className="fs-5">{item.RoomDescription.length >= 70 ? item.RoomDescription.slice(0, 70) : item.RoomDescription}</p>
                                                </div>
                                                <div className="RoomCardFooter d-flex align-items-center justify-content-between">
                                                    <div className="RoomCardPrice">
                                                        <h4 className="fs-3">{item.RoomPrice} / Day</h4>
                                                    </div>
                                                    <SRButton link={`/customerBooking/${item.id}`} btnValue="Book Now" />
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </>
                    ) : (
                        <div className="d-flex justify-content-center mt-5">
                            <div className="loader"></div>
                        </div>
                    )}
                </div>
            </main>
            <footer className="py-4">
                <Footer />
            </footer>
        </>
    )
}

export default Home
