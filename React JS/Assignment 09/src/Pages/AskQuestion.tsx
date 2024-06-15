import MyHeader from "../Layout/Header";
import { useState } from "react";
import { setData } from "../Config/FirebaseMethods";
import MyButton from "../Components/MyButton";
import { toastGreen, toastRed } from "./../Components/MyToasts"

function AskQuestion() {
  const [question, setquestion] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const handleSendData = async (e: any) => {
    e.preventDefault();
    let obj = {
      question: question,
      description: desc,
      name: name,
      email: email,
      views: 0,
      likes: 0,
      createdAt: JSON.stringify(new Date()),
      totalAns: [{ ans: 0 }],
    };
    try {
      await setData("Questions", obj);
      toastGreen("Your question was successfully added.")
      setquestion("");
      setDesc("");
    } catch (error) {
      console.log(error)
      toastRed("There was an error adding your question. Please try again.")
    }
  };

  return (
    <>
      <div className='HeroSection'>
        <div>
          <MyHeader />
          <div className="container px-0 padding-top">
            <div className="position-relative p-md-5 p-2 py-4 bg-body border border-dashed rounded-5">
              <h1 className="text-center display-2 fw-semibold">Ask a Question</h1>
              <hr />
              <div className="container mt-5">
                <form onSubmit={(e) => handleSendData(e)}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          placeholder="Ask Question"
                          required
                          value={name}
                          onChange={(e: any) => setName(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          placeholder="Ask Question"
                          required
                          value={email}
                          onChange={(e: any) => setEmail(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Email</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Ask Question"
                      required
                      value={question}
                      onChange={(e: any) => setquestion(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Ask Question</label>
                  </div>
                  <div className="input-group d-flex flex-column flex-md-row mt-2">
                    <span className="input-group-text fs-5 bg-orange text-white">
                      Description
                    </span>
                    <textarea
                      className="CustomText form-control"
                      aria-label="With textarea"
                      required
                      placeholder="Add a Description"
                      value={desc}
                      onChange={(e: any) => setDesc(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="text-center px-3 mt-2 row">
                    <MyButton btnValue="ASK" type="submit" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AskQuestion;
