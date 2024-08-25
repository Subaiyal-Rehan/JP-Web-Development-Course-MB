import SRButton from '../Components/SRButton'
import errorImage from '../Images/404_Page.gif'
function NotfFound({from}:any) {
    return (
        <div style={{height: "90vh"}} className='d-flex justify-content-center align-items-center flex-column'>
            <img src={errorImage} width={500} alt="Page Not Found Image" />
            <div>
                {from ? (
                    <SRButton link="/dashboard" btnValue="Click here to go to Dashbaord" />
                ) : (
                    <SRButton link="/" btnValue="Click here to go to home" />
                )}
            </div>
        </div>
    )
}

export default NotfFound
