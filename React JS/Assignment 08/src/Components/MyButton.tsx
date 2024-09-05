import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function MyWhiteButton(props:any) {
  return (
    <Button
      size="large"
      sx={{
        backgroundColor: "white",
        padding: "12px 28px",
        letterSpacing:"4px",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: "white",
          transform: "translateY(-10px)",
        },
      }}
      variant="contained"
    >
      <Link className="text-black text-decoration-none" to="/Products">{props.btnValue}</Link>
    </Button>
  );
}

export default MyWhiteButton;
