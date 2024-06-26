import { Button } from 'react-bootstrap'

function MyBlueButton(props:any) {
    const { btnValue, onClick, className } = props
  return ( <Button onClick={onClick} className={`BlueButton ${className}`}>{btnValue}</Button> )
}

export default MyBlueButton
