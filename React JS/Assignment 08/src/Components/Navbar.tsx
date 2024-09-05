import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, IconButton } from "@mui/material";
import "./../App.css";
import { useEffect, useState } from "react";

function Navbar(props: any) {
  const [linkClass, setLinkClass] = useState<any>("second")
  const abcFunc = () => {
    props.transparent?
   setLinkClass("nav-link text-white customNav")
   :
   setLinkClass("nav-link text-black customNav")
  }

  useEffect(() => {
    abcFunc()
  }, [])
  
  return (
    <nav
      className={
        props.transparent
          ? "navbar navbar-expand-lg bg-transparent rounded px-3 py-3"
          : "navbar navbar-expand-lg bg-body-tertiary rounded px-3 py-3"
      }
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample11"
          aria-controls="navbarsExample11"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse d-lg-flex"
          id="navbarsExample11"
        >
          <Link className="navbar-brand col-lg-3 me-0" to="/">
            <img
              src={props.logo}
              className="d-none d-md-block"
              width={120}
              alt="Logo"
            />
          </Link>
          <ul className="navbar-nav col-lg-6 fs-5 text-uppercase gap-lg-4 justify-content-lg-center">
            <li className="nav-item">
              <Link
                className={
                  props.isActive == "Home" ? linkClass + " customActive" : linkClass
                }
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  props.isActive == "Products"
                    ? linkClass + " customActive"
                    : linkClass
                }
                to="/Products"
              >
                All Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  props.isActive == "About"
                    ? linkClass + " customActive"
                    : linkClass
                }
                to="/About"
              >
                About Us
              </Link>
            </li>
          </ul>
          <div className="d-lg-flex col-lg-3 justify-content-lg-end">
            <IconButton aria-label="delete">
              <Badge badgeContent="0" color="secondary">
                <ShoppingCartIcon className={props.transparent?"fs-2 text-white":"fs-2 text-black"} />
              </Badge>
            </IconButton>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
