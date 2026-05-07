import React from "react";
import { useTranslation } from "react-i18next";
import '../../assets/style/tour.css';

const TourHero = () => {
    const { t } = useTranslation();

    return (
        <section id="tourHero">
            <div className="container">
                <div className="tourHero">
                    <h1>{t('tours.pageTag')}</h1>
                    <p>{t('tours.pageTitle')}</p>
                </div>
            </div>
        </section>
    );
};

export default TourHero;