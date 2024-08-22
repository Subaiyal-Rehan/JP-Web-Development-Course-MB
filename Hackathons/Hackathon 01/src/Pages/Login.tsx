import { Link, useNavigate } from "react-router-dom"
import SRButton from "../Components/SRButton"
import { useEffect, useState } from "react"
import { signinUser } from "../Config/FirebaseMethods"
import { toastGreen, toastRed } from "../Components/My Toasts"
import SRLoader from "../Components/SRLoader"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import app from "../Config/FirebaseConfig"

function Login() {
  const [loginData, setLoginData] = useState<any>({})
  const [loader, setLoader] = useState<any>(false)
  const navigate = useNavigate()
  const auth = getAuth(app);
  const [isInitialCheck, setIsInitialCheck] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && isInitialCheck) {
        toastRed("User is already logged in.");
        navigate("/");
      }
      setIsInitialCheck(false);
    });

    return () => unsubscribe();
  }, [auth, navigate, isInitialCheck]);

  const handleSubmit = (e: any) => {
    setLoader(true)
    e.preventDefault();
    signinUser(loginData.email, loginData.password).then(() => {
      setLoader(false)
      toastGreen("Successfully Logged in")
      navigate("/")
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
          <div className="d-flex gap-2">
          <Link to="/userSignup" className="accountBtn text-decoration-none">Sign up</Link>
          <Link to="/" className="accountBtn text-decoration-none">Go to Home</Link>
          </div>
        </div>
      </form>
    </>
  )
}

export default Login
