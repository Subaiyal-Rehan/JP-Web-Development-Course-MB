function MyInput(props:any) {
  return (
    <input required value={props.value} className="fs-4" type="text" onChange={props.onChange} placeholder={props.placeholder} />
  )
}

export default MyInput
