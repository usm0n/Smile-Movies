import React from "react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import Instagram from "@mui/icons-material/Instagram";
import Telegram from "@mui/icons-material/Telegram";
import Youtube from "@mui/icons-material/YouTube";
import { footerData } from "../../data/footerData";
import { language } from "../../utilities/defaultFunctions";

function Footer() {
  return (
    <section className="footer">
      <div className="container">
        <div className="footer-content">
          <img src={logo} className="footer-image" alt="Smile movies logo" />

          <div className="footer-links">
            {footerData.map((item) => {
              return (
                <Link to={item.path} key={item.id} className="footer-link">
                  {item[language].title}
                </Link>
              );
            })}
          </div>

          <div className="footer-social">
            <a
              href="https://www.instagram.com/smile_movie_uz?igsh=bTIwbHRvNzJ4OGs2"
              className="footer-social_link"
            >
              <Instagram />
            </a>
            <a href="https://t.me/smile_kino_uz" className="footer-social_link">
              <Telegram />
            </a>
            <a
              href="https://youtube.com/@smile_movies_org?si=EQR5mseECK3RI40Q"
              className="footer-social_link"
            >
              <Youtube />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
