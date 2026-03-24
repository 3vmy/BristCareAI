import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { LanguageContext } from "../../../context/LanguageContext";
import "./diagnosis.css";
import MyInput from "../../../component/ui/input";
import Mamo from "../../../assets/images/MIT-Mirai-2-scaled.jpg";
import Alert from "../../../component/ui/alert";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function Diagnosis() {
  const { email: loggedEmail, login } = useAuth(); // استخدم اسم مختلف لتفادي التعارض

  const { t } = useContext(LanguageContext);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [medical, setMedical] = useState("yes");
  const [pain, setPain] = useState("yes");
  const [tumor, setTumor] = useState("");
  const [image, setImage] = useState(null);

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const checkImageWithAPI = async (imageFile) => {
  try {
    // تحويل الصورة ل base64
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = async () => {
        const base64data = reader.result.split(",")[1]; // إزالة الجزء "data:image/...;base64,"

        // استدعاء API الخاص بنموذجك
          const response = await fetch("https://huggingface.co/spaces/3vmy/image_classification_api/api/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: [base64data] }),
        });

        const result = await response.json();
        // مثال النتيجة: result.data[0] = "Mammogram" أو "Other"
        resolve(result.data[0]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleInput = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loggedEmail) {
    navigate("/login");
    return;
    }

    if (!image) {
      setToastMessage(t("diagnosis.image_required"));
      setShowToast(true);
      return;
    }

    if (!name || !age || !tumor) {
      setToastMessage(t("login.fill_fields"));
      setShowToast(true);
      return;
    }

    if (age <= 10 || age >= 100) {
      setToastMessage(t("diagnosis.invalid_age"));
      setShowToast(true);
      return;
    }
    setLoading(true);

    // استدعاء API لفحص الصورة
    const fileInput = document.querySelector('input[type="file"]');
    const imageFile = fileInput.files[0];

    const prediction = await checkImageWithAPI(imageFile);

    if (!prediction) {
      setToastMessage("Error checking image");
      setShowToast(true);
      setLoading(false);
      return;
    }

    if (prediction !== "Mammogram") {
      setToastMessage("الصورة ليست صورة ماموجرام صالحة!");
      setShowToast(true);
      setLoading(false);
      return;
    }

    // البيانات جاهزة للتنقل
    const data = { name, age, medical, pain, tumor, image };
    navigate("/result", { state: data });

    setLoading(true);

  setTimeout(() => {
    navigate("/result", { state: data });
  }, 3000);
  };

  return (
    <div className="diagnosis">
      <div className="diagnosis2">
        <Alert message={toastMessage} show={showToast} setShow={setShowToast} />
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Mammogram */}
            <div className="mamogram col-lg-6 p-4">
              <h5 className="mb-3">{t("diagnosis.mammogram")}</h5>

              <div
                className={`drop-zone ${dragActive ? "active" : ""}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleInput}
                  className="file-input"
                  required
                />
                <p><i className="fa-solid fa-plus"></i></p>
                <p>{t("diagnosis.drag_drop")}</p>
              </div>

              <div className="image-preview mt-3">
                <img
                  src={image ? image : Mamo}
                  alt="Mamogram"
                  className="img-fluid"
                />
              </div>
            </div>

            {/* Clinical */}
            <div className="clincal col-lg-6 p-4">
              <h5 className="mb-4">{t("diagnosis.clinical")}</h5>

              <MyInput
                label={t("diagnosis.name")}
                placeholder={t("diagnosis.name_placeholder")}
                type="text"
                value={name}
                onChange={setName}
              />

              <div className="row">
                <div className="col-md-6">
                  <MyInput
                    label={t("diagnosis.age")}
                    placeholder={t("diagnosis.age_placeholder")}
                    type="number"
                    value={age}
                    onChange={setAge}
                  />
                </div>

                <div className="col-md-6">
                  <label className="mt-3 mb-2">{t("diagnosis.medical")}</label>
                  <select
                    required
                    className="form-select"
                    value={medical}
                    onChange={(e) => setMedical(e.target.value)}
                  >
                    <option value="yes">
                      {t("diagnosis.yes")}
                    </option>
                    <option value="no">{t("diagnosis.no")}</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label className="mt-3 mb-2">{t("diagnosis.pain")}</label>
                  <select
                    required
                    className="form-select"
                    value={pain}
                    onChange={(e) => setPain(e.target.value)}
                  >
                    <option value="yes">
                      {t("diagnosis.yes")}
                    </option>
                    <option value="no">{t("diagnosis.no")}</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <MyInput
                    label={t("diagnosis.tumor")}
                    placeholder={t("diagnosis.tumor_placeholder")}
                    type="number"
                    value={tumor}
                    onChange={setTumor}
                  />
                </div>

                <div className="text-center mt-5">
                  <button
                    className="pbuttonlink btn pt-2 pb-2 submit-btn"
                    type="submit"
                  >
                    {t("diagnosis.submit")}
                  </button>
                </div>

              </div>
            </div>
          </div>
          {loading && (
            <div className="loading-overlay">
              <div className="spinner-border text-light"></div>
            </div>
          )}
          {/* Submit */}
        </form>
      </div>
    </div>
  );
}