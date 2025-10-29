import { assets } from "../../assets/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
            atque. Neque quaerat laboriosam quia officia quae a accusamus
            corrupti dolorum in, voluptatibus nulla. At, laborum. Repellendus
            quisquam excepturi unde recusandae.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
            <h2>
                COMPANY
            </h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>
                GET IN TOUCH
            </h2>
            <ul>
                <li>+234-803-8250-579</li>
                <li>teefx26@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        © 2025 Tomato.com. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
