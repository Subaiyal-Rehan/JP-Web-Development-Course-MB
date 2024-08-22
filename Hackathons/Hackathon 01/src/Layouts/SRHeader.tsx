import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { signoutUser } from "../Config/FirebaseMethods";
import { toastGreen, toastRed } from "../Components/My Toasts";
import { delUser } from "../Config/Redux/Slices/UserSlice";

function SRHeader() {
    const data = useSelector((user: any) => user.user)

    const dispatch = useDispatch()
    const handleLogout = () => {
        signoutUser().then(() => {
            toastGreen("Successfully logged out.")
            dispatch(delUser())
        }).catch(() => { toastRed("Failed to logout.") })
    }


    return (
        <nav className="navbar navbar-expand-lg bg-darkBlue">
            <div className="container border-bottom py-3">
                <Link className="navbar-brand text-white" to="/">HotelVista</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) => `nav-link text-white ${isActive ? 'customActive' : ''}`}
                                to="/"
                                aria-current="page"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) => `nav-link text-white ${isActive ? 'customActive' : ''}`}
                                to="/aboutus"
                            >
                                About Us
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) => `nav-link text-white ${isActive ? 'customActive' : ''}`}
                                to="/contactus"
                            >
                                Contact
                            </NavLink>
                        </li>
                        <li className="nav-item ms-3">
                            <div className="dropdown">
                                {data.Username !== "" ? (
                                    <>
                                        <div
                                            className="avatar-dropdown-trigger"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <Avatar
                                                alt={data.Username}
                                                src="/broken-image.jpg"
                                            />
                                        </div>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to="/login">My Account</Link></li>
                                            {data.Type == "Accountant" && (<li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>)}
                                            <li onClick={handleLogout}><span className="ms-3 cursor-pointer">Logout</span></li>
                                        </ul>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className="avatar-dropdown-trigger"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <Avatar
                                                src="/broken-image.jpg"
                                            />
                                        </div>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to="/login">Login</Link></li>
                                            <li><Link className="dropdown-item" to="/userSignup">Signup</Link></li>
                                        </ul>
                                    </>
                                )}
                            </div>
                        </li>
                    </ul>
                </div >
            </div >
        </nav >
    );
}

export default SRHeader;
