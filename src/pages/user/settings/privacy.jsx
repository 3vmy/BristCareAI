import { useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import "./settings.css"
export default function Privacy() {

const { t } = useContext(LanguageContext);

return (
  <div className="privacy-page">
    <div className="privacy-container">
      <h1 className="privacy-title text-center mt-5">{t("privacy.title")}</h1>

      <p className="privacy-subtitle">{t("privacy.subtitle")}</p>

      <div className="privacy-section">
        <h3>{t("privacy.data_title")}</h3>

        <p>{t("privacy.data_text")}</p>
      </div>

      <div className="privacy-section">
        <h3>{t("privacy.use_title")}</h3>

        <p>{t("privacy.use_text")}</p>
      </div>

      <div className="privacy-section">
        <h3>{t("privacy.security_title")}</h3>

        <p>{t("privacy.security_text")}</p>
      </div>

      <div className="privacy-section">
        <h3>{t("privacy.contact_title")}</h3>

        <p>{t("privacy.contact_text")}</p>
      </div>
    </div>
  </div>
);
}