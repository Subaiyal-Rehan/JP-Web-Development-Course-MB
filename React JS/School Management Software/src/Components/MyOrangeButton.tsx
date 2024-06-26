import { Button } from 'react-bootstrap'

function MyOrangeButton(props:any) {
    const { btnValue, onClick, type } = props
  return ( <Button type={type} onClick={onClick} className='OrangeButton'>{btnValue}</Button> )
}

export default MyOrangeButton
