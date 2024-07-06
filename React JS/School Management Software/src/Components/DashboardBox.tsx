function DashboardBox(props:any) {
    const {className, titleName, count, bgColor, color, icon} = props
  return (
    <>
        <div style={{backgroundColor: bgColor, color: color}} className={`DashboardBoxa rounded position-relative py-3 px-3 ${className}`}>
            <h2 className="display-5 m-0 fw-bold">{count}</h2>
            <h2 className="fs-4 m-0 fw-bold">{titleName}</h2>
            <span className="position-absolute opacity-25 display-3" style={{right: "8%", top: "18%"}}>{icon}</span>
        </div>
    </>
  )
}

export default DashboardBox
