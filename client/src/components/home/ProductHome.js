import { useContext } from "react"
import { GlobalState } from "../../GlobalState"
import Banner from "../banner/Banner"
import ProductItem from "../MainPage/Products/ProductItem"
import {Button} from "@mui/material"
import Loading from "../MainPage/support/Loading"
import Advertise from "../ads/ads"

export default function ProductHome() {
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [result] = state.productsAPI.result
    const [page, setPage] = state.productsAPI.page
        // if(products.length ===0) return null   
        console.log(products)
    return (
        <div className="main">
        <div className="container">
            <div>
                <Banner/>
            </div>
            <div className="container__item">
            {
                products.length >0 
                ? (<div className="product__home--container">
                    {
                        products.map((product) => {
                            return (
                                <ProductItem key={product._id} product={product}/>
                            )
                        })
                    }
                </div>)  
                : (<Loading/>)          }
            <div className="button__seemore">
                {
                   result.length > 0 
                   ? ""
                   : <Button variant="contained" color="success"
                   onClick={() => setPage(page+1)}>See more</Button>
                }
            </div>
            </div>
            <div>
                <Advertise/>
            </div>
        </div>
        </div>
    )
}
