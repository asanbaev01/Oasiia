import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const FaqHero = () => {
    const { t } = useTranslation();
    const [heroAnimated, setHeroAnimated] = useState(false);

    useEffect(() => {
        setTimeout(() => setHeroAnimated(true), 100);
    }, []);

    return (
        <section id="faqHero">
            <div className="container">
                <div className={`faqHero ${heroAnimated ? 'hero-animated' : ''}`}>
                    <h1>{t("faq.pageTag")}</h1>
                    <p>{t("faq.pageTitle")}</p>
                </div>
            </div>
        </section>
    );
};

export default FaqHero;




