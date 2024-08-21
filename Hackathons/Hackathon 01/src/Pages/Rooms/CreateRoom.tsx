import { useEffect, useState } from "react"
import SRInput from "../../Components/SRInput"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SRSelect from "../../Components/SRSelect";
import SRTextarea from "../../Components/SRTextarea";
import SRButton from "../../Components/SRButton";
import { getData, setData } from "../../Config/FirebaseMethods";
import { toastGreen, toastRed } from "../../Components/My Toasts";
import SRLoader from "../../Components/SRLoader";

function CreateRoom() {
  const initialData = {
    RoomNumber: "",
    RoomType: "",
    RoomStatus: "",
    RoomPrice: "",
    RoomDescription: "",
    RoomImg: "",
  }
  const [roomData, setRoomData] = useState<any>(initialData)
  const [loader, setLoader] = useState<boolean>(false)
  const fetchData = () => {
    getData("Rooms").then((res:any) => {
      let a = res[res.length-1].RoomId
      a && setRoomData({...roomData, RoomId: Number(a) + 1})
      console.log(a)
    }).catch((err) => {
      err && setRoomData({ ...roomData, RoomId: 1 })
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleReset = (checkSubmit:boolean) => {
    let currentID;
    if (checkSubmit) {
        currentID = roomData.RoomId + 1
    } else {
        currentID = roomData.RoomId
    }
    setRoomData({...initialData, RoomId: currentID})
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoader(true)
    setData("Rooms", roomData).then(() => {
      setLoader(false)
      handleReset(true)
      toastGreen("Successfully created a room.")
    }).catch(() => {
      setLoader(false)
      toastRed("Failed to create a room.")
    })
    console.log(roomData)
  }


  return (
    <>
    {loader && <SRLoader />}
    <div className="custom-black">
      <h2 className="fs-heading">Create a Room</h2>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col lg={4} md={6} sm={12}>
            <SRInput id="ID" placeholder="Loading..." disabled={true} value={roomData.RoomId} label="Room ID (Auto Generated)" />
          </Col>
          <Col lg={4} md={6} sm={12}>
            <SRInput placeholder="Room Number" label="Enter Room Number" value={roomData.RoomNumber} onChange={(e: any) => setRoomData({ ...roomData, RoomNumber: e.target.value })} />
          </Col>
          <Col lg={4} md={6} sm={12}>
            <SRSelect label="Enter Room Type" options={["Single Room", "Double Room", "Suite", "Family Room"]} value={roomData.RoomType} onChange={(e: any) => setRoomData({ ...roomData, RoomType: e.target.value })} />
          </Col>
          <Col lg={4} md={6} sm={12}>
            <SRSelect label="Enter Room Status" options={["Available", "Occupied"]} value={roomData.RoomStatus} onChange={(e: any) => setRoomData({ ...roomData, RoomStatus: e.target.value })} />
          </Col>
          <Col lg={4} md={6} sm={12}>
            <SRInput type="number" placeholder="Room Price (per day)" label="Enter Room Price (per day)" value={roomData.RoomPrice} onChange={(e: any) => setRoomData({ ...roomData, RoomPrice: e.target.value })} />
          </Col>
          <Col lg={4} md={6} sm={12}>
            <SRInput placeholder="Room Image" label="Enter Room Image Link" value={roomData.RoomImg} onChange={(e: any) => setRoomData({ ...roomData, RoomImg: e.target.value })} />
          </Col>
          <Col lg={6} md={12}>
            <SRTextarea label="Enter Room Description" placeholder="Room Description" value={roomData.RoomDescription} onChange={(e: any) => setRoomData({ ...roomData, RoomDescription: e.target.value })} />
          </Col>
        </Row>
        <div className="mt-4">
          <SRButton btnValue="Create" className="px-4" type="submit" />
          <SRButton btnValue="Reset" onClick={()=>handleReset(false)} className="px-4 ms-3" />
        </div>
      </form>
    </div>
    </>
  )
}

export default CreateRoom