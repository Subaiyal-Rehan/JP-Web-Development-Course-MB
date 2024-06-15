import { formatDistanceToNow } from "date-fns";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function MyAnswer(props: any) {
  const { data } = props;
  return (
    <>
      <div>
        {data[0].ans ? data.map((item: any, index: any) => {
          const createdDate = new Date(JSON.parse(item.createdAt));
          const timeAgo = formatDistanceToNow(createdDate, {
            addSuffix: true,
          });
          return (
            <div key={index} className="mt-4 bg-body-tertiary">
              <hr />
              <div className="px-3">
                <div className="d-flex align-items-md-end align-items-start justify-content-between flex-column flex-md-row justify-content-between">
                  <h2 className="fs-3 d-flex align-items-center justify-content-start gap-2"><AccountCircleIcon /> {item.ans.name}</h2>
                  <h3 className="fs-7 text-muted d-flex align-items-center gap-1 text-end"><AccessTimeFilledIcon sx={{ fontSize: "1rem" }} /> {timeAgo}</h3>
                </div>
                <p className="fs-5 ms-4">{item.ans.answer}</p>
              </div>
              <hr />
            </div>
          );
        }) : <h2 className="fs-3 mt-3">No answers on this question yet!</h2>}
      </div>
    </>
  );
}

export default MyAnswer;
