import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import SRInput from "../../Components/SRInput";
import SRTable from "../../Components/SRTable";
import { useEffect, useState } from "react";
import { getData } from "../../Config/FirebaseMethods";

function AllBookings() {
    const [allData, setAllData] = useState<any>([])
    const [filteredData, setFilteredData] = useState<any>([])
    const [searchData, setSearchData] = useState<any>({
        idSearch: "",
        // customerNameSearch: "",
    })

    useEffect(() => {
        getData("Bookings").then((res) => {
            setAllData(res)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        let filteredData = allData;

        if (searchData.idSearch !== "") {
            filteredData = filteredData.filter((item: any) => item.BookingId == searchData.idSearch)
        }

        //   if (searchData.customerNameSearch !== "") {
        //     filteredData = filteredData.filter((item:any)=>item.CustomerName == searchData.customerNameSearch)
        //   }

        // if (searchData.customerNameSearch.trim() !== "") {
        //     filteredData = filteredData.filter((item: any) =>
        //         item.CustomerName.toLowerCase() === searchData.customerNameSearch.trim().toLowerCase()
        //     );
        // }

        setFilteredData(filteredData)
    }, [searchData, allData])


    return (
        <>
            <div className="custom-black">
                <h2 className="fs-heading">All Bookings</h2>
                <Row>
                    <Col lg={4} md={12}>
                        <SRInput value={searchData.idSearch} label="Enter booking id to search" placeholder="Enter booking id to search" onChange={(e: any) => setSearchData({ ...searchData, idSearch: e.target.value })} />
                    </Col>
                    {/* <Col lg={4} md={12}>
                        <SRInput value={searchData.customerNameSearch} label="Enter customer name to search" placeholder="Enter customer name to search" onChange={(e: any) => setSearchData({ ...searchData, customerNameSearch: e.target.value })} />
                    </Col> */}
                </Row>
                <div className="mt-4">
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
                    ]} />
                </div>
            </div>
        </>
    )
}

export default AllBookings
