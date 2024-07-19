import { useNavigate } from "react-router-dom"
import MyButton from "../Components/MyButton"
import { useEffect, useState } from "react"
import { toastGreen, toastRed } from "../Components/My Toasts"
import { signinUser } from "../Config/FirebaseMethods"
import MyLoader from "../Components/MyLoader"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import app from "../Config/FirebaseConfig"

function Signup() {
    const [userData, setUserData] = useState<any>({})
    const [loader, setLoader] = useState<any>(true)
    const navigate = useNavigate()
    const auth = getAuth(app);

    useEffect(() => {
        const usera = auth.currentUser;
        if (usera) {
                toastGreen("User is already logged in.");
                navigate("/dashboard");
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                localStorage.setItem("USERID", uid);
                setLoader(false);
                navigate("/dashboard");
            } else {
                setLoader(false);
            }
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setLoader(true)
        signinUser(userData.email, userData.password)
            .then(() => {
                setLoader(false)
                toastGreen("User Successfully signed in.")
                setUserData({ email: "", password: "" });
                navigate("/dashboard")
            }).catch((err) => {
                setLoader(false)
                toastRed(err.message == "Firebase: Error (auth/invalid-credential)." ? "Invalid credentials provided." : err.massage)
            })
    }

    return (
        <>
            {loader ? <MyLoader /> : (
                <div style={{ height: "100vh" }} className="d-flex flex-column justify-content-center align-items-center main-w3layouts wrapper bg-darkBlue">
                    <h2 className="text-center display-4 text-white fw-semibold mb-4">Sign in</h2>
                    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.18)" }} className="container">
                        <div className="p-2 py-sm-5 p-sm-5">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="Email" className="text-white fs-5">Email</label>
                                <input id="Email" value={userData.email} className="textInputs textInputsWhite" type="email" placeholder="Email" required onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                                <label htmlFor="Password" className="text-white fs-5">Password</label>
                                <input id="Password" value={userData.password} className="textInputs textInputsWhite" type="password" placeholder="Password" required onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                                <div className="row px-2">
                                    <MyButton type="submit" textColor="black" bgColor="var(--orange)" hoverBgColor="#b87a00" className="px-4 py-3" btnValue="SIGNIN" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Signup