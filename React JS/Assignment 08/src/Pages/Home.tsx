import Navbar from "../Components/Navbar";
import MyWhiteButton from "../Components/MyButton";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import MyCard from "../Components/MyCard";
import axios from "axios";
import { useEffect, useState } from "react";
import MyFooter from "../Components/MyFooter";
import WidgetBox from "../Components/WidgetBox";

function Home() {
  const [apiData, setApiData] = useState<any>([]);
  
  const fetchData = () => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setApiData([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [])
  

  return (
    <>
      <header>
        <div className="HeroDiv">
          <div className="HeroOverlay">
            <Navbar logo="./src/Images/Logo-White.png" transparent={true} isActive="Home" />
            <div className="HeroText d-flex align-items-center h-75">
              <div className="d-flex flex-column gap-3 text-white">
                <h2 className="fs-5">Summer Collection</h2>
                <h1 className="display-2">Introducing New Arrivals</h1>
                <p className="fs-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                  leo.
                </p>
                <div>
                  <MyWhiteButton btnValue="VIEW COLLECTION" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="quoteSection section-padding">
          <div className="container d-flex flex-column gap-2">
            <FormatQuoteIcon sx={{ fontSize: "60px" }} />
            <p className="display-4 " style={{ letterSpacing: "-2px" }}>
              Shopping is cheaper than therapy.
            </p>
            <div className="d-flex align-items-center gap-2">
              <span className="CreditsLine d-inline-block"></span>
              <span className="fs-4">OnlineWardrobe</span>
            </div>
          </div>
        </section>

        <div className="divider"></div>

        <section className="featuredSection section-padding">
          <h2 className="fs-1 fw-bold text-center mb-5">Featured Products</h2>
          <MyCard data={apiData} />
        </section>

        <section className="WidgetBoxSection section-padding">
          <WidgetBox />
        </section>
      </main>

      <footer>
        <MyFooter />
      </footer>
    </>
  );
}

export default Home;
