import { useState } from "react";
import "./App.css";
import MyButton from "./Components/MyButton/MyButton";
import MyInput from "./Components/MyInput/MyInput";
import MyTable from "./Components/MyTable/MyTable";

function App() {
  const [date, setDate] = useState<any>("");
  const [name, setName] = useState<any>("");
  const [agenda, setAgenda] = useState<any>("");
  const [detailsArr, setDetailsArr] = useState<any>([]);

  return (
    <>
      <h1 className="text-center display-3 fw-semibold">
        <img src="/src/Images/Logo.png" width="150" alt="Logo" />
        Office Meeting Details
        <img src="/src/Images/Logo.png" width="150" alt="Logo" />
      </h1>
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          setDetailsArr([
            ...detailsArr,
            { date: date, name: name, agenda: agenda },
          ]);
        }}
        className="d-flex justify-content-center gap-5 mt-4 px-4 pt-1 pb-5"
      >
        <div className="d-flex flex-column gap-2">
          <div>
            <MyInput
              placeholder="Enter the date"
              value={date}
              onChange={(e: any) => {
                setDate(e.target.value);
              }}
            />
            <label htmlFor="" className="fs-4 ms-2">
              Enter the Date
            </label>
          </div>
          <div>
            <MyInput
              placeholder="Enter the time"
              value={name}
              onChange={(e: any) => {
                setName(e.target.value);
              }}
            />
            <label htmlFor="" className="fs-4 ms-2">
              Enter the Time
            </label>
          </div>
          <div>
            <MyInput
              placeholder="Enter the agenda"
              value={agenda}
              onChange={(e: any) => {
                setAgenda(e.target.value);
              }}
            />
            <label htmlFor="" className="fs-4 ms-2">
              Enter the Agenda
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <MyButton btnValue="Add" />
        </div>
      </form>
      <hr />
      <MyTable
        row={detailsArr.map((item: any, index: any) => {
          return (
            <>
              <tr key={index} className="fs-5">
                <td>{index + 1}</td>
                <td>{item.date}</td>
                <td>{item.name}</td>
                <td>{item.agenda}</td>
              </tr>
            </>
          );
        })}
      />
    </>
  );
}

export default App;
