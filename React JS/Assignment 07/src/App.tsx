import {
  Autocomplete,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MyModal from "./Components/MyModal";
import { Button } from "react-bootstrap";

function App() {
  const [allData, setAllData] = useState<any>([]);
  const [searchVal, setSearchVal] = useState<string>("");
  const [filteredData, setfilteredData] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [loaderID, setLoaderID] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    setLoader(true);
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((res) => {
        setAllData([...res.data]);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  }, []);

  const arr: any = [];
  allData.map((item: any) => arr.push({ label: item.name }));

  useEffect(() => {
    if (searchVal.length !== 0 || searchVal !== "") {
      setfilteredData(
        allData.filter((item: any) =>
          item.name.toLowerCase().includes(searchVal.toLowerCase())
        )
      );
    }
  }, [searchVal]);

  const handleDelete = (id: any) => {
    setLoaderID(id);
    axios
      .delete(`https://jsonplaceholder.typicode.com/comments/${id}`)
      .then(() => {
        setAllData(allData.filter((item: any) => item.id !== id));
        setLoaderID(null);
      })
      .catch((err: any) => {
        console.log("An Error Occurred:", err);
        setLoaderID(null);
      });
  };

  const handleUpdateData = (updatedData: any) => {
    axios
      .put(
        `https://jsonplaceholder.typicode.com/comments/${updatedData.id}`,
        updatedData
      )
      .then(() => {
        setAllData((prevData: any) =>
          prevData.map((item: any) =>
            item.id === updatedData.id ? updatedData : item
          )
        );
        setIsModalOpen(true);
      })
      .catch((err) => {
        console.log("An Error Occurred", err);
        setIsModalOpen(true);
      });
  };

  const handleCreateData = (newData: any) => {
    axios
      .post("https://jsonplaceholder.typicode.com/comments", {
        name: newData.name,
        body: newData.name,
        email: newData.name,
      })
      .then((res) => {
        setAllData([...allData, res.data]);
        setIsModalOpen(true);
      })
      .catch((err) => {
        console.log("An Error Occurred: ", err);
        setIsModalOpen(true);
      });
  };

  return (
    <>
      <h1 className="display-3 text-center my-0">CRUD Functions</h1>
      <p className="text-center fs-4 text-muted">
        Create - Read - Update - Delete
      </p>
      <p className="ms-4 text-muted">NOTE: This website utilizes a large dataset from the API, which may cause slower loading times, especially when fetching data, performing searches, or editing entries. Please be patient if your internet connection is not fast enough.</p>
      <div className="InputsContainer px-4">
        <Autocomplete
          disablePortal
          options={arr}
          sx={{ width: "100%" }}
          renderInput={(params) => <TextField {...params} label="Search" />}
          onInputChange={(e: any) =>
            setSearchVal(e.target.value || e.target.innerHTML)
          }
        />
        <Button
          data-bs-toggle="modal"
          data-bs-target={`#addBtnId`}
          color="success"
          className="mt-4"
        >
          Add New Comment
        </Button>
        <MyModal
          onCreateData={handleCreateData}
          data={{
            body: "",
            email: "",
            id: null,
            name: "",
            postId: null,
          }}
          id={`addBtnId`}
          isOpen={isModalOpen}
        />
      </div>
      <section className="tableSection">
        <Paper sx={{ width: "100%", marginTop: "30px", overflow: "hidden" }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHead>
                <TableRow>
                  <TableCell className="bg-black text-white fs-4">ID</TableCell>
                  <TableCell className="bg-black text-white fs-4">
                    Name
                  </TableCell>
                  <TableCell className="bg-black text-white fs-4">
                    Email
                  </TableCell>
                  <TableCell className="bg-black text-white fs-4">
                    Body
                  </TableCell>
                  <TableCell className="bg-black text-white fs-4">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loader ? (
                  <div
                    className="spinner-border fs-1"
                    style={{ width: "6rem", height: "6rem" }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  (filteredData.length > 0 ? filteredData : allData).map(
                    (item: any, index: any) =>
                      loaderID == item.id ? (
                        <div
                          key={index}
                          className="spinner-border fs-2"
                          style={{ width: "4rem", height: "4rem" }}
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <>
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                            className="TableRowMUI"
                          >
                            <TableCell sx={{ fontSize: "16px" }}>
                              {item.id}
                            </TableCell>
                            <TableCell sx={{ fontSize: "16px" }}>
                              {item.name}
                            </TableCell>
                            <TableCell sx={{ fontSize: "16px" }}>
                              {item.email}
                            </TableCell>
                            <TableCell sx={{ fontSize: "16px" }}>
                              {item.body}
                            </TableCell>
                            <TableCell sx={{ fontSize: "16px" }}>
                              <Tooltip title="Delete">
                                <IconButton
                                  onClick={() => handleDelete(item.id)}
                                >
                                  <DeleteIcon className="text-danger" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit">
                                <IconButton
                                  data-bs-toggle="modal"
                                  data-bs-target={`#idNo${index}`}
                                  onClick={() => setIsModalOpen(false)}
                                >
                                  <EditIcon className="text-success" />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                            <MyModal
                              onUpdateData={handleUpdateData}
                              data={item}
                              id={`idNo${index}`}
                              isOpen={isModalOpen}
                            />
                          </TableRow>
                        </>
                      )
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </section>
    </>
  );
}

export default App;
