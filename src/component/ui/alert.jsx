import "./ui.css";
import { useEffect, useContext, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { useAuth } from "../../pages/auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Alert({ message, show, setShow }) {
  const { t } = useContext(LanguageContext);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (show) {
      setHide(false);

      const timer = setTimeout(() => {
        setHide(true); 
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show) return null;

  const handleAnimationEnd = () => {
  if (hide) setShow(false);
  };

  return (
    <div
      className={`alert-container 
      ${t("settings.lang") === "English" ? "left" : "right"} 
      ${hide ? "hide" : "show"}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="alert-box">
        <div className="alert-header">
          <strong>
            <i className="fa-solid fa-circle-xmark"></i> {t("login.alert")}
          </strong>

          <button
            className="alert-close"
            onClick={() => setHide(true)}
          >
            ×
          </button>
        </div>

        <div className="alert-body me-3 ms-3">
          {message}
        </div>

      </div>
    </div>
  );
}


// ----------------------------------------------


export function Sure({ show, setShow, title, children }) {
  const { t, toggleLanguage, language } = useContext(LanguageContext);
  const { email, logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    setShow(false);
    navigate("/login");
  };
  useEffect(() => {
    const closeOnEsc = (e) => {
      if (e.key === "Escape") {
        setShow(false);
      }
    };

    document.addEventListener("keydown", closeOnEsc);

    return () => {
      document.removeEventListener("keydown", closeOnEsc);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={() => setShow(false)}>
      <div className="modal-box " onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h5>{title}</h5>

          <button className="modal-close" onClick={() => setShow(false)}>
            ×
          </button>
        </div>
        <hr />

        <div className="modal-body">
          {/* <div className="settings-item p-3">
            <div className="left">
              <i className="fa-solid fa-person-dots-from-line"></i>
              <div className="d-block">
                <span>رغد علي</span>
              </div>
            </div>

            <div className="d-flex">
              <i className="fa-solid fa-trash"></i>
              <i
                className={`fa-solid fa-chevron-${t("settings.lang") === "English" ? "right" : "left"}`}
              ></i>
            </div>
          </div>

          <div className="settings-item p-3">
            <div className="left">
              <i className="fa-solid fa-person-dots-from-line"></i>
              <span>افنان محمد</span>
            </div>

            <div className="d-flex">
              <i className="fa-solid fa-trash"></i>

              <i
                className={`fa-solid fa-chevron-${t("settings.lang") === "English" ? "right" : "left"}`}
              ></i>
            </div>
          </div>

          <div className="settings-item p-3">
            <div className="left">
              <i className="fa-solid fa-person-dots-from-line"></i>
              <span>افنان محمد</span>
            </div>

            <div className="d-flex">
              <i className="fa-solid fa-trash"></i>

              <i
                className={`fa-solid fa-chevron-${t("settings.lang") === "English" ? "right" : "left"}`}
              ></i>
            </div>
          </div> */}
        </div>
        <hr />

        <div className="modal-footer">
          <button className="modal-btn pbuttonlink" onClick={() => setShow(false)}>
            Close
          </button>
          <button className="modal-btn pbuttonlink" onClick={() => setShow(false)}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}