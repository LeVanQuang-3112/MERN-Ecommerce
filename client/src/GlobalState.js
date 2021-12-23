import { createContext, useState, useEffect } from "react";
import ProductsAPI from "./API/productsAPI";
import axios from "axios"
import CategoriesAPI from "./API/CategoriesAPI";
import UserAPI from "./API/UserAPI";

export const GlobalState = createContext()

export const DataProvider = ({children}) => {
     const [token, setToken] = useState(false)

     useEffect(() => {
        const login = localStorage.getItem('Login')
        if(login){
            const refreshToken = async () =>{
                const response = await axios.get('/user/refresh_token')
                setToken(response.data.accesstoken)
    
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    },[])
    
    const statedData = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        categoriesAPI: CategoriesAPI(token),
        userAPI: UserAPI(token)
    }

    return (
        <GlobalState.Provider value={statedData}>
            {children}
        </GlobalState.Provider>
    )
}