import { Button } from 'react-bootstrap'

function MyBlueButton(props:any) {
    const { btnValue, onClick } = props
  return ( <Button onClick={onClick} className='BlueButton'>{btnValue}</Button> )
}

export default MyBlueButton
