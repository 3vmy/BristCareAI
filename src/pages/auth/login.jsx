import React, { useState, useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import { ThemeContext } from "../../context/ThemeContext";
import MyInput from "../../component/ui/input";
import Alert from "../../component/ui/alert";
import { useAuth } from "./AuthContext";
import "./style.css";

export default function Login() {
  const { email: loggedEmail, loginRemember, login } = useAuth(); // استخدم اسم مختلف لتفادي التعارض
  const [loading, setLoading] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { t } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // قيد إعادة التوجيه إذا المستخدم مسجل دخول
  if (loggedEmail) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setToastMessage(t("login.fill_fields"));
      setShowToast(true);
      return;
    }

    if (!email.includes("@")) {
      setToastMessage(t("login.invalid_email"));
      setShowToast(true);
      return;
    }

    const passwordRegex = /^(?=.*[0-9]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setToastMessage(t("login.invalid_password"));
      setShowToast(true);
      return;
    }

    // تسجيل الدخول
    setLoading(true);

    setTimeout(() => {
    if (rememberMe) {
      loginRemember(email);
    } else {
      login(email);
    }      // تسجيل الدخول بعد نجاح التسجيل
    navigate("/");
    }, 1000);
  };

  return (
    <div className="login container">
      <Alert message={toastMessage} show={showToast} setShow={setShowToast} />
      <div className="login2">
        {/* <button onClick={() => navigate(-1)} className="back-btn">
          <i className="fa-solid fa-arrow-left"></i>
        </button> */}

        <div className="image-container">
          <img
            src={theme === "dark" ? "dark_logo.png" : "light_logo.png"}
            alt=""
          />
        </div>

        <h3>{t("login.title")}</h3>
        <p>{t("login.des")}</p>

        <form onSubmit={handleLogin}>
          <MyInput
            label={t("login.email")}
            placeholder="example@mail.com"
            type="email"
            value={email}
            onChange={setEmail}
          />

          <div className="password-field">
            <MyInput
              label={t("login.password")}
              placeholder={t("login.password_placeholder")}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={setPassword}
            />
            <span
              className="password-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i
                className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
              ></i>
            </span>
          </div>

          <div className="d-flex mt-3 mb-4 justify-content-between">
            <div>
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/> <span>{t("login.remember")}</span>
            </div>

            <a href="#" className="nav-link">
              {t("login.forget")}
            </a>
          </div>

          <div className="">
            <div className="d-grid gap-2">
              <button
                type="submit"
                className="pbuttonlink btn pt-2 pb-2 fw-bold"
              >
                {t("login.button")}
              </button>
            </div>

            <div className="mt-3">
              <p>{t("login.or")}</p>
            </div>

            <div className="d-grid">
              <button type="button" className="google btn pt-3 pb-3 fw-bold">
                <i className="fa-brands fa-google"></i> {t("login.google")}
              </button>
            </div>

            <div className="nav-link-center">
              <Link to="/signup" className="nav-link mt-3">
                {t("login.no_account")}
              </Link>
            </div>
          </div>

          {loading && (
            <div className="loading-overlay">
              <div className="spinner-border text-light"></div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}