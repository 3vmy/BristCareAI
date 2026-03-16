import React, { useState, useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import { ThemeContext } from "../../context/ThemeContext";
import MyInput from "../../component/ui/input";
import Alert from "../../component/ui/alert";
import { useAuth } from "./AuthContext";
import "./style.css";

export default function Signup() {
  const { email: loggedEmail, login } = useAuth(); // استخدم اسم مختلف لتفادي التعارض
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { t } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  if (loggedEmail) {
    return <Navigate to="/" replace />;
  }

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      setToastMessage(t("login.password_mismatch"));
      setShowToast(true);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      login(email);      // تسجيل الدخول بعد نجاح التسجيل
      navigate("/");
    }, 1000);  

    // alert("تم تسجيل الدخول!");
    // بيانات التسجيل
    // const data = { name, email, password };
    // console.log(data);

    // لاحقاً: ربط مع Laravel أو API
  };

  return (
    <div className="login container">
      {/* Toast */}
      <Alert message={toastMessage} show={showToast} setShow={setShowToast} />

      <div className="login2 signup" style={{ maxWidth: 600, width: "100%" }}>
        {/* <button onClick={() => navigate(-1)} className="back-btn">
          <i className="fa-solid fa-arrow-left"></i>
        </button> */}

        <div className="image-container">
          <img
            src={theme === "dark" ? "dark_logo.png" : "light_logo.png"}
            alt=""
          />
        </div>

        <h3>{t("login.signup")}</h3>

        <form onSubmit={handleSignup}>
          <div className="inputs d-flex justify-content-between gap-3">
            <MyInput
              label={t("login.name")}
              placeholder={t("login.name_placeholder")}
              type="text"
              value={name}
              onChange={setName}
            />
            <MyInput
              label={t("login.email")}
              placeholder="example@mail.com"
              type="email"
              value={email}
              onChange={setEmail}
            />
          </div>

          <div className="inputs d-flex justify-content-between gap-3">
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

            <div className="password-field">
              <MyInput
                label={`${t("login.password")} ${t("login.confirmation")}`}
                placeholder={t("login.password_placeholder")}
                type={showConPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={setConfirmPassword}
              />

              <span
                className="password-eye"
                onClick={() => setShowConPassword(!showConPassword)}
              >
                <i
                  className={`fa-solid ${showConPassword ? "fa-eye" : "fa-eye-slash"}`}
                ></i>
              </span>
            </div>
          </div>

          <div className="mt-3 mb-4 justify-content-between">
            <div className="agree d-flex">
              <input type="checkbox" /><span className="ms-1 me-1">{t("login.agree")}</span> <Link className="nav-link fw-bold">{t("login.privacy_Policy")}</Link>
            </div>
          </div>

          <div className="text-center">
            <div className="d-grid gap-2">
              <button
                type="submit"
                className="pbuttonlink btn pt-2 pb-2 fw-bold"
              >
                {t("login.button2")}
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
              <Link to="/login" className="nav-link mt-3">
                {t("login.button")}
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