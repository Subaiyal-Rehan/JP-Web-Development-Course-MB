import { Link, useNavigate } from "react-router-dom"
import SRButton from "../Components/SRButton"
import { useEffect, useState } from "react"
import { signupUser } from "../Config/FirebaseMethods"
import { toastGreen, toastRed } from "../Components/My Toasts"
import SRLoader from "../Components/SRLoader"
import SRSelect from "../Components/SRSelect"
import { useSelector } from "react-redux"
function Signup() {
    const [signupData, setSignupData] = useState<any>({})
    const [loader, setLoader] = useState<any>(false)
    const navigate = useNavigate()
    const userData = useSelector((state: any) => state.user)

    useEffect(() => {
        console.log(userData)
        if (userData) {
            if (userData.Type !== "Accountant") {
                toastRed('Only admins can enter that page.')
                navigate('/')
            }
        }
    }, [userData])


    const handleSubmit = (e: any) => {
        e.preventDefault();
        setLoader(true)
        signupUser(signupData.email, signupData.password, signupData.userName, signupData.type, signupData.number).then(() => {
            setLoader(false)
            toastGreen("Account Successfully Created.")
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
                <h3 className="text-white text-center fs-2">Sign up Here</h3>
                <label className="text-white mb-1 mt-4 fw-semibold formLabel" htmlFor="username">Username</label>
                <input type="text" placeholder="Username" onChange={(e: any) => setSignupData({ ...signupData, userName: e.target.value })} required className="textInputs" id="username" />

                <SRSelect placeholder="Email Address" options={["Accountant", "Customer"]} label="Select User Type" onChange={(e: any) => setSignupData({ ...signupData, type: e.target.value })} className="textInputs" id="type" />

                <label className="text-white mb-1 mt-4 fw-semibold formLabel" htmlFor="email">Email Address</label>
                <input type="email" placeholder="Email Address" onChange={(e: any) => setSignupData({ ...signupData, email: e.target.value })} required className="textInputs" id="email" />

                <label className="text-white mb-1 mt-4 fw-semibold formLabel" htmlFor="number">Phone Number</label>
                <input type="number" placeholder="Phone Number" onChange={(e: any) => setSignupData({ ...signupData, number: e.target.value })} required className="textInputs" id="number" />

                <label className="text-white mb-1 mt-4 fw-semibold formLabel" htmlFor="password">Password</label>
                <input type="password" placeholder="Password" onChange={(e: any) => setSignupData({ ...signupData, password: e.target.value })} required className="textInputs" id="password" />

                <div className="mt-4">
                    <SRButton type="submit" className="w-100" btnValue="Sign up" />
                </div>
                <div className="social flex-column align-items-center text-white">
                    Already have an account?
                    <Link to="/login" className="accountBtn text-decoration-none">Login</Link>
                </div>
            </form>
        </>
    )
}

export default Signup
