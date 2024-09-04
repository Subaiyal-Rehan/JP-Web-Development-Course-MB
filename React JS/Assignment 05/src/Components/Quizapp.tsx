import "./Quizapp.css";
import MyButton from "./MyButton";
import { useState } from "react";

export default function Quizapp() {
  var questions = [
    {
      question: "HTML Stands For _________",
      options: [
        "Anchor Text Language",
        "HTML",
        "Case Cading Style Sheet",
        "HyperText markup language",
      ],
      correctAns: "HyperText markup language",
    },
    {
      question: "CSS Stands For _________",
      options: [
        "Casecading Style Sheet",
        "Java",
        "Ram",
        "Hypertext markup language",
      ],
      correctAns: "Casecading Style Sheet",
    },
    {
      question: "JS Stands For _________",
      options: ["Java Style", "Java Script", "Script", "Script Src"],
      correctAns: "Java Script",
    },
    {
      question: "DOM Stands For _________",
      options: ["Document Object Model", "html", "Css", "Java"],
      correctAns: "Document Object Model",
    },
    {
      question: "RAM Stands For _________",
      options: ["Read Only Memory", "Dom", "Random Access Memory", "For Pc"],
      correctAns: "Random Access Memory",
    },
    {
      question: "ROM Stands For _________",
      options: [
        "Hyper Text Markup Language",
        "html",
        "HTml",
        "Read Only Memory",
      ],
      correctAns: "Read Only Memory",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [marks, setMarks] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [done, isDone] = useState<any>("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );

  const handleNext = () => {
    console.log(currentIndex, "INDEX");
    console.log(questions.length - 1, "QUESTION LENGTH");
    setIsDisabled(!isDisabled);
    setSelectedAnswerIndex(null);
    if (currentIndex >= questions.length - 1) {
      isDone("DONE");
      return;
    }
    setCurrentIndex(currentIndex + 1);
  };

  const getGradeMessage = () => {
    const percentage = (marks / questions.length) * 100;
    switch (true) {
      case percentage >= 90:
        return "A Grade - Excellent!";
      case percentage >= 80:
        return "B Grade - Very Good!";
      case percentage >= 70:
        return "C Grade - Good!";
      case percentage >= 60:
        return "D Grade - Acceptable!";
      case percentage >= 50:
        return "E Grade - Pass!";
      default:
        return "Fail - Better luck next time!";
    }
  };

  return (
    <>
      <div className="mainContainer d-flex bg-dark">
        <div className="questionContainer rounded-2 customContainer m-auto text-white p-4">
          <div className="d-flex justify-content-between fw-bold fs-4">
            <p>
              Questions: {currentIndex + 1}/{questions.length}
            </p>
            <p>Score: {marks}</p>
          </div>
          {done === "DONE" ? (
            <div>
              <div className="bg-light text-black fs-2 text-center p-2 my-4 rounded">
                Your Score is: <b>{marks}</b> <br /> <b>{getGradeMessage()}</b>
              </div>
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setMarks(0);
                  isDone("");
                }}
                className="nextBtn btn fs-5 m-auto d-block"
              >
                Reset
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-center fs-1">
                <span>Q{currentIndex + 1}.</span>{" "}
                <span>{questions[currentIndex].question}</span>
              </h2>
              <hr />
              <div className="row my-4 gap-1 d-flex justify-content-center">
                {questions[currentIndex].options.map(
                  (item: any, index: any) => {
                    return (
                      <>
                        <MyButton
                          onClick={() => {
                            setIsDisabled(true);
                            setSelectedAnswerIndex(index);
                            if (item == questions[currentIndex].correctAns) {
                              setMarks(marks + 1);
                            }
                          }}
                          key={index}
                          optionValue={item}
                          disabled={isDisabled}
                          className={
                            selectedAnswerIndex === index
                              ? item === questions[currentIndex].correctAns
                                ? "correctAns"
                                : "wrongAns"
                              : selectedAnswerIndex !== null &&
                                index ===
                                  questions[currentIndex].options.indexOf(
                                    questions[currentIndex].correctAns
                                  )
                              ? "correctAns"
                              : ""
                          }
                        ></MyButton>
                      </>
                    );
                  }
                )}
              </div>

              <div className="text-center">
                <button
                  disabled={!isDisabled}
                  className="nextBtn btn fs-5"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
