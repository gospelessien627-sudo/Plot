import React, {useState} from 'react'
import img1 from "../assets/img1.jpg"
import "./Home.css"
import img5 from "../assets/img5.jpg"
import img3 from "../assets/img3.jpg"
import img4 from "../assets/img4.jpg"
// import img5 from "../assets/img5.jpg"
import img6 from "../assets/img6.jpg"
import img2 from "../assets/img2.jpg"
import img7 from "../assets/img7.jpg"
import img8 from "../assets/img8.jpg"
import img9 from "../assets/img9.jpg"
import img10 from "../assets/img10.jpg"
import img11 from "../assets/img11.jpg"
import img12 from "../assets/img12.jpg"
import img13 from "../assets/img13.jpg"
import {FaStar, FaFacebook, FaInstagram, FaPinterest, FaChevronDown, FaCamera, FaBookmark, FaMap, FaLandmark} from "react-icons/fa"
import {MdCall, MdEmail, MdLocationOn } from "react-icons/md"
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Home = () => {


    const [isopen, setIsOpen] = useState(false);

    const toggleMenu = () =>{
        setIsOpen(!isopen);
    }
 

  return (
    <div className='ret'>

        
    <div className="blo">

  <h1>Skywings</h1>

  {/* DESKTOP MENU */}
  <ul className="desktop-menu">
    <li><a href="#home">HOME</a></li>
    <li><a href="#about">ABOUT</a></li>
    <li><a href="#tour">TOUR</a></li>
    <li><a href="#package">PACKAGE</a></li>
    <li><a href="#contact">CONTACT</a></li>
  </ul>

  <button className="btn">
    BOOK TRIP
  </button>

  {/* MOBILE MENU BUTTON */}
  <button
    className="menu-btn"
    onClick={toggleMenu}
    // aria-label="Open menu"
  >
    <FaChevronDown />
  </button>

  {/* MOBILE DROPDOWN */}
  <ul className={isopen ? "nav-menu active" : "nav-menu"}>
    <li>
      <a href="#home" onClick={() => setIsOpen(false)}>HOME</a>
    </li>

    <li>
      <a href="#about" onClick={() => setIsOpen(false)}>ABOUT</a>
    </li>

    <li>
      <a href="#tour" onClick={() => setIsOpen(false)}>TOUR</a>
    </li>

    <li>
      <a href="#package" onClick={() => setIsOpen(false)}>PACKAGE</a>
    </li>

    <li>
      <a href="#contact" onClick={() => setIsOpen(false)}>CONTACT</a>
    </li>
  </ul>

</div>
    <div className="pla">
        <div className="ll">
            <h3>ELEVATE YOUR TRAVEL JOURNEY</h3>
            <h1>Experience The <br /> Magic Of Flight</h1>
            <button className='oo'>Book A Trip Now</button>
        </div>
        <div className="fli">
                <img src={img5} />
        </div>
    </div>
    <div className="hh">
    <div className="ee">
        <div className="glo">
            <h1>Popular Destination</h1>
            <p>Discover the most Loved Destination Around the Globe </p>
        </div>
    </div>
    <div className="fol">
    <div className="bb">
        <img src={img3} alt="" />
        <div className="ii">
        <div className="lo">
            <h3>Tradition and Futurism</h3>
            <p>Mountains</p>
        </div>
        <div className="pp">
            <span className='ov'><FaStar className='vv'/> 4.7</span>
            </div>
        </div>

    </div>
    <div className="bb">
        <img src={img4} alt="" />
        <div className="ii">
        <div className="lo">
            <h3>Island of the Gods</h3>
            <p>Mountains</p>
        </div>
        <div className="pp">
            <span className='ow'><FaStar className='vv'/> 4.5</span>
            </div>
        </div>

    </div>
    <div className="bb">
        <img src={img5} alt="" />
        <div className="ii">
        <div className="lo">
            <h3>Tradition and Futurism</h3>
            <p>Mountains</p>
        </div>
        <div className="pp">
            <span className='ou'><FaStar className='vv'/> 4.8</span>
            </div>
        </div>

    </div>
    </div>
    </div>
    <div className="look">
        <div className="lop">
            <h2>Journey To The Sky Made Simple</h2>
            <p>Effotless Planning For Your Next Adventure</p>
        </div>
        <div className="ww">
             <div className="gos">
            <span><FaBookmark /></span>
            <p>Seamless Booking Process</p>
             
             <div className="custom">
            <h4>Customized Plans Just For You</h4>

            <h5>
                Enjoy personalized travel plans designed to match your
                preference and interests, whether you seek adventure or
                cultural immersion, our tailored itineraries ensure your
                journey is uniquely yours.
            </h5>
        </div>
        </div>
        <div className="gos">
            <span><FaBookmark /></span>
            <p>Seamless Booking Process</p>
             
             <div className="custom">
            <h4>Customized Plans Just For You</h4>

            <h5>
                Enjoy personalized travel plans designed to match your
                preference and interests, whether you seek adventure or
                cultural immersion, our tailored itineraries ensure your
                journey is uniquely yours.
            </h5>
        </div>
        </div>

        <div className="gos">
        <span><FaMap /></span>
        <p>Tailored Itineraries</p>

        <div className="custom">
            <h4>Customized Plans Just For You</h4>

            <h5>
                Enjoy personalized travel plans designed to match your
                preference and interests, whether you seek adventure or
                cultural immersion, our tailored itineraries ensure your
                journey is uniquely yours.
            </h5>
        </div>
        </div>
        
            
        </div>
    </div>
    <div className="love">
        <div className="boy">
            <img src={img1} alt="" className='by' />
        </div>
        <div className="blow">
            <h2>UNLEASH WANDERLUST WITH SKYWINGS</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, dolorum possimus animi molestiae, dicta culpa aliquam quas, nostrum dolore et quia eos amet commodi saepe atque mollitia eligendi ad recusandae.
            Recusandae totam repellendus quo doloribus adipisci, eaque iure in quos deserunt magni tenetur debitis ea dicta nostrum. Quaerat, enim a quasi, debitis labore quos natus repellendus ut nostrum voluptates laboriosam.
            Aperiam ad ratione, distinctio esse accusantium impedit laboriosam sunt odio nostrum numquam excepturi vel ipsum fugit hic illum a, voluptatum accusamus voluptates nobis fugiat? Perferendis dolorum aspernatur delectus fugit voluptatem.</p>
            <button className='tre'> BOOK A FLIGHT NOW </button>
        </div>
    </div>
    
    <div className="fot">
        <div className="toot">
            <h4>10+</h4>
            <p>Years Experience</p>
        </div>
        <div className="toot">
            <h4>12K</h4>
            <p>Happy Clients</p>
        </div>
        <div className="toot">
            <h4>4.8</h4>
            <p>Overall Ratings</p>
        </div>
    </div>
    <div className="flot">
        <div className="fret">
            <h2>Discover The World From Above </h2>
            <p>Experience Breathtaking Views and Unique Perspective</p>
        </div>
        <div className="float">
            <div className="did">
                <span><FaCamera/></span>
                <h4>Aerial <br />Cityscapes</h4>
                <p>Witness the architectural marvels and <br />busting streets from birds-eye view, offering <br /> a unique Perspective</p>
            </div>
            <div className="did">
                <span><FaCamera/></span>
                <h4>Aerial <br />Cityscapes</h4>
                <p>Witness the architectural marvels and <br />busting streets from birds-eye view, offering <br /> a unique Perspective</p>
            </div>
            <div className="did">
                <span><FaCamera className='ddd'/></span>
                <h4>Aerial <br />Cityscapes</h4>
                <p>Witness the architectural marvels and <br />busting streets from birds-eye view, offering <br /> a unique Perspective</p>
            </div>
        </div>
    </div>
    <div className="floh">
        <div className="peace">
                <h3>Loved By Over Thousand Travelers</h3>
                <p>Discover the stories of wanderlust and cherished memories through the eyes of <br /> our valued clients</p>
        </div>
        <Swiper
    className="mon"
    modules={[Navigation, Pagination, Autoplay]}
    spaceBetween={20}
    slidesPerView={4}
    // navigation
    pagination={{ clickable: true }}
    autoplay={{
        delay: 2000,
        disableOnInteraction: false,
    }}
    breakpoints={{
        480: {
            slidesPerView: 1,
        },

        768: {
            slidesPerView: 2,
        },

        1024: {
            slidesPerView: 3,
        },

        1200: {
            slidesPerView: 4,
        },
    }}
>
    <SwiperSlide>
        <div className="all">
        <div className='qep'>
            <span><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/></span>
        </div>
        <div className='tui'>
            <h5>
                Skywings has completely transformed my <br /> travel experience from finding hidden gems <br /> in building cities to discovering serene <br /> retreats off the beaten path, every detail was <br /> thoughtfully arranged. I cant recommend  <br />Skywings enough, for annyone looking to <br /> elevate their travel experience 
            </h5>
        </div>
        <div className="nol">
        <div className="loter">
            <img src={img3} alt="Destination 1" />
            </div>
            <div className='fwe'>
                <p className='iii'>Rose </p> 
                {/* <span>Travel Blogger</span> */}
            </div>
        </div>
        </div>

    </SwiperSlide>
    
    <SwiperSlide>
        <div className="all">
        <div className='qep'>
            <span><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/></span>
        </div>
        <div className='tui'>
            <h5>
                Skywings has completely transformed my <br /> travel experience from finding hidden gems <br /> in building cities to discovering serene <br /> retreats off the beaten path, every detail was <br /> thoughtfully arranged. I cant recommend  <br />Skywings enough, for annyone looking to <br /> elevate their travel experience 
            </h5>
        </div>
        <div className="nol">
        <div className="loter">
            <img src={img8} alt="Destination 1" />
            </div>
            <div className='fwe'>
                <p className='iii'>Kate </p> 
                {/* <span>Travel Blogger</span> */}
            </div>
        </div>
        </div>    
    </SwiperSlide>

    <SwiperSlide>

        <div className="all">
        <div className='qep'>
            <span><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/></span>
        </div>
        <div className='tui'>
            <h5>
                Skywings has completely transformed my <br /> travel experience from finding hidden gems <br /> in building cities to discovering serene <br /> retreats off the beaten path, every detail was <br /> thoughtfully arranged. I cant recommend  <br />Skywings enough, for annyone looking to <br /> elevate their travel experience 
            </h5>
        </div>
        <div className="nol">
        <div className="loter">
            <img src={img9} alt="Destination 1" />
            </div>
            <div className='fwe'>
                <p className='iii'>Trust </p> 
                {/* <span>Travel Blogger</span> */}
            </div>
        </div>
        </div>    
    
    </SwiperSlide>

    <SwiperSlide>
        <div className="all">
        <div className='qep'>
            <span><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/></span>
        </div>
        <div className='tui'>
            <h5>
                Skywings has completely transformed my <br /> travel experience from finding hidden gems <br /> in building cities to discovering serene <br /> retreats off the beaten path, every detail was <br /> thoughtfully arranged. I cant recommend  <br />Skywings enough, for annyone looking to <br /> elevate their travel experience 
            </h5>
        </div>
        <div className="nol">
        <div className="loter">
            <img src={img10} alt="Destination 1" />
            </div>
            <div className='fwe'>
                <p className='iii'>Glory </p> 
                {/* <span>Travel Blogger</span> */}
            </div>
        </div>
        </div>
    </SwiperSlide>
    <SwiperSlide>
        <div className="all">
        <div className='qep'>
            <span><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/></span>
        </div>
        <div className='tui'>
            <h5>
                Skywings has completely transformed my <br /> travel experience from finding hidden gems <br /> in building cities to discovering serene <br /> retreats off the beaten path, every detail was <br /> thoughtfully arranged. I cant recommend  <br />Skywings enough, for annyone looking to <br /> elevate their travel experience 
            </h5>
        </div>
        <div className="nol">
        <div className="loter">
            <img src={img11} alt="Destination 1" />
            </div>
            <div className='fwe'>
                <p className='iii'>Best </p> 
                {/* <span>Travel Blogger</span> */}
            </div>
        </div>
        </div>
    </SwiperSlide>
    <SwiperSlide>
        <div className="all">
        <div className='qep'>
            <span><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/></span>
        </div>
        <div className='tui'>
            <h5>
                Skywings has completely transformed my <br /> travel experience from finding hidden gems <br /> in building cities to discovering serene <br /> retreats off the beaten path, every detail was <br /> thoughtfully arranged. I cant recommend  <br />Skywings enough, for annyone looking to <br /> elevate their travel experience 
            </h5>
        </div>
        <div className="nol">
        <div className="loter">
            <img src={img12} alt="Destination 1" />
            </div>
            <div className='fwe'>
                <p className='iii'>Great </p> 
                {/* <span>Travel Blogger</span> */}
            </div>
        </div>
        </div>
    </SwiperSlide>
    <SwiperSlide>
        <div className="all">
        <div className='qep'>
            <span><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/><FaStar className='prop'/></span>
        </div>
        <div className='tui'>
            <h5>
                Skywings has completely transformed my <br /> travel experience from finding hidden gems <br /> in building cities to discovering serene <br /> retreats off the beaten path, every detail was <br /> thoughtfully arranged. I cant recommend  <br />Skywings enough, for annyone looking to <br /> elevate their travel experience 
            </h5>
        </div>
        <div className="nol">
        <div className="loter">
            <img src={img13} alt="Destination 1" />
            </div>
            <div className='fwe'>
                <p className='iii'> John </p> 
                {/* <span>Travel Blogger</span> */}
            </div>
        </div>
        </div>
    </SwiperSlide>

    </Swiper>
    </div>

    <footer className="lwa">
        <div className="pqi">
            <h3>Skywings</h3>
            <p>Explore the world with ease and <br /> excitement through our comprehensive <br /> travel platform. Your journey begins <br /> here, where seamless Planning meets <br /> unforgettable experiences</p>
            <div className="sdf">
            <span className='frt'><FaFacebook className='sp'/> </span> <br />
            <span className='frt'><FaInstagram className='sp'/></span> <br />
            <span className='frt'><FaPinterest className='sp'/></span>
            </div>
        </div>
        <div className="gloy">
            <h3>Quick Links</h3>
            <ul>
                <li><a href="">Home</a></li>
                <li><a href="">Flights</a></li>
                <li><a href="">Hotels</a></li>
                <li><a href="">Cruise</a></li>
            </ul>
        </div>
        <div className="ppl">
            <h3>Contact Us</h3>
            <span  className='io'><MdCall className='oi'/>08043523145</span> <br />
            <span className='io'><MdEmail className='kmn'/>info@Skywings</span> <br />
            <span className='io'><MdLocationOn />Edo state, Nigeria</span> 
        </div>
        <div className="xx">
            <h3>Subscribe</h3>
            <input type="text" placeholder='Enter Your Email'/> <br />
            <button>Subscribe</button>
        </div>
            
    </footer>
    <div className="dqwe">
        <span className='del'>Copyright &copy 2026 Web Design Mastery. All rights reserved </span>
            </div>
    </div>
  )
}

export default Home
