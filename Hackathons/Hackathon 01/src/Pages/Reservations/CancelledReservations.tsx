import { useEffect, useState } from "react"
import { getData } from "../../Config/FirebaseMethods"
import SRTable from "../../Components/SRTable"

function CancelledReservations() {
    const [allData, setAllData] = useState<any>([])
  
    const fetchData = () => {
      getData("Cancelled").then((res:any) => {
        const modifiedArr = res.map((item: any) => {
            return {
                ...item,
                Rejected: item.Rejected.substring(3),
            };
        });
        setAllData(modifiedArr)
      }).catch(() => {
        setAllData([])
      })
    }
  
    useEffect(() => {
      fetchData()
    }, [])
  
   return (
      <>
        <div className='custom-black'>
          <h2 className='fs-heading mb-4'>Cancelled Reservations</h2>
          <SRTable data={allData} cols={[
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
                value: "Rejected by",
                id: "Rejected"
              },
          ]} />
        </div>
      </>
    )
}

export default CancelledReservations
