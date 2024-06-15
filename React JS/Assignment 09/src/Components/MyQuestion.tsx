import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import { formatDistanceToNow } from "date-fns";

function MyQuestion(props: any) {
  const navigate = useNavigate();

  return (
    <>
      <div className="container px-0 mx-auto row row-gap-4">
        {props.data && Array.isArray(Object.values(props.data))
          ? Object.values(props.data).map((item: any, index: any) => {
            const createdDate = new Date(JSON.parse(item.createdAt));
            const timeAgo = formatDistanceToNow(createdDate, {
              addSuffix: true,
            });
            return (
              <div key={index} className="col-lg-6">
                <Accordion className="AccordionCustom">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Box className="d-flex flex-column w-100">
                      <Box className="d-flex justify-content-between align-items-center w-100">
                        <Box className="d-flex flex-column">
                          <span className="fs-4">{item.question}</span>{" "}
                          <hr className="d-block d-sm-none" />
                          <div className="d-flex align-items-center flex-wrap flex-sm-nowrap gap-2 text-muted">
                            <span>
                              Total Answers:{" "}
                              {item.totalAns[0].ans ? item.totalAns.length : 0}
                            </span>
                            <span className="d-none d-sm-block">|</span>
                            <span>Views: {item.views}</span>
                            <span className="d-none d-sm-block">|</span>
                            <span>Likes: {item.likes}</span>
                          </div>
                        </Box>
                        <Box
                          className="me-2 d-flex flex-column align-items-end d-none d-md-block"
                        >
                          <div className="">
                            <MyButton onClick={() => navigate(`/question/${item.id}`)} btnValue="View Details" />
                          </div>
                          <span
                            className="text-muted me-2"
                            style={{ fontSize: "14px" }}
                          >
                            {timeAgo}
                          </span>
                        </Box>
                      </Box>
                      <Box className="text-center d-block d-md-none">
                        <div className="row ps-4 mt-3">
                          <MyButton onClick={() => navigate(`/question/${item.id}`)} btnValue="View Details" />
                        </div>
                        <span
                            className="text-muted me-2"
                            style={{ fontSize: "14px" }}
                          >
                            {timeAgo}
                          </span>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    {item.totalAns[0].ans ?
                      (<> {item.totalAns.slice(0, 5).map((ansItem: any, index: any) => {
                        return (
                          <div key={index}>
                            <span className="">
                              <span className="fw-semibold">Answer {index + 1}:</span> {ansItem.ans.answer}
                            </span>
                            <hr />
                          </div>
                        );
                      })}
                        {item.totalAns.length > 5 && (
                          <div>
                            <span onClick={() => navigate(`/question/${item.id}`)} className="text-primary text-decoration-underline cursor-pointer">Click to see more</span>
                          </div>
                        )}
                      </>)
                      : "No answers on this question yet!"}
                  </AccordionDetails>
                </Accordion>
              </div>
            );
          })
          : props.data && (null)}
      </div>
    </>
  );
}

export default MyQuestion;
