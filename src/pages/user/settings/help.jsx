import "./settings.css";
import { useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";

export default function Help(){
  const { t } = useContext(LanguageContext);

  return (
    <div className="help-page">
      <div className="help-container">
        <h1 className="help-title">{t("help.title")}</h1>

        <p className="help-subtitle">{t("help.subtitle")}</p>

        <div className="help-grid">
          <div className="help-card">
            <i className="fa-solid fa-upload"></i>

            <h4>{t("help.upload_title")}</h4>

            <p>{t("help.upload_text")}</p>
          </div>

          <div className="help-card">
            <i className="fa-solid fa-robot"></i>

            <h4>{t("help.ai_title")}</h4>

            <p>{t("help.ai_text")}</p>
          </div>

          <div className="help-card">
            <i className="fa-solid fa-envelope"></i>

            <h4>{t("help.contact_title")}</h4>

            <p>{t("help.contact_text")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}