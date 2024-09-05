import { Link } from "react-router-dom";
import "./MyFooter.css";

function MyFooter() {
  return (
    <>
      <div className="footerContainer section-padding bg-black text-white">
        <div className="container">
          <div className="logoDiv">
            <img src="./../src/Images/Logo-White.png" width="140" />
            <p className="w-75 mt-4">
              Transform your style with OnlineWardrobe - where fashion meets
              elegance. Discover the latest trends and timeless classics to
              elevate your wardrobe every day.
            </p>
          </div>
          <div className="ulsDiv">
            <div>
              <h3 className="fs-4">Quick Links</h3>
              <ul className="list-unstyled">
                <li><Link className="text-white text-decoration-none" to="/">Home</Link></li>
                <li><Link className="text-white text-decoration-none" to="/Products">All Products</Link></li>
                <li><Link className="text-white text-decoration-none" to="/About">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="fs-4">Shop Collections</h3>
              <ul className="list-unstyled">
                <li>Men's Jeans</li>
                <li>Women's Tops</li>
                <li>Hoodies</li>
                <li>Jackets</li>
                <li>Shoes</li>
              </ul>
            </div>
            <div>
              <h3 className="fs-4">Shop Collections</h3>
              <ul className="list-unstyled">
                <li>Men's Jeans</li>
                <li>Women's Tops</li>
                <li>Hoodies</li>
                <li>Jackets</li>
                <li>Shoes</li>
              </ul>
            </div>
            <div>
              <h3 className="fs-4">Shop Collections</h3>
              <ul className="list-unstyled">
                <li>Men's Jeans</li>
                <li>Women's Tops</li>
                <li>Hoodies</li>
                <li>Jackets</li>
                <li>Shoes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footerBottom d-flex justify-content-between align-items-center container p-5 text-muted">
        <div>
          <span>Copyright &copy; 2024 OnlineWardrobe</span>
        </div>
        <div>
          <Link to="/">
            <img src="./../src/Images/Logo-Black.png" alt="" />
          </Link>
        </div>
        <div>
          <span>
            Developed by{" "}
            <a
              className="textne text-muted"
              target="_blank"
              href="https://www.github.com/Subaiyal-Rehan"
            >
              Subaiyal Rehan
            </a>
          </span>
        </div>
      </div>
    </>
  );
}

export default MyFooter;
