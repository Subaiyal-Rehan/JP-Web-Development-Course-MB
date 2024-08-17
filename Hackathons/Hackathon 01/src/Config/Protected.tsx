import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import app from "./FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { toastRed } from "../Components/My Toasts";
import SRLoader from "../Components/SRLoader";
import { useDispatch } from "react-redux";
import { setUser } from "./Redux/Slices/UserSlice";
import { getData } from "./FirebaseMethods";

function Protected({ Component }: any) {
    const [isInitialCheck, setIsInitialCheck] = useState(true);
    const [loader, setLoader] = useState<any>(true)
    const navigate = useNavigate()
    const auth = getAuth(app);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                getData("Users", uid)
                    .then((res: any) => {
                        dispatch(setUser({
                            username: res.Username,
                            uid: res.id,
                            email: res.Email,
                            password: res.Password,
                        }));
                    })
                    .catch(() => {
                        toastRed("Something went wrong. Please try again.");
                    })
                    .finally(() => {
                        setLoader(false);
                    });
            } else {
                setLoader(false);
                if (isInitialCheck) {
                    toastRed("User is not logged in.");
                }
                navigate("/");
            }
            setIsInitialCheck(false);
        });

        return () => unsubscribe();
    }, [auth, navigate, dispatch, isInitialCheck]);

    return (
        <>
            {loader ? <SRLoader /> : <Component />}
        </>
    )
}

export default Protected