import Visa from "./images/visa.png"
import Amazon from "./images/amazon.png"
import MasterCard from "./images/master-card.png"
import Discover from "./images/discover.png"
import Paypal from "./images/paypal.png"
import AmericanExpress from "./images/american-express.png"
import Email__image from "./images/email__image.png"
import {Link} from "react-router-dom"

export default function Footer() {
    return (
        <footer>
            <div className="follow__container">
                <h2>Follow</h2>
                <div>
                    <ul className="follow__list">
                        <li className="follow__icon"><i className="fab fa-facebook"></i></li>
                        <li className="follow__icon"><i className="fab fa-twitter"></i></li>
                        <li className="follow__icon"><i className="fab fa-invision"></i></li>
                        <li className="follow__icon"><i className="fab fa-instagram"></i></li>
                        <li className="follow__icon"><i className="fab fa-google-plus"></i></li>
                    </ul>
                </div>
                <div className="category__list--container">
                    <ul>
                        <li><Link to="/products"><h3>MEN</h3></Link></li>
                        <li><Link to="/products">All men</Link></li>
                        <li><Link to="/products">Shorts</Link></li>
                        <li><Link to="/products">Shirts</Link></li>
                        <li><Link to="/products">BoardShirts</Link></li>
                        <li><Link to="/products">Jackets</Link></li>
                    </ul>
                    <ul>
                        <li><Link to="/products"><h3>WOMAN</h3></Link></li>
                        <li><Link to="/products">All men</Link></li>
                        <li><Link to="/products">Shorts</Link></li>
                        <li><Link to="/products">Shirts</Link></li>
                        <li><Link to="/products">BoardShirts</Link></li>
                        <li><Link to="/products">Jackets</Link></li>
                    </ul>
                    <ul>
                        <li><Link to="/products"><h3>ABOUT</h3></Link></li>
                        <li><Link to="/products">All men</Link></li>
                        <li><Link to="/products">Shorts</Link></li>
                        <li><Link to="/products">Shirts</Link></li>
                        <li><Link to="/products">BoardShirts</Link></li>
                        <li><Link to="/products">Jackets</Link></li>
                    </ul>
                </div>

            </div>

            <div className="infor__container">
                  <div className="infor__title">
                      <h3>NEW PRODUCTS</h3>
                      <h3>DISCOUNTS</h3>
                      <h3>CONTACT US</h3>
                  </div>
                  <div>
                      <p style={{fontSize: "1.7rem"}}>Subscribe to get the latest on sales, new releases and more ...</p>
                  </div>
                  <div className="email__container">
                      <div>
                          <img src={Email__image} alt="email" className="email__image"/>
                      </div>
                      <div className="email__content">
                      <input placeholder="Your email address..." type="email" name="email" className="email__input"/>
                      <button>SUBSCRIBE</button>
                      </div>
                  </div>
                  <div>
                      <h2 style={{padding: "1.3rem"}}>Supported payment systems</h2>
                       <ul className="payment__list">
                           <li><img src={Visa} alt=""/></li>
                           <li><img src={Amazon} alt=""/></li>
                           <li><img src={MasterCard} alt=""/></li>
                           <li><img src={Discover} alt=""/></li>
                           <li><img src={Paypal} alt=""/></li>
                           <li><img src={AmericanExpress} alt=""/></li>
                       </ul>
                  </div>
            </div>
        </footer>
    )
}
