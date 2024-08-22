import { useEffect, useState } from "react"
import { getData } from "../Config/FirebaseMethods"

function AllReservations() {
    const [allData, setAllData] = useState<any>([])

    useEffect(() => {
      getData("Reservations").then((res)=>{
        setAllData(res)
      }).catch((err)=>{
        console.log(err)
        setAllData("NotFound")
      })
    }, [])
    

    return (
        <>
            <div className='custom-black'>
                <h2 className='fs-heading'>All Reservations</h2>
            </div>
        </>
    )
}

export default AllReservations
