import FlashSale from "./images/flash_sale.jpg"
import BannerPink from "./images/banner_pink.png"
import Modal from "./images/moda.jpg"
import Bambaska from "./images/bambaska.jpg"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
    dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000
  };

export default function Banner() {
    return (
        <div className="container">
        <div className="banner__container">
            <div className="slide__show">
                <Slider {...settings}>
                    <div className="slide__item">
                        <img src={BannerPink} alt=""/>
                    </div>
                    <div className="slide__item">
                        <img src={Modal} alt=""/>
                    </div>
                    <div className="slide__item">
                        <img src={Bambaska} alt=""/>
                    </div>
                </Slider>
            </div>
            <div className="banner__content">
                <img src={FlashSale} alt="" className="banner__image"/>
            </div>
        </div>
    </div>
    )
}
