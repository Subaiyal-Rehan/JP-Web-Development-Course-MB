import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import app from "./FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { toastRed } from "../Components/My Toasts";
import SRLoader from "../Components/SRLoader";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./Redux/Slices/UserSlice";
import { getData } from "./FirebaseMethods";

function Protected({ Component }: any) {
    const [loader, setLoader] = useState<any>(true)
    const navigate = useNavigate()
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const userData = useSelector((state:any)=>state.user)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                getData("Users", uid).then((res: any) => {
                    console.log(res)
                    dispatch(setUser({
                        username: res.Username,
                        uid: res.id,
                        email: res.Email,
                        password: res.Password,
                    }));
                    setLoader(false);
                }).catch(() => {
                    toastRed("Something went wrong. Please try again.")
                    setLoader(false);
                })
            } else {
                if (userData.Uid == "") {
                    toastRed("User is not logged in.");
                }
                navigate("/");
            }
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    return (
        <>
            {loader ? <SRLoader /> : <Component />}
        </>
    )
}

export default Protected