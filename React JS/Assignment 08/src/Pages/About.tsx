import MyFooter from "../Components/MyFooter";
import Navbar from "../Components/Navbar";
import WidgetBox from "../Components/WidgetBox";
import LogoWhite from '../Images/Logo-White.png'

function About() {
  let TheyLoveData = [
    {
      image: "./../src/Images/TheyLove1.jpg",
      name: "Stella Jones",
      Profession: "Super Model",
    },
    {
      image: "./../src/Images/TheyLove2.jpg",
      name: "Carlos Hughes",
      Profession: "Student",
    },
    {
      image: "./../src/Images/TheyLove3.jpg",
      name: "Mark Adams",
      Profession: "Entrepreneur",
    },
    {
      image: "./../src/Images/TheyLove4.jpg",
      name: "James Hobbs",
      Profession: "Businessman",
    },
    {
      image: "./../src/Images/TheyLove5.jpg",
      name: "Chloe Newts",
      Profession: "Student",
    },
    {
      image: "./../src/Images/TheyLove6.jpg",
      name: "Brianna Stark",
      Profession: "Fashion Designer",
    },
  ];

  return (
    <>
      <header>
        <div className="AboutHero HeroDiv">
          <div className="HeroOverlay">
            <Navbar
              logo={LogoWhite}
              transparent={true}
              isActive="About"
            />
            <div className="AboutHeroText mt-5 pt-4">
              <h1 className="text-white display-2 text-center">About Us</h1>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="LatestTrends section-padding row container mx-auto">
          <div className="LatestCard col-md-6 d-flex gap-3 align-items-center justify-content-center">
            <div className="latestImg">
              <img src="./../src/Images/Clothes.png" />
            </div>
            <div className="LatestText">
              <h2>Latest Trends For All</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis.
              </p>
            </div>
          </div>

          <div className="LatestCard col-md-6 d-flex gap-4 align-items-center justify-content-center">
            <div className="latestImg">
              <img src="./../src/Images/Discount.png" />
            </div>
            <div className="LatestText">
              <h2>Sale on latest fashion</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis.
              </p>
            </div>
          </div>
        </section>

        <div className="divider"></div>

        <section className="TheyLoveUs section-padding">
          <h2 className="fs-1 text-center">They Love Us!!!</h2>
          <p className="text-center fs-5">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>

          <div className="TheyLoveCards mt-5 row container row-gap-4 mx-auto">
            {TheyLoveData.map((item: any, index: any) => (
              <div key={index} className="col-md-4 TheyLoveCard position-relative">
                <div className="TheyLoveCardImg overflow-hidden rounded">
                  <img src={item.image} />
                </div>
                <div className="TheyLoveCardText position-absolute">
                  <h3 className="fs-5 fw-bold">{item.name}</h3>
                  <p>{item.Profession}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="WdigetBoxSection section-padding">
          <WidgetBox />
        </section>
      </main>

      <footer>
        <MyFooter />
      </footer>
    </>
  );
}

export default About;
