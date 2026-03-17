import HomeCard  from "../component/ui/card";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import "./index.css"
import homeImage from "../assets/images/homeImage1.png";
import PButtonLink from "../component/ui/button";
import {ButtonLink} from "../component/ui/button";

export default function Home()
{
    const { t, toggleLanguage } = useContext(LanguageContext);

    return(
        <div className="home">
            <div className="home2">
                <div className="text">
                    <h1 className="fw-bold">{t("home.title")} <br /> {t("home.title2")} <span>{t("home.Ai")}</span></h1>
                    <p>{t("home.p")}</p>
                    <div className="home-button d-flex gap-2">
                        <PButtonLink title={t("home.start_button")} link="/diagnosis"/>
                        <ButtonLink title={t("home.learn_button")}  link="#learn-more"/>
                    </div>
                </div>
                <img src={homeImage} alt="Breast Care AI" />
            </div>
            <div className="cards">
                <HomeCard 
                color="icon-color bg-danger" 
                i={<i className="fa-solid fa-brain"></i>} 
                title={t("card.fs_title")} 
                discreption={t("card.fs_dis")}/>

                <HomeCard 
                color="icon-color bg-success" 
                i={<i className="fa-solid fa-check"></i>} 
                title={t("card.sec_title")}
                discreption={t("card.sec_dis")}/>

                <HomeCard 
                color="icon-color bg-danger" 
                i={<i className="fa-solid fa-book-medical"></i>} 
                title={t("card.thrd_title")} 
                discreption={t("card.thrd_dis")}/>
            </div>
            
            <section id="learn-more" className="learn-section">

                <div className="learn-header">
                    <h2>{t("learn.title")}</h2>
                    <p>{t("learn.description")}</p>
                </div>


                {/* Steps */}
                <div className="learn-steps">

                    <div className="step">
                        <div className="icon bg-danger">
                            <i className="fa-solid fa-upload"></i>
                        </div>
                        <h4>{t("learn.step1_title")}</h4>
                        <p>{t("learn.step1_desc")}</p>
                    </div>

                    <div className="step">
                        <div className="icon bg-primary">
                            {/* <i className="fa-brands fa-openai"></i> */}
                            <i className="fa-solid fa-brain"></i>
                        </div>
                        <h4>{t("learn.step2_title")}</h4>
                        <p>{t("learn.step2_desc")}</p>
                    </div>

                    <div className="step">
                        <div className="icon bg-success">
                            <i className="fa-solid fa-chart-line"></i>
                        </div>
                        <h4>{t("learn.step3_title")}</h4>
                        <p>{t("learn.step3_desc")}</p>
                    </div>

                </div>


                {/* AI Model Info */}
                <div className="ai-info">

                    <h3>{t("learn.model_title")}</h3>

                    <div className="ai-stats">

                        <div className="stat">
                            <h4>94%</h4>
                            <p>{t("learn.accuracy")}</p>
                        </div>

                        <div className="stat">
                            <h4>12000+</h4>
                            <p>{t("learn.dataset")}</p>
                        </div>

                        <div className="stat">
                            <h4>CNN</h4>
                            <p>{t("learn.architecture")}</p>
                        </div>

                    </div>

                </div>


                {/* Medical Warning */}
                <div className="medical-warning">

                    <h4>{t("learn.warning_title")}</h4>

                    <p>{t("learn.warning1")}</p>
                    <p>{t("learn.warning2")}</p>

                </div>

            </section>

        </div>
        
    );
};