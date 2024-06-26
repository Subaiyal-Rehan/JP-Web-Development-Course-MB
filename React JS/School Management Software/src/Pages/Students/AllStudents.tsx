import Grid from "../../Components/MyGrid"
import Sidebar from "../../Layout/Sidebar"

function AllStudents() {
    const content = () => {
        return (
          <>
            <Grid />
          </>
        )
      }
    
      return (
        <>
          <Sidebar element={content()} breadcrumbLink="Students" pageName="All Students" breadcrumbNestedLink="All Students" />
        </>
      )
}

export default AllStudents
