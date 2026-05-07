import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import '../../assets/style/contact.css';

const ContactHero = () => {
    const { t } = useTranslation();
    const [heroAnimated, setHeroAnimated] = useState(false);

    useEffect(() => {
        setTimeout(() => setHeroAnimated(true), 100);
    }, []);

    return (
        <section id="contactHero" className={heroAnimated ? 'heroAnimated' : ''}>
            <div className="container">
                <div className="contactHero">
                    <h1>{t("contacts.pageTag")}</h1>
                    <h2>{t("contacts.pageTitle")}</h2>
                    <p>{t("contacts.pageSubtitle")}</p>
                </div>
            </div>
        </section>
    );
};

export default ContactHero;