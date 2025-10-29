import { useState } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";

const Navbar = () => {

    const [menu, setMenu] = useState('deals');

  return (
    <div className="navbar">
      <img src={assets.logo} alt="" className="logo" />
      <ul className="navbar-menu">
        <li onClick={()=>setMenu("home")} className={menu == "home" ? "active" : ""}>Home</li>
        <li onClick={()=>setMenu("deals")} className={menu == "deals" ? "active" : ""}>Deals</li>
        <li onClick={()=>setMenu("new-arrivals")} className={menu == "new-arrivals" ? "active" : ""}>New Arrivals</li>
        <li onClick={()=>setMenu("packages")} className={menu == "packages" ? "active" : ""}>Packages</li>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div>

        
          <button className="sign-up">Sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
