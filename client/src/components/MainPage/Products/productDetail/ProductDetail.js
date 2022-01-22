import { Button } from "@mui/material"
import { useEffect } from "react"
import { useContext, useState } from "react"
import { useParams } from "react-router"
import Swal from "sweetalert2"
import { GlobalState } from "../../../../GlobalState"

export default function ProductDetail() {
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [isLogged] = state.userAPI.isLogged
    const [productDetail, setProductDetail] = useState([])
    const params = useParams()

    useEffect(() => {
        if(params.id) {
            products.forEach((product) => {
                if(product._id === params.id) {
                    setProductDetail(product)
                }
            })
        }
    }, [params.id, products])

    const addToCart =() => {
        if(isLogged) {
            addCart(productDetail)
        }
        else {
            Swal.fire("Fail!", "Please login to be able to shop", "error")
        }
    }
    
    if(productDetail.length === 0) return null
    return (
        <div className="main">
        <div className="container__item container">
        <div className="product__detail--container">
            <div style={{margin: "auto", minWidth: "35%"}}>
            <div className="detail__image--container">
                 <img src={productDetail.images.url} alt={productDetail.title} className="detail__image"/>
            </div>
            </div>
            <p className="border__column"></p>
            <div className="detail__content--container">
                <div className="detail__content">
                <p>Category: <span className="product__detail--title">{productDetail.category}</span></p>
                <h2 className="product__detail--title">{productDetail.title}</h2>
                <h2>Price: ${productDetail.price}</h2>
                <p>{productDetail.description}</p>
                <p>{productDetail.content}</p>
                </div>
                <div>
                    <Button variant="contained" color="success" onClick={addToCart}
                    className="detail__button">Buy Now</Button>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}
