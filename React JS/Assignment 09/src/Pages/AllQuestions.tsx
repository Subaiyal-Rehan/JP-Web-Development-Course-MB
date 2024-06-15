import { useEffect, useState } from "react";
import MyQuestion from "../Components/MyQuestion";
import MyHeader from "../Layout/Header";
import { getData } from "../Config/FirebaseMethods";

function AllQuestions() {
  const [data, setData] = useState<any>(false);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true)
      try {
        const res = await getData("Questions");
        setData(res);
        setLoader(false)
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoader(false)
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className='HeroSection'>
        <div>
          <MyHeader />
          <div className="container padding-top px-0">
            <div className="position-relative p-md-5 p-2 py-4 bg-body border border-dashed rounded-5">
              <h1 className="text-center display-2 fw-semibold mb-4">All Questions</h1>
              {loader ? (
                <div className="d-flex justify-content-center mt-5">
                  <div className="spinner-border fs-2" style={{ width: "5rem", height: "5rem" }} role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : data ? (<MyQuestion data={data} />) : (<h2 className="text-center">No Questions Added Yet!</h2>)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllQuestions;
