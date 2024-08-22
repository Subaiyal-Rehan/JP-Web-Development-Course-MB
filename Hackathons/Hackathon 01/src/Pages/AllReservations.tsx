import { useEffect, useState } from "react"
import { getData } from "../Config/FirebaseMethods"
import SRTable from "../Components/SRTable"
import { Tooltip } from "@mui/material"
import SRButton from "../Components/SRButton"

function AllReservations() {
  const [allData, setAllData] = useState<any>([])
  const [filteredData, setFilteredData] = useState<any>([])

  useEffect(() => {
    getData("Reservations").then((res) => {
      setAllData(res)
    }).catch((err) => {
      console.log(err)
      setAllData("NotFound")
    })
  }, [])
  
  // Search Mechanism
  useEffect(() => {
    let filteredData = allData;
    setFilteredData(filteredData);
  }, [allData])

  const handleApprove = (row:any) => {
    console.log(row)
  }

  const handleCancel = (row:any) => {
    console.log(row)
  }
  


  return (
    <>
      <div className='custom-black'>
        <h2 className='fs-heading'>All Reservations</h2>
        <SRTable data={filteredData} cols={[
          {
            value: "Booking Id",
            id: "BookingId"
          },
          {
            value: "Customer Id",
            id: "BookingId"
          },
          {
            value: "Customer name",
            id: "CustomerName"
          },
          {
            value: "Customer Ph Number",
            id: "Number"
          },
          {
            value: "Check-In",
            id: "CheckInDate"
          },
          {
            value: "Check-Out",
            id: "CheckOutDate"
          },
          {
            value: "Room number",
            id: "RoomNumber"
          },
          {
            value: "Room price",
            id: "RoomPrice"
          },
          {
            width: 144,
            render: (row: any) => {
              return (
                <>
                  <div className="btn-group dropstart">
                    <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Take Action</button>
                    <ul className="dropdown-menu">
                      <li><button className="dropdown-item py-2" onClick={()=>handleApprove(row)} type="button">Approve</button></li>
                      <li><hr className="dropdown-divider m-0" /></li>
                      <li><button className="dropdown-item py-2" onClick={()=>handleCancel(row)} type="button">Cancel</button></li>
                    </ul>
                  </div>
                </>
              )
            },
            value: "Actions",
          },
        ]} />
      </div>
    </>
  )
}

export default AllReservations
