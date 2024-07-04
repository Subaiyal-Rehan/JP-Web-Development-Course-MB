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
      <Sidebar element={content()} breadcrumbLink="Admin" breadcrumbNestedLink="Dashboard" pageName="Admin Dashboard" />
    </>
  )
}

export default Dashboard
