import { Link } from 'react-router-dom'
import MyButton from '../Components/MyButton'
import MyHeader from '../Layout/Header'
import { Button } from '@mui/material'

function Home() {
    return (
        <>
            <div className='HeroSection'>
                <div>
                    <MyHeader />
                    <div className="h-100 d-flex flex-column justify-content-center container px-0 text-white text-center text-md-start">
                        <h2 className='fw-light display-5'>Have Questions? We've Got Answers.</h2>
                        <h1 className='CustomText mb-5 w-75 w-md-100 fw-bolder display-3'>Join the Community of Knowledge Seekers and Sharers</h1>
                        <div className='d-flex flex-column flex-md-row gap-3'>
                            <Link to="/askQuestion"><MyButton btnValue="Ask a Question" /></Link>
                            <Link to="/allQuestions">
                                <Button
                                    sx={{
                                        backgroundColor: "tramsparent",
                                        fontSize: "17px",
                                        color: "#f19159",
                                        textTransform: "capitalize",
                                        border: "2px solid #f19159",
                                        "&:hover": { backgroundColor: "#f19159", border: "2px solid #f19159", color: "white" }
                                    }}
                                    className="MyButton py-2 px-4 rounded-pill"
                                >
                                    View all Questions
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home
