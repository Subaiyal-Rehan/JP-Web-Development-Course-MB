import { useEffect, useState } from "react"
import { getData } from "../../Config/FirebaseMethods"
import SRTable from "../../Components/SRTable"

function ApprovedReservations() {
    const [allData, setAllData] = useState<any>([])

    const fetchData = () => {
        getData("Bookings").then((res: any) => {
            const arr = res.filter((item: any) => item.Accepted)
            const modifiedArr = arr.map((item: any) => {
                return {
                    ...item,
                    Accepted: item.Accepted.substring(3),
                };
            });

            setAllData(modifiedArr);
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
                <h2 className='fs-heading mb-4'>Approved Reservations</h2>
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
                        value: "Accepted by",
                        id: "Accepted"
                    },
                ]} />
            </div>
        </>
    )
}

export default ApprovedReservations
