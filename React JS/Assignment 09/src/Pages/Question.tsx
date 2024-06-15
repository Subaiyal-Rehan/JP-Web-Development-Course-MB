import { useParams } from "react-router-dom";
import MyHeader from "../Layout/Header";
import { getData, setData } from "../Config/FirebaseMethods";
import { useEffect, useState } from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { formatDistanceToNow } from "date-fns";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PersonIcon from "@mui/icons-material/Person";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from "@mui/material";
import MyButton from "../Components/MyButton";
import MyAnswer from "../Components/MyAnswer";
import { toastGreen, toastRed } from "../Components/MyToasts";

function Question() {
  const [data, setAllData] = useState<any>(null);
  const [timeAgo, setTimeAgo] = useState<string>("");
  const [loader, setLoader] = useState(false);
  const [currentViews, setCurrentViews] = useState<number>(0);
  const [currentLikes, setCurrentLikes] = useState<number>(0);
  const [answerObj, setAnsweroObj] = useState<any>({
    name: "",
    email: "",
    answer: "",
  });
  const params = useParams();

  useEffect(() => { }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        const response: any = await getData("Questions", params.id);
        if (response) {
          setAllData(response);
          const updatedViews = (response.views || 0) + 1;
          setData("Questions", { ...response, views: updatedViews }, params.id);
          setCurrentViews(updatedViews);
        }
        setLoader(false);
      } catch (error) {
        console.log(error);
        setLoader(false);
      }
    };
    fetchData();
  }, []);

  const handleLike = async (e: any) => {
    if (data) {
      const updatedLikes = (data.likes || 0) + 1;
      setData("Questions", { ...data, likes: updatedLikes }, params.id);
      setCurrentLikes(updatedLikes);
      const button = e.target.closest("button");
      if (button) {
        button.classList.add("pointer-events");
      }
    }
  };

  useEffect(() => {
    if (data) {
      const createdDate = new Date(JSON.parse(data.createdAt));
      const timeAgo1 = formatDistanceToNow(createdDate, { addSuffix: true });
      setTimeAgo(timeAgo1);
      setCurrentLikes(data.likes);
    }
  }, [data]);

  const handleSubmitAns = async (e: any) => {
    e.preventDefault();
    let obj = {
      ...data,
      totalAns: data.totalAns[0].ans
        ? [
          ...data.totalAns,
          { ans: answerObj, createdAt: JSON.stringify(new Date()) },
        ]
        : [{ ans: answerObj, createdAt: JSON.stringify(new Date()) }],
    };
    try {
      await setData("Questions", obj, params.id)
      setAllData(obj);
      toastGreen("Your answer was successfully submitted.")
    } catch (err) {
      console.log(err)
      toastRed("There was an error submitting your answer. Please try again")
    }
    setAnsweroObj({ name: "", email: "", answer: "" });
  };

  return (
    <>
      <div className='HeroSection'>
        <div>
          <MyHeader />
          <div className="container px-0 padding-top">
            <div className="position-relative p-md-5 p-2 py-4 bg-body border border-dashed rounded-5">
              <div className="text-center mb-3">
                <QuestionMarkIcon sx={{ fontSize: "60px" }} />
              </div>
              {loader ? (
                <div className="d-flex justify-content-center mt-2">
                  <div
                    className="spinner-border fs-2"
                    style={{ width: "5rem", height: "5rem" }}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : data ? (
                <>
                  <div>
                    <h1 className="mainHeading d-flex align-items-lg-end align-items-start justify-content-between flex-column flex-lg-row"><span className="fw-bold display-5 d-flex align-items-center gap-2"><AccountCircleIcon sx={{ fontSize: "52px" }} /> {data.name}</span><span className="fs-5 text-muted">{data.email}</span></h1>
                    <hr />
                    <h2 className="fs-2 mb-0 fw-semibold">Question:</h2>
                    <p className="fs-3 ms-4">{data.question}</p>
                    <hr />
                    <h2 className="mt-3 ms-1 fw-semibold">Description:</h2>
                    <p className="fs-5 ms-4">{data.description}</p>
                    <hr className="mt-5" />
                    <div className="d-flex flex-wrap flex-lg-nowrap gap-3 justify-content-around">
                      <span className="text-muted fs-6 d-flex flex-column align-items-center">
                        <ThumbUpIcon /> {currentLikes} Likes
                      </span>
                      <span className="text-muted fs-6 d-flex flex-column align-items-center">
                        <AccessTimeFilledIcon /> {timeAgo}
                      </span>
                      <span className="text-muted fs-6 d-flex flex-column align-items-center">
                        <ChatBubbleIcon />{" "}
                        {data.totalAns[0].ans ? data.totalAns.length : 0} Answers
                      </span>
                      <span className="text-muted fs-6 d-flex flex-column align-items-center">
                        <PersonIcon /> {currentViews} Views
                      </span>
                      <span className="text-muted fs-6 d-flex justify-content-center align-items-center gap-2">
                        <IconButton
                          onClick={(e: any) => handleLike(e)}
                          className="border"
                        >
                          <ThumbUpIcon />
                        </IconButton>
                        <IconButton
                          onClick={(e: any) =>
                            e.target.closest("button").classList.add("pointer-events")
                          }
                          className="border"
                        >
                          <ThumbDownIcon />
                        </IconButton>
                      </span>
                    </div>
                    <hr />
                  </div>
                </>
              ) : (
                <h1 className="text-center">Oops! Something went wrong.</h1>
              )}
            </div>

            {data && (
              <div className="position-relative p-md-5 p-2 py-4 mt-5 bg-body border border-dashed rounded-5">
                <div className="mt-">
                  <div className="text-center">
                    <QuestionAnswerIcon sx={{ fontSize: "60px" }} />
                  </div>
                  <h2 className="fw-bold display-5">
                    Answers: ({data.totalAns[0].ans ? data.totalAns.length : 0})
                  </h2>
                  <MyAnswer data={data.totalAns} />
                </div>
              </div>
            )}

            <div className="position-relative p-md-5 p-2 py-4 mt-5 bg-body border border-dashed rounded-5">
              <form onSubmit={(e) => handleSubmitAns(e)}>
                <h2 className="text-orange">Leave an answer</h2>
                <hr className="text-muted my-3 mb-4" />
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        value={answerObj.name}
                        type="text"
                        required
                        onChange={(e: any) =>
                          setAnsweroObj({
                            ...answerObj,
                            name: e.target.value,
                          })
                        }
                        className="form-control"
                        id="floatingInput"
                        placeholder="Enter Your Name"
                      />
                      <label htmlFor="floatingInput">
                        Enter Your Name
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        value={answerObj.email}
                        type="email"
                        required
                        onChange={(e: any) =>
                          setAnsweroObj({
                            ...answerObj,
                            email: e.target.value,
                          })
                        }
                        className="form-control"
                        id="floatingInput"
                        placeholder="Enter Your Email"
                      />
                      <label htmlFor="floatingInput">
                        Enter Your Email
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-floating">
                  <textarea
                    value={answerObj.answer}
                    required
                    className="form-control"
                    placeholder="Leave an answer here"
                    id="floatingTextarea2"
                    style={{ height: "100px" }}
                    onChange={(e: any) =>
                      setAnsweroObj({
                        ...answerObj,
                        answer: e.target.value,
                      })}
                  ></textarea>
                  <label htmlFor="floatingTextarea2">
                    Add an answer...
                  </label>
                </div>
                <div className="mt-3 px-3 row">
                  <MyButton type="submit" btnValue="Submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Question;
