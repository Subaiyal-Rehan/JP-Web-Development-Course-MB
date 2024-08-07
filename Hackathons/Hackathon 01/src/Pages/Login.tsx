import { Link, useNavigate } from "react-router-dom"
import SRButton from "../Components/SRButton"
import { useState } from "react"
import { signinUser } from "../Config/FirebaseMethods"
import { toastGreen, toastRed } from "../Components/My Toasts"
import SRLoader from "../Components/SRLoader"

function Login() {
  const [loginData, setLoginData] = useState<any>({})
  const [loader, setLoader] = useState<any>(false)
  const navigate = useNavigate()

  const handleSubmit = (e: any) => {
    setLoader(true)
    e.preventDefault();
    signinUser(loginData.email, loginData.password).then(() => {
      setLoader(false)
      toastGreen("Successfully Logged in")
      navigate("/dashboard")
    }).catch((err) => {
      setLoader(false)
      toastRed(err)
    })
  }

  return (
    <>
      {loader && <SRLoader />}
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleSubmit} className="Form">
        <h3 className="text-white text-center fs-2">Login Here</h3>
        <label className="text-white mb-1 mt-4 fw-semibold formLabel" htmlFor="username">Email Address</label>
        <input type="email" placeholder="Email Address" onChange={(e: any) => setLoginData({ ...loginData, email: e.target.value })} required className="textInputs" id="username" />

        <label className="text-white mb-1 mt-4 fw-semibold formLabel" htmlFor="password">Password</label>
        <input type="password" placeholder="Password" onChange={(e: any) => setLoginData({ ...loginData, password: e.target.value })} required className="textInputs" id="password" />

        <div className="mt-4">
          <SRButton type="submit" className="w-100" btnValue="Log In" />
        </div>
        <div className="social flex-column align-items-center text-white">
          Don't have an account?
          <Link to="/signup" className="accountBtn text-decoration-none">Sign up</Link>
        </div>
      </form>
    </>
  )
}

export default Login
