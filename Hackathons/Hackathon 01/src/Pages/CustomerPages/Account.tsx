import { useSelector } from "react-redux"
import SRHeader from "../../Layouts/SRHeader"
import { Link } from "react-router-dom"
import { FaRegUserCircle } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

function Account() {
    const userData = useSelector((state: any) => state.user)
    return (
        <>
            <SRHeader />
            <h1 className="heading-h1 text-center text-white pb-2 fs-1">My Account</h1>
            <Row className="container mx-auto text-white mt-4 row-gap-4">
                <Col lg={3} md={12} className="AccountMenu p-2 px-4 border d-flex flex-column fs-5">
                    <Link to="/account" className="text-white text-decoration-none d-flex align-items-center gap-3 my-2"><FaRegUserCircle /> Profile</Link>
                    <Link to="/mybookings" className="text-white text-decoration-none d-flex align-items-center gap-3 my-2"><BsCart2 /> My Bookings</Link>
                </Col>
                <Col lg={9} md={12} className="AccountDetails">
                    <h2 className="left-heading">Profile</h2>
                    <h4 className="d-flex justify-content-between border-bottom my-4 pb-1 fs-5">
                        <span className="fw-semibold">User Name:</span> <span>{userData.Username}</span>
                    </h4>
                    <h4 className="d-flex justify-content-between border-bottom my-4 pb-1 fs-5">
                        <span className="fw-semibold">Email:</span> <span>{userData.Email}</span>
                    </h4>
                    <h4 className="d-flex justify-content-between border-bottom my-4 pb-1 fs-5">
                        <span className="fw-semibold">Contact Number:</span> <span>{userData.Number}</span>
                    </h4>
                    <h4 className="d-flex justify-content-between border-bottom my-4 pb-1 fs-5">
                        <span className="fw-semibold">User ID:</span> <span>{userData.Uid}</span>
                    </h4>
                </Col>
            </Row>
        </>
    )
}

export default Account
