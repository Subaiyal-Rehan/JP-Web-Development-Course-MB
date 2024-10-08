import { Link } from "react-router-dom"

function SRDashboardBox(props: any) {
  const { className, titleName, count, bgColor, color, icon, link } = props
  return (
    <>
      <Link className="DashboardLink text-decoration-non" to={link}>
        <div style={{ backgroundColor: bgColor, color: color }} className={`DashboardBox rounded position-relative py-3 px-3 d-flex flex-column justify-content-center ${className}`}>
          <h2 className="display-5 m-0 fw-bold text-decoration-non">{count}</h2>
          <h2 className="fs-4 m-0 fw-bold text-decoration-non">{titleName}</h2>
          <span className="icon-wrapper position-absolute opacity-25 display-3">{icon}</span>
        </div>
      </Link>
    </>
  )
}

export default SRDashboardBox