import "./settings.css";
import { useContext, useState } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import { ThemeContext } from "../../../context/ThemeContext";
import User from "../../../assets/images/user.png";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import {Sure} from "../../../component/ui/alert";

export default function Settings() {
  const [showModal, setShowModal] = useState(false);

  const { t, toggleLanguage, language } = useContext(LanguageContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const { email, logout } = useAuth();
  const navigate = useNavigate();
  const isLoggedIn = !!email;
  
  const handleLogout = () => {
    if (window.confirm(t("settings.confirm_logout"))) {
      logout();
      navigate("/login");
    }
  };

  return (
    <div className="settings-page">
      <h2 className="settings-title">{t("settings.title")}</h2>

      {/* User Info */}
      <div className="user-card">
        <img src={User} className="user-avatar" />

        <div className="user-info">
          {isLoggedIn ? (
            <>
              <h5>{email}</h5>
              <span>{t("settings.logged")}</span>
            </>
          ) : (
            <>
              <h5>{t("settings.no_account")}</h5>
            </>
          )}
        </div>
      </div>

      <div className="settings-list">
        {isLoggedIn ? (
          <div
            className="settings-item"
            onClick={() => navigate("/settings/account")}
          >
            <div className="left">
              <i className="fa-solid fa-user"></i>
              <span>{t("settings.account")}</span>
            </div>
            <i
              className={`fa-solid fa-chevron-${t("settings.lang") === "English" ? "right" : "left"}`}
            ></i>
          </div>
        ) : (
          <></>
        )}

        <div className="settings-item" onClick={toggleLanguage}>
          <div className="left">
            <i className="fa-solid fa-globe"></i>
            <span>{t("settings.language")}</span>
          </div>

          <div className="d-flex">
            <span className="value">
              {language === "ar" ? t("settings.lang") : t("settings.lang")}
            </span>
            <i
              className={`fa-solid fa-chevron-${t("settings.lang") === "English" ? "right" : "left"}`}
            ></i>
          </div>
        </div>

        <div className="settings-item" onClick={toggleTheme}>
          <div className="left">
            <i className="fa-solid fa-moon"></i>
            <span>{t("settings.theme")}</span>
          </div>
          <div className="d-flex">
            <span className="value">
              {theme === "dark" ? t("settings.dark") : t("settings.light")}
            </span>
            <i
              className={`fa-solid fa-chevron-${t("settings.lang") === "English" ? "right" : "left"}`}
            ></i>
          </div>
        </div>

        {isLoggedIn ? (
          <div className="settings-item" onClick={() => setShowModal(true)}>
          <div className="left">
            <i className="fa-solid fa-clock"></i>
            <span>{t("settings.history")}</span>
          </div>
          <i
            className={`fa-solid fa-chevron-${t("settings.lang") === "English" ? "right" : "left"}`}
          ></i>
        </div>
        ):(
          <></>
        )}

        <div
          className="settings-item"
          onClick={() => navigate("/settings/help")}
        >
          <div className="left">
            <i className="fa-solid fa-circle-question"></i>
            <span>{t("settings.help")}</span>
          </div>
          <i
            className={`fa-solid fa-chevron-${t("settings.lang") === "English" ? "right" : "left"}`}
          ></i>
        </div>

        <div
          className="settings-item"
          onClick={() => navigate("/settings/privacy")}
        >
          <div className="left">
            <i className="fa-solid fa-shield"></i>
            <span>{t("settings.privacy")}</span>
          </div>
          <i
            className={`fa-solid fa-chevron-${t("settings.lang") === "English" ? "right" : "left"}`}
          ></i>
        </div>

        {isLoggedIn ? (
          <div
            className="settings-item logout"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            <div className="left">
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>{t("settings.logout")}</span>
            </div>
            <i
              className={`fa-solid fa-chevron-${t("settings.lang") === "English" ? "right" : "left"}`}
            ></i>
          </div>
        ) : (
          <div
            className="settings-item"
            onClick={() => navigate("/login")}
            style={{ cursor: "pointer" }}
          >
            <div className="left">
              <i className="fa-solid fa-right-to-bracket"></i>
              <span>{t("nav.login")}</span>
            </div>
            <i
              className={`fa-solid fa-chevron-${t("settings.lang") === "English" ? "right" : "left"}`}
            ></i>
          </div>
        )}
      </div>
      <Sure show={showModal} setShow={setShowModal} title="Your diagnosised history">
        {t("sure.logout")}
      </Sure>
    </div>
  );
}