import Sidebar from "../Layout/Sidebar"

function Dashboard() {

  const content = () => {
    return (
      <>
        CONTENT!
      </>
    )
  }

  return (
    <>
      <Sidebar element={content()} breadcrumbLink="Admin" pageName="Admin Dashboard" />
    </>
  )
}

export default Dashboard
