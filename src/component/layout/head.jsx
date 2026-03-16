import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import { ThemeContext } from "../../context/ThemeContext";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import PButtonLink from "../ui/button";
import {PButton} from "../ui/button";
import { useAuth } from "../../pages/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import User from "../../assets/images/user.png";
import "./head.css"
// import {Sure} from "../ui/alert";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Head() {
    const location = useLocation();

    // const [showModal, setShowModal] = useState(false);

    const { t, toggleLanguage } = useContext(LanguageContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const { email, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
    if (window.confirm(t("settings.confirm_logout"))) {
      logout();
      navigate("/login");
    }
  };

    useEffect(() => {
      const navbar = document.getElementById("navbarSupportedContent");
      if (navbar && navbar.classList.contains("show")) {
        navbar.classList.remove("show");
      }
    }, [location]);
    
    const handleProfile = () => {
    navigate("/settings");
    };
  return (
    <nav className="navbar navbar-expand-sm rounded-4 mt-2 shadow-sm">
      <div className="container-fluid ps-4 pe-4">
        <div className="div-logo">
          <img
            src={theme == "dark" ? "dark_logo.png" : "light_logo.png"}
            alt=""
            className="nav-logo"
          />
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-label="Toggle navigation"
          aria-expanded="false"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto fs-5">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/"
              >
                <i className="fa-solid fa-house"> </i>
                <span>{t("nav.home")}</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/diagnosis"
              >
                <i className="fa-solid fa-person-dots-from-line"> </i>
                <span>{t("nav.diagnosis")}</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/contact"
              >
                <i className="fa-solid fa-message"> </i>
                <span>{t("nav.contact")}</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/chat"
              >
                <i className="fa-solid fa-robot"> </i>
                <span>{t("nav.chat")}</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/settings"
              >
                <i className="fa-solid fa-gear"> </i>
                <span>{t("nav.settings")}</span>
              </NavLink>
            </li>
          </ul>
          <div className="d-flex gap-2">
            {email ? (
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={User}
                    alt="User"
                    className="rounded-circle ms-2"
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                  />
                </button>
                <ul
                  className={`dropdown-menu p-3 mt-3 ${t("settings.lang") === "العربية" ? "dropdown-menu-start text-end" : "dropdown-menu-end text-start"}`}
                  aria-labelledby="userDropdown"
                  style={{ minWidth: "220px" }}
                >
                  <li className="text-center">
                    <img
                      src={User}
                      alt="User"
                      className="rounded-circle mb-2"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <strong>Hussen</strong>
                    </div>
                    <div>
                      <small className="">{email}</small>
                    </div>
                  </li>
                  <li>
                    <hr />
                  </li>
                  <li>
                    <button
                      className="btn btn-sm btn-primary w-100 mb-2"
                      onClick={handleProfile}
                    >
                      {t("settings.title")}
                    </button>
                    <button
                      className="btn btn-sm btn-danger w-100"
                      onClick={handleLogout}
                    >
                      {t("settings.logout")}
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <PButtonLink title={t("nav.login")} link="/login" />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <Sure show={showModal} setShow={setShowModal} title={t("sure.title")}>
        {t("sure.logout")}
      </Sure> */}
    </nav>
  );
}