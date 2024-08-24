import { useEffect, useState } from "react"
import { deleteData, getData, setData } from "../Config/FirebaseMethods"
import SRTable from "../Components/SRTable"
import { toastGreen, toastRed } from "../Components/My Toasts"
import { confirmAlert } from "../Components/ConfirmAlert"
import SRLoader from "../Components/SRLoader"
import { useSelector } from "react-redux"

function AllReservations() {
  const [loader, setLoader] = useState<boolean>(false)
  const [allData, setAllData] = useState<any>([])
  const [filteredData, setFilteredData] = useState<any>([])
  const userData = useSelector((user: any) => user.user)

  const fetchData = () => {
    getData("Reservations").then((res) => {
      setAllData(res)
    }).catch(() => {
      setAllData([])
    })
  }

  useEffect(() => {
    console.log(allData)
  }, [allData])


  useEffect(() => {
    fetchData()
  }, [])

  // Search Mechanism
  useEffect(() => {
    let filteredData = allData;
    setFilteredData(filteredData);
  }, [allData])

  const handleApprove = (row: any) => {
    confirmAlert({
      mainTitle: `Approve the Booking for ${row.CustomerName} for room ${row.RoomNumber}?`,
      mainText: `Once done, this cannot be changed.`,
      confirmBtnText: "Yes, Approve!"
    }).then(() => {
      setLoader(true)
      setData("Bookings", { ...row, Accepted: `By ${userData.Username}` }).then(() => {
        deleteData("Reservations", row.id).then(() => {
          fetchData()
          setLoader(false)
          toastGreen("Booking has been approved.")
        })
      }).catch(() => {
        setLoader(false)
        toastRed("Failed to approve the booking.")
      })
    })
  }

  const handleCancel = (row: any) => {
    confirmAlert({
      mainTitle: `Reject the Booking for ${row.CustomerName} for room ${row.RoomNumber}?`,
      mainText: `Once done, this cannot be changed.`,
      confirmBtnText: "Yes, Reject!"
    }).then(() => {
      setLoader(true)
      setData("Cancelled", { ...row, Rejected: `By ${userData.Username}` }).then(() => {
        deleteData("Reservations", row.id).then(() => {
          fetchData()
          setLoader(false)
          toastGreen("Booking has been rejected.")
        })
      }).catch(() => {
        setLoader(false)
        toastRed("Failed to Reject the booking.")
      })
    })
  }

  return (
    <>
      {loader && <SRLoader />}
      <div className='custom-black'>
        <h2 className='fs-heading'>All Reservations</h2>
        <SRTable data={filteredData} cols={[
          {
            value: "Booking Id",
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
                      <li><button className="dropdown-item py-2" onClick={() => handleApprove(row)} type="button">Approve</button></li>
                      <li><hr className="dropdown-divider m-0" /></li>
                      <li><button className="dropdown-item py-2" onClick={() => handleCancel(row)} type="button">Reject</button></li>
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
