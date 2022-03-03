import { Switch, Route } from "react-router-dom";
import Products from "./Products/Products";
import ProductHome from "../home/ProductHome";
import Register from "./auth/Register";
import Login from "./auth/Login";
import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import NotFound from "./support/NotFound";
import Cart from "./Cart/Cart";
import ProductDetail from "./Products/productDetail/ProductDetail";
import Admin from "./admin/Admin";
import History from "./auth/History";


export default function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged;
    const [isAdmin] = state.userAPI.isAdmin
    
    return (
        // <div className="main">
            <Switch>
                <Route path="/" exact component={ProductHome}/>
                <Route path="/products" exact component={Products} />
                <Route path="/product/:id" exact component={ProductDetail} />
                <Route path="/register" exact component={isLogged ? NotFound : Register}/>
                <Route path="/login" exact component={isLogged ? NotFound : Login}/>  
                <Route path="/history" exact component={isLogged ? History : NotFound}/>
                <Route path="/cart" exact component={Cart}/>
                <Route path="/admin" exact component={isAdmin ? Admin : NotFound}/>
                <Route path="/admin/:id" exact component={isAdmin ? Admin : NotFound}/> 
                
                <Route path="#" exact component={NotFound}/>
            </Switch>
        // </div>
    )
}
