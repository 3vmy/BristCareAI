import { useContext, useState } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import User from "../../../assets/images/user.png";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import "./settings.css";
import {Sure} from "../../../component/ui/alert";

export default function Account() {
  // const [showModal, setShowModal] = useState(false);

  const { email, logout } = useAuth();
  const { t, language } = useContext(LanguageContext);
  const navigate = useNavigate();

  if (!email) return null

  const handleLogout = () => {
    if (window.confirm(t("settings.confirm_logout"))) {
      logout();
      navigate("/login");
    }
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  const handleSwitchAccount = () => {
    if (window.confirm(t("settings.account_change"))) {
      logout();
      navigate("/login");
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm(t("settings.confirm_delete"))) {
      logout();
      navigate("/signup");
    }
  };

  return (
    <div className="account-page">
      <div className="account-container">

        <h2 className="account-title">
          {t("settings.account")}
        </h2>

        <div className="account-card">
          <img src={User} className="account-avatar" />

          <h1 className="account-name">Hussen</h1>

          <p className="account-email">{email}</p>
        </div>

        <div className="account-options">

          <div className="account-item">
            <div className="account-left">
              <i className="fa-solid fa-user-pen"></i>
              <span>{t("settings.change_name")}</span>
            </div>

            <i className={`fa-solid fa-chevron-${language === "en" ? "right" : "left"}`}></i>
          </div>
          
          <div className="account-item" onClick={handleChangePassword}>
            <div className="account-left">
              <i className="fa-solid fa-lock"></i>
              <span>{t("settings.change_password")}</span>
            </div>

            <i className={`fa-solid fa-chevron-${language === "en" ? "right" : "left"}`}></i>
          </div>

          <div className="account-item" onClick={handleSwitchAccount}>
            <div className="account-left">
              <i className="fa-solid fa-right-left"></i>
              <span>{t("settings.switch_account")}</span>
            </div>

            <i className={`fa-solid fa-chevron-${language === "en" ? "right" : "left"}`}></i>
          </div>

          <div className="account-item delete" onClick={handleDeleteAccount}>
            <div className="account-left">
              <i className="fa-solid fa-trash"></i>
              <span>{t("settings.delete_account")}</span>
            </div>
            <i className={`fa-solid fa-chevron-${language === "en" ? "right" : "left"}`}></i>
          </div>

          <div className="account-item logout" onClick={handleLogout}>
            <div className="account-left">
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>{t("settings.logout")}</span>
            </div>
            <i className={`fa-solid fa-chevron-${language === "en" ? "right" : "left"}`}></i>
          </div>

        </div>

      </div>
      {/* <Sure show={showModal} setShow={setShowModal} title={t("sure.title")}>
        {t("sure.logout")}
      </Sure> */}
    </div>
  );
}