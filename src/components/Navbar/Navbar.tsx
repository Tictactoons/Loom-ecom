import { useState } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({setShowLogin}) => {

    const [menu, setMenu] = useState('deals');

  return (
    <div className="navbar">
      <img src={assets.logo} alt="" className="logo" />
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu("home")} className={menu == "home" ? "active" : ""}>Home</Link>
        <a href="#explore-menu" onClick={()=>setMenu("deals")} className={menu == "deals" ? "active" : ""}>Menu</a>
        <a href="#app-download" onClick={()=>setMenu("new-arrivals")} className={menu == "new-arrivals" ? "active" : ""}>Download</a>
        <a href="#footer"  onClick={()=>setMenu("packages")} className={menu == "packages" ? "active" : ""}>Contact us</a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div>

        
          <button onClick={() => setShowLogin(true)} className="sign-up">Sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
