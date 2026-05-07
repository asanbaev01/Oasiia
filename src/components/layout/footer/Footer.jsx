import React, { useState, useEffect } from 'react';
import '../../../assets/style/footer.css';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { FaInstagram, FaWhatsapp, FaTelegramPlane, FaPhoneAlt } from "react-icons/fa";
import { BsGeoAltFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { IoTimeSharp } from "react-icons/io5";
import logoImg from "../../../assets/img/logo.png";

const Footer = () => {
    const { t } = useTranslation();
    const [footerLoaded, setFooterLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => setFooterLoaded(true), 100);
    }, []);

    return (
        <footer id='footer'>
            <div className={`container ${footerLoaded ? 'footer-loaded' : ''}`}>
                <div className='footer-wrapper'>
                    <div className='footer-brand'>
                        <Link to={'/'} className="footer-logo">
                            <img src={logoImg} alt="Oasia" />
                        </Link>
                        <p className="footer-text">
                            {t("footer.desc")}
                        </p>
                        <div className='footer-socials'>
                            <a href="#" className="social-link"><FaInstagram /></a>
                            <a href="#" className="social-link"><FaWhatsapp /></a>
                            <a href="#" className="social-link"><FaTelegramPlane /></a>
                        </div>
                    </div>

                    <div className='footer-nav'>
                        <h2 className="footer-title">{t("footer.nav")}</h2>
                        <nav className='footer-links'>
                            <Link to='/tours'>• {t("nav.tours")}</Link>
                            <Link to='/directions'>• {t("nav.directions")}</Link>
                            <Link to='/services'>• {t("nav.services")}</Link>
                            <Link to='/gallery'>• {t("nav.gallery")}</Link>
                            <Link to='/faq'>• {t("nav.faq")}</Link>
                            <Link to='/contact'>• {t("nav.contacts")}</Link>
                        </nav>
                    </div>

                    <div className='footer-info'>
                        <h2 className="footer-title">{t("footer.contact")}</h2>
                        <div className="contact-item">
                            <div className="contact-icon"><BsGeoAltFill /></div>
                            <span>г. Бишкек, ул. Чуй 112</span>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon"><FaPhoneAlt /></div>
                            <span>+996 (221) 864-000</span>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon"><MdEmail /></div>
                            <span>info@oasia-travel.kg</span>
                        </div>
                        <div className="contact-item">
                            <div className="contact-icon"><IoTimeSharp /></div>
                            <span>Пн–Пт: 09:00–18:00</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-divider"></div>
                    <p className='footer-copyright'>
                        © 2026 Oasia.kg — {t("footer.rights")}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;