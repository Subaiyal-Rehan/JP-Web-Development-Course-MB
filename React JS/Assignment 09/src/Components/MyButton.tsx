import { Button } from "@mui/material";

function MyButton(props: any) {
  return (
    <Button
      sx={{
        backgroundColor: "#f19159",
        textTransform: "capitalize",
        fontSize: "17px",
        color: "white",
        border: "2px solid transparent",
        "&:hover": {backgroundColor: "transparent", border: "2px solid #f19159", color: "#f19159"}
      }}
      className="MyButton py-2 px-4 rounded-pill"
      onClick={props.onClick}
      type={props.type}
    >
      {props.btnValue}
    </Button>
  );
}

export default MyButton;
