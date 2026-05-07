import React, { useState, useEffect } from "react";
import '../../assets/style/services.css';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Services = () => {
    const { t } = useTranslation();
    const [headerAnimated, setHeaderAnimated] = useState(false);
    const [animatedCards, setAnimatedCards] = useState([]);
    const [ctaAnimated, setCtaAnimated] = useState(false);

    const servicesData = [
        { id: 1, title: t("services.individual.title"), desc: t("services.individual.desc"), icon: "🎒" },
        { id: 2, title: t("services.group.title"), desc: t("services.group.desc"), icon: "🚌" },
        { id: 3, title: t("services.horse.title"), desc: t("services.horse.desc"), icon: "🐎" },
        { id: 4, title: t("services.routes.title"), desc: t("services.routes.desc"), icon: "⛰️" },
        { id: 5, title: t("services.eco.title"), desc: t("services.eco.desc"), icon: "🌿" },
        { id: 6, title: t("services.yurt.title"), desc: t("services.yurt.desc"), icon: "⛺" }
    ];

    const cardStyles = [
        { bgColor: "#ebf5ff" },
        { bgColor: "#fff7ed" },
        { bgColor: "#f0fdf4" },
        { bgColor: "#f5f3ff" },
        { bgColor: "#fef2f2" },
        { bgColor: "#fffbeb" }
    ];

    useEffect(() => {
        setTimeout(() => setHeaderAnimated(true), 100);
        
        servicesData.forEach((_, index) => {
            setTimeout(() => {
                setAnimatedCards(prev => [...prev, index]);
            }, 200 + (index * 100));
        });

        setTimeout(() => setCtaAnimated(true), 500);
    }, [t]); 

    return (
        <section className="services-container">
            <div className={`services-header ${headerAnimated ? 'headerAnimated' : ''}`}>
                <p className="header-subtitle">{t("services.pageTag")}</p>
                <h1>{t("services.pageTitle")}</h1>
                <p className="header-desc">{t("services.pageSubtitle")}</p>
            </div>

            <div className="services-grid">
                {servicesData.map((item, index) => (
                    <div 
                        key={item.id} 
                        className={`service-card card-${index + 1} ${animatedCards.includes(index) ? 'cardAnimated' : ''}`}
                        style={{ backgroundColor: cardStyles[index % 6].bgColor }}
                    >
                        <div className="card-top-row">
                            <div className="icon-box">
                                <span>{item.icon}</span>
                            </div>
                            <h2 className="card-title">{item.title}</h2>
                        </div>
                        
                        <div className="card-content">
                            <p className="card-description">{item.desc}</p>
                            {(index === 0 || index === 1) && (
                                <Link to="/contact" className="book-link">
                                    {t("services.book")}
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className={`cta-wrapper ${ctaAnimated ? 'ctaAnimated' : ''}`}>
                <div className="cta-banner">
                    <h2>{t("cta.title")}</h2>
                    <p>{t("cta.subtitle")}</p>
                    <Link to="/contact">
                        <button className="cta-button">{t("cta.btn")}</button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Services;