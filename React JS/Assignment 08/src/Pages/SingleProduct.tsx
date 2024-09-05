import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import "./../App.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MyCard from "../Components/MyCard";
import MyFooter from "../Components/MyFooter";

function SingleProduct() {
  const [data, setData] = useState<any>({});
  const [loader, setLoader] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [allData, setAllData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const params = useParams();

  console.log(window.location.href)

  useEffect(() => {
    setLoader(true);
    axios
      .get(`https://fakestoreapi.com/products/${params.id}`)
      .then((res) => {
        setData(res.data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err, "ERROR OCCURED");
        setLoader(false);
      });
  }, [params.id])
  

  useEffect(() => {
    setLoader(true);
    axios
      .get(`https://fakestoreapi.com/products`)
      .then((res) => {
        setAllData([...res.data]);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err, "ERROR OCCURED");
        setLoader(false);
      });
  }, []);



  useEffect(() => {
    if (data.category) {
    setFilteredData(allData.filter((item:any) => item.category === data.category && item.id !== data.id));
    }
  }, [data, allData]);

  return (
    <>
      <header>
        <Navbar
          logo="./../src/Images/Logo-Black.png"
          transparent={false}
          isActive=""
        />
      </header>
      <main className="SingleMain section-padding">
        <div className="container section-padding bg-white">
          <div className="ProductDetailContainer row">
            {loader ? (
              <div className="d-flex justify-content-center">
                <div
                  style={{ height: "100px", backgroundColor: "whitesmoke" }}
                  className="customLoader w-100"
                ></div>
              </div>
            ) : data.id && !loader ? (
              <>
                <div className="singleImageContainer col-md-6">
                  <img src={data.image} />
                </div>
                <div className="TextContainer col-md-6 p-4">
                  <div className="productName mb-4">
                    <span>
                      Home / {data.category} / {data.title}
                    </span>
                  </div>
                  <div className="productPrice">
                    <span className="fs-2">${data.price}</span>
                  </div>
                  <div className="productDesc">
                    <p className="fs-5">{data.description}</p>
                  </div>
                  <div className="productAdd d-flex justify-content-between mt-4 align-items-center">
                    <div className="d-flex align-items-center border border-opacity-25 border-black border">
                      <button
                        className="btn btn-outline-secondary border-end border-black border-opacity-25 border-0 rounded-0"
                        onClick={() => {
                          quantity == 1 ? null : setQuantity(quantity - 1);
                        }}
                      >
                        <RemoveIcon />
                      </button>
                      <span
                        className="d-flex justify-content-center"
                        style={{ width: "50px" }}
                      >
                        {quantity}
                      </span>
                      <button
                        className="btn btn-outline-secondary border-start border-black border-opacity-25 border-0 rounded-0"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <AddIcon />
                      </button>
                    </div>
                    <div>
                      <button className="cartBtn">ADD TO CART</button>
                    </div>
                  </div>
                  <hr />
                  <div>
                    <span>Category: {data.category}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="d-flex justify-content-center align-items-center gap-3 flex-column">
                <span className="display-4">Oops! Product not found.</span>
                <div>
                  <img
                    src="./../src/Images/No_Product.jpeg"
                    className="img-fluid"
                    style={{ maxHeight: "300px" }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="divider my-5"></div>

          <div className="relatedProductsContainer">
            <h2>Related Products</h2>
            <MyCard data={filteredData} />
          </div>
        </div>
      </main>

      <footer>
        <MyFooter />
      </footer>
    </>
  );
}

export default SingleProduct;
