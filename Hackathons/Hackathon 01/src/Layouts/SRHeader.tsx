import { Avatar } from "@mui/material";
import { Link, NavLink } from "react-router-dom";

function SRHeader() {
    return (
        <nav className="navbar navbar-expand-lg bg-transparent">
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
                        <li className="nav-item">
                            <div className="dropdown">
                                <div
                                    className="avatar-dropdown-trigger"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Avatar
                                        // alt="Remy Sharp"
                                        src="/broken-image.jpg"
                                    />
                                </div>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default SRHeader;
