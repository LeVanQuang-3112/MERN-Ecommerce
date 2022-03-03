// import Not_found from "./images/not_found.png"
import not_found from "./images/404 Seiten_Header.jpg"

export default function NotFound() {
    return (
        <div className="main container">
            <div className="not__found--container">
            <img src={not_found} alt="not found" className="notfound__image"/>
            </div>
        </div>
    )
}
