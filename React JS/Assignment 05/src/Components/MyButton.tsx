import "./Quizapp.css";

export default function MyButton(props:any) {
  return (
    <button onClick={props.onClick} disabled={props.disabled}  className={props.className?`optBtn btn btn-light fs-4 py-2 col-md-11 m-2 border-custom ${props.className}`:"optBtn btn btn-light fs-4 py-2 col-md-11 m-2 border-custom"}>{props.optionValue}</button>
  )
}
