import React, { useEffect, useState } from 'react';
import '../../assets/style/section.css';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Section() {
  const { t } = useTranslation();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimated(true), 100);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <div className="hero-content">
          <div className={`welcome-badge ${animated ? 'animate-badge' : ''}`}>
            {t("hero.tag")}
          </div>
          
          <h1 className="hero-title">
            {t("hero.title")} <br />
            <span className="blue-text">{t("hero.titleAccent")}</span>
          </h1>
          
          <p className={`hero-subtitle ${animated ? 'animate-subtitle' : ''}`}>
            {t("hero.subtitle")}
          </p>
          
          <div className="hero-buttons">
            <Link to="/tours" className={`btn-primary ${animated ? 'animate-btn1' : ''}`}>
              {t("hero.cta")}
            </Link>
            <Link to="/contact">
              <button className={`btn-secondary ${animated ? 'animate-btn2' : ''}`}>
                {t("hero.contact")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}