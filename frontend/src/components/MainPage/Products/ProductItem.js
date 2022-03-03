import {Button} from "@mui/material"
import { useContext } from "react"
import Swal from "sweetalert2"
import { GlobalState } from "../../../GlobalState"
import {Link} from "react-router-dom"

export default function ProductItem({product}) {
    const state = useContext(GlobalState)
    const addCart = state.userAPI.addCart
    const[isLogged] = state.userAPI.isLogged

    const addToCart =() => {
        if(isLogged) {
            addCart(product)
        }
        else {
            Swal.fire("Fail", "Please login to be able to shop", "error")
        }
    }

    return (
        <div className="product__container">
            {/* <div className="product__overlay"> */}
            <Link to={`/product/${product._id}`}>
            <div className="product__image--container">
                <img src={product.images.url} alt={product.title}/>
            </div>
            <div></div>
            <div className="product__content--container">
                <div className="product__content">
                     {
                         product.title.length > 20 
                         ? (<p>{product.title.substring(0, 26)}...</p>)
                         : (<p>{product.title}</p>)
                     }
                     <h3>Price: ${product.price}</h3>
                </div>
            </div>
            </Link>
            <div className="product__btn">
            <Button variant="contained" color="primary" className="addCart__btn"
            onClick={addToCart}>Add to cart</Button>
            </div>
            {/* </div> */}
        </div>
    )
}
