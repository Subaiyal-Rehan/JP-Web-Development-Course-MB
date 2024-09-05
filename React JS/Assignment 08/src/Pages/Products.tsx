import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MyCard from "../Components/MyCard";
import MyFooter from "../Components/MyFooter";

function Products() {
  const [categories, setCategories] = useState<any>([]);
  const [loader, setloader] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [selectVal, setSelectVal] = useState<any>("allProducts");
  const [categoryData, setCategoryData] = useState<any>([]);

  useEffect(() => {
    setloader(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res: any) => {
        setData([...res.data]);
        setCategories(
          Array.from(new Set([...res.data].map((item: any) => item.category)))
        );
        setloader(false);
      })
      .catch((error) => {
        console.log("Error Fetching Data", error);
        setloader(false);
      });
  }, []);

  useEffect(() => {
    setCategoryData(data.filter((item: any) => item.category == selectVal));
  }, [selectVal]);

  return (
    <>
      <header>
        <Navbar
          logo="./../src/Images/Logo-Black.png"
          transparent={false}
          isActive="Products"
        />
      </header>

      <main
        style={{ backgroundColor: "whitesmoke" }}
        className="section-padding"
      >
        <div className="container p-5 bg-white">
          <h1 className="display-3">All Products</h1>
          <div className="categoryDiv d-flex justify-content-end">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Category
              </InputLabel>
              <Select
                label="Category"
                onChange={(e) => {
                  setSelectVal(e.target.value);
                }}
                displayEmpty
                value={selectVal}
              >
                <MenuItem selected value={"allProducts"}>
                  All Products
                </MenuItem>
                {data &&
                  categories.map((item: any, index: any) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>
                Select category according to your prefrences
              </FormHelperText>
            </FormControl>
          </div>
          <div>
            {loader ? (
              <div className="d-flex justify-content-center">
                <div
                  style={{ height: "100px", backgroundColor: "whitesmoke" }}
                  className="customLoader w-100"
                ></div>
              </div>
            ) : data[0] && !loader ? (
              <MyCard data={selectVal == "allProducts" ? data : categoryData} />
            ) : (
              <div className="d-flex justify-content-center align-items-center gap-3 flex-column">
                <span className="display-4">Oops! Something went wrong.</span>
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
        </div>
      </main>
      <footer>
        <MyFooter />
      </footer>
    </>
  );
}

export default Products;
