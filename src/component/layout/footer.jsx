import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import "./head.css"


const Footer = () => {
    const { t, toggleLanguage } = useContext(LanguageContext);
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="fw-bold">
            {" "}
            Breast Care <span>AI</span>
          </h3>
          <p>{t("footer.p")}</p>
        </div>

        <div className="footer-section">
          <h4>{t("footer.links")}</h4>
          <ul>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "foot-link active" : "foot-link"
                }
                to="/"
              >
                {t("nav.home")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "foot-link active" : "foot-link"
                }
                to="/diagnosis"
              >
                {t("nav.diagnosis")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "foot-link active" : "foot-link"
                }
                to="/contact"
              >
                {t("nav.contact")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "foot-link active" : "foot-link"
                }
                to="/chat"
              >
                {t("nav.chat")}
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "foot-link active" : "foot-link"
                }
                to="/settings"
              >
                {t("nav.settings")}
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>{t("footer.follow")}</h4>
          <div className="social-icons">
            <a href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} BreastCareAI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;