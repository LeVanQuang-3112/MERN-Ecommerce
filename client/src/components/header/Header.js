import React, {useState, useEffect, useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';
import Logo from "./images/logo.jpg"


export default function Header() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [search, setSearch] = state.productsAPI.search
    const [infor] = state.userAPI.infor
    const [category, setCategory] = state.productsAPI.category
    const [handleSearch, setHandleSearch] = useState('')
    const history = useHistory();

    const handleSubmit = (e) => {
      e.preventDefault()
      setSearch(handleSearch)
      setHandleSearch('')
      history.push("/products")
    }

    const logoutUser = async() => {
       await axios.get(`http://localhost:5000/user/logout`)
       localStorage.removeItem("Login")
       window.location.href = ('/')
    }

    useEffect(() => {
    }, [search, category])

    return (
    <header>
      <div className="container">
        <div className="header__top--container">
          <div className="logo__top">
            <Link to="/" onClick={() => setCategory("")}><img src={Logo} alt="" className="logo__image"/></Link>
          </div>
            <div className="languages">
              <p>Vi-VN | En-US</p>
            </div>
            <div className="navbar__container">
            <label htmlFor="menu__input"><i className="fas fa-bars menu__icon header__icon"></i></label>

            <input type="checkbox" name="" id="menu__input" className="menu__input" />      
            <label htmlFor="menu__input" className="nav__overlay"></label>
              <ul className="navbar__list">
                <li>
                  <div className="nav__header">
                  <div className="flexrow infor__icon--mobile">
                      <i className="far fa-user"></i>
                      <p>{infor[0]}</p>
                  </div>
                    <div>
                        <label htmlFor="menu__input"><i className="fas fa-times-circle"></i></label>
                    </div>
                  </div>
                </li>
                <li><Link to="/" onClick={() => setCategory("")}>HOME</Link></li>
                <li><Link to="/products">PRODUCTS</Link></li>
                {
                  isAdmin
                  ? <li><Link to="/admin">ADMIN</Link></li>
                  : <li><Link to="/history">HISTORY</Link></li>
                }
                {
                  isLogged
                  ? <li><Link to="/" onClick={logoutUser} style={{display: "flex", alignItems: "center"}}>LOGOUT&nbsp; <i className="fal fa-sign-out"></i></Link></li>
                  : <>
                  <li><Link to="/login">LOGIN</Link></li>
                  <li><Link to="/register">REGISTER</Link></li>
                  </>
                
                }
                
              </ul>
            </div>
        </div>

        <div className="header__bottom--container">
          <div className="logo__bottom">
          <Link to="/" onClick={() => setCategory("")}><img src={Logo} alt="" className="logo__image"/></Link>
          </div>
          <div className="heart__icon">
            <Link to="/products"><i className="fas fa-heart header__icon"></i></Link>
          </div>
          <div className="search__header--container">
              <form onSubmit={handleSubmit} className="search__form">
                <input name="" placeholder="Search for products..." className="search__input"
                value={handleSearch} onChange={(e) => setHandleSearch(e.target.value)}/>
                <button type="submit">
                <i className="fas fa-search"></i>&nbsp;
                <p>Search</p>
                </button>
              </form>
          </div>
          <div className="flexrow infor__icon">
          <i className="far fa-user header__icon"></i>
          <p>{infor[0]}</p>
          </div>
          <div className="flexrow cart" style={{marginRight: "8px"}}>
            <Link to="/cart">
              <i className="fas fa-shopping-cart header__icon"></i>
            </Link>
          <p>{cart.length}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

