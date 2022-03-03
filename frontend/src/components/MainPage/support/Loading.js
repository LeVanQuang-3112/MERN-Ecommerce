// import {Spinner} from "react-bootstrap"
import Spinner from "./images/Spinner-1s-200px.gif"

export default function Loading() {
    return (
    //     <Spinner animation="border" role="status" className="loading container">
    //         <span className="visually-hidden"></span>
    //    </Spinner>
    <div className="loading">
       <img src={Spinner} alt="loading"/>
    </div>
    )
}

