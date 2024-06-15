import { NavLink } from "react-router-dom";
import Logo from "./../Images/Logo.png";
import "./Header.css"

function MyHeader() {
    return (
        <nav className="width-99 navbar navbar-expand-lg py-2 position-absolute z-3">
            <div className="pe-lg-0 ps-lg-5 container-fluid justify-content-between">
                <a className="navbar-brand" href="#">
                    <img src={Logo} height="80" alt="logo" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <div className="nav_left d-lg-flex align-items-center">
                        <nav>
                            <div className="nav d-block d-lg-flex nav-tabs" id="nav-tab" role="tablist">
                                <NavLink to="/" className={(e) => e.isActive ? "nav-link active" : "nav-link"}><button className="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                                    type="button" role="tab" aria-controls="home" aria-selected="true">Home</button></NavLink>
                                <NavLink to="/askQuestion" className={(e) => e.isActive ? "nav-link active" : "nav-link"}><button className="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                                    type="button" role="tab" aria-controls="home" aria-selected="true">Ask Question</button></NavLink>
                                <NavLink to="/allQuestions" className={(e) => e.isActive ? "nav-link active" : "nav-link"}><button className="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                                    type="button" role="tab" aria-controls="home" aria-selected="true">All Questions</button></NavLink>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default MyHeader;
