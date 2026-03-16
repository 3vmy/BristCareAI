import "./result.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import { LanguageContext } from "../../../../context/LanguageContext";
import Mamo from "../../../../assets/images/MIT-Mirai-2-scaled.jpg";
import User from "../../../../assets/images/user.png";
import html2pdf from "html2pdf.js";
import { useLocation } from "react-router-dom";

const downloadPDF = () => {

  const element = document.querySelector(".report-card");
  const actions = document.querySelector(".report-actions");
  const row = element.querySelector(".row.mt-4");

  if(row){
    row.style.display = "flex";
    row.style.flexWrap = "nowrap";
  }

  if (actions) actions.style.display = "none";

  element.style.width = "900px";
  element.style.transform = "scale(1)";
  element.style.borderRadius = "0";

  const now = new Date();

  const fileName =
    "medical-report-" +
    now.getFullYear() +
    "-" +
    (now.getMonth() + 1) +
    "-" +
    now.getDate() +
    "_" +
    now.getHours() +
    "-" +
    now.getMinutes() +
    "-" +
    now.getSeconds() +
    ".pdf";

  const opt = {
    margin: 0,
    filename: fileName,

    image: {
      type: "jpeg",
      quality: 1
    },

    html2canvas: {
      scale: 2,
      useCORS: true
    },

    jsPDF: {
      unit: "px",
      format: [900,1120],
      orientation: "portrait"
    }
  };

  setTimeout(() => {

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {

        if (actions) actions.style.display = "flex";

        element.style.removeProperty("width");
        element.style.removeProperty("transform");
        element.style.removeProperty("border-radius");

        if(row){
          row.style.removeProperty("display");
          row.style.removeProperty("flex-wrap");
        }
      });

  }, 100);

};

export default function Result() {
  const percentage = 88; // النسبة
  const radius = 45; // نصف القطر
  const strokeWidth = 8; // سمك الحافة

  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);

  const location = useLocation();
  const data = location.state || {};

  const now = new Date();

  return (
    <div className="container report-page py-2">
      <div className="report-card">
        {/* <button onClick={() => navigate(-1)} className="back-btn">
          <i className="fa-solid fa-arrow-left"></i>
        </button> */}

        <div className="d-flex justify-content-between">
          <div className="report_info">
            <span>
              <strong>{t("report.report_id")} </strong> 1639
            </span>
            <br />
            <span>
              <strong>{t("report.date")} </strong>{" "}
              {`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`}
            </span>
            <br />
            <span>
              <strong>{t("report.institution")} </strong> Breast Care AI
            </span>
          </div>

          <div className="img-container">
            <img
              src={theme === "dark" ? "dark_logo.png" : "light_logo.png"}
              alt=""
              className=""
            />
          </div>
        </div>

        <h2 className="report-title mb-4 text-center">{t("report.title")}</h2>

        {/* Patient Information */}
        <div className="card-section">
          <h5>{t("report.patientInfo")}</h5>
          <div className="row">
            <div className="col-md-4">
              <strong>{t("report.patientName")}</strong> {data.name}
            </div>
            <div className="col-md-4">
              <strong>{t("report.patientId")}</strong> 12345
            </div>
            <div className="col-md-4">
              <strong>{t("report.birth")}</strong>{" "}
              {now.getFullYear() - data.age}
            </div>
          </div>
        </div>

        {/* Clinical + Image */}
        <div className="row mt-4">
          <div className="col-lg-4">
            <div className="card-section clinical p-0">
              <h5 className="m-0">{t("report.clinical")}</h5>
              <ul className="clinical-list">
                <li>
                  <strong>{t("report.age")}</strong> {data.age}
                </li>
                <li>
                  <strong>{t("report.family")}</strong>{" "}
                  {t(`report.${data.medical}`)}
                </li>
                <li>
                  <strong>{t("report.lump")}</strong> eee
                </li>
                <li>
                  <strong>{t("report.pain")}</strong> {t(`report.${data.pain}`)}
                </li>
                <li>
                  <strong>{t("report.tumor")}</strong> {data.tumor}
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card-section p-0 m-0">
              <h5>{t("report.mammo")}</h5>

              <div className="mammo-container">
                <img src={data.image} alt="Mamogram" className="mammo-img" />
              </div>
            </div>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="card-section mt-4">
          <h5>{t("report.diagnosisResult")}</h5>
          <div className="diagnosis-box">
            <div>
              <svg height={radius * 2} width={radius * 2}>
                <circle
                  stroke=""
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <circle
                  stroke="#e91e63"
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={`${circumference} ${circumference}`}
                  strokeDashoffset={strokeDashoffset}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <text
                  x="50%"
                  y="50%"
                  dy="0.3em"
                  textAnchor="middle"
                  fontSize="25"
                  fill="#e91e63"
                >
                  {percentage}%
                </text>
              </svg>
            </div>

            <div className="diagnosis-text">
              <h4>
                {t("report.diagnosis")}{" "}
                <span className="text-danger">{t("report.malignant")}</span>
              </h4>
              <span>{t("report.recommendation")}</span>
            </div>
          </div>
        </div>

        {/* Doctor */}
        <div className="doctor-box mt-2">
          <div className="doctor-box2">
            <div className="doctor-box3 col-md-6 align-items-center gap-3">
              <img src={User} className="doctor-img" />
              <div>
                <p className="m-0">{t("report.diagnosedBy")}</p>
                <h5 className="m-0">John Doe</h5>
              </div>
            </div>

            <div className="col-md-6">
              <p className="m-0 mt-3">{t("report.phone")} (123) 456-7890</p>
              <p>{t("report.email")} johndoe@breastcareai.com</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="report-actions">
          <div className="buttons">
            <button className="btn pbuttonlink" onClick={downloadPDF}>
              <i className="fa-regular fa-file-pdf"></i>
              {t("report.download")}{" "}
            </button>
            <button className="btn btn-secondary">{t("report.print")}</button>
          </div>
          <h4 className="foot-title fw-bold">
            Breast Care <span>AI</span>
          </h4>
        </div>

        <div className="report-footer mt-3">
          <p>{t("report.note")}</p>
          <div className="row text-center d-flex">
            <div className="footer-website col-md-4 footer-item">
              <i className="fa-solid fa-globe"></i>
              <a href="https://breastcareai.com">www.breastcareai.com</a>
            </div>
            <div className="col-md-4 footer-item">
              <i className="fa-solid fa-phone"></i>
              <p>(123) 456-7890</p>
            </div>
            <div className="col-md-4 footer-item">
              <i className="fa-solid fa-envelope"></i>
              <p>info@breastcareai.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}