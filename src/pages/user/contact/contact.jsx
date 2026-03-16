import { useContext, useState } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import Alert from "../../../component/ui/alert";
import "./contact.css";
import Contactt from "../../../assets/images/2.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { email: loggedEmail, login } = useAuth(); // استخدم اسم مختلف لتفادي التعارض

  const { t } = useContext(LanguageContext);

  // الحقول
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Toast
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loggedEmail) {
    navigate("/login");
    return;
    }

    // التحقق من الحقول الفارغة
    if (!name || !email || !subject || !message) {
      setToastMessage(t("login.fill_fields")); // تستخدم نفس نص التحذير
      setShowToast(true);
      return;
    }

    // التحقق من البريد الإلكتروني
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.includes("@")){
      setToastMessage(t("login.invalid_email"));
      setShowToast(true);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      login(email);
      navigate("/");
    }, 1000);  

    // مثال على ارسال البيانات للـ Laravel
    // try {
    //   const response = await fetch("http://your-laravel-api/contact", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   const result = await response.json();

    //   if (response.ok) {
    //     setToastMessage(t("contact.success")); // رسالة نجاح
    //     setShowToast(true);

    //     // مسح الحقول بعد الإرسال إذا أردت
    //     setName("");
    //     setEmail("");
    //     setSubject("");
    //     setMessage("");
    //   } else {
    //     setToastMessage(result.message || t("contact.error"));
    //     setShowToast(true);
    //   }
    // } catch (error) {
    //   setToastMessage(t("contact.error"));
    //   setShowToast(true);
    // }
  };

  return (
    <div className="contact">
      <div className="contact-container">
        <Alert message={toastMessage} show={showToast} setShow={setShowToast} />

        <div className="row g-3">
          {/* contact info */}
          <div className="col-12 col-lg-5 contact-info">
            <img src={Contactt} alt="" className="img-fluid" />
          </div>

          {/* contact form */}
          <div className="col-12 col-lg-7">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2 className="text-center mt-3">{t("contact.title")}</h2>
              <p style={{ fontSize:"13px"}}>{t("contact.dec")}</p>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label>{t("contact.name")}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("login.name_placeholder")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label>{t("contact.email")}</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label>{t("contact.subject")}</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("contact.subject_placeholder")}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label>{t("contact.message")}</label>
                  <textarea
                    rows="5"
                    className="form-control"
                    placeholder={t("contact.message_placeholder")}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="text-center mt-3">
                <button type="submit" className="pbuttonlink btn pt-2 pb-2 w-50">
                  {t("contact.send")}
                </button>
              </div>
            </form>
            {loading && (
            <div className="loading-overlay">
              <div className="spinner-border text-light"></div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}