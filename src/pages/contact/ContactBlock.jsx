import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BsGeoAltFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoTime } from "react-icons/io5";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { RiTelegram2Fill } from "react-icons/ri";
import { submitContactForm } from "../../services/Api";

const ContactBlock = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const [status, setStatus] = useState(null);
    const [formAnimated, setFormAnimated] = useState(false);
    const [infoAnimated, setInfoAnimated] = useState([]);
    const [socialAnimated, setSocialAnimated] = useState(false);

    useEffect(() => {
        setTimeout(() => setFormAnimated(true), 200);
        
        const infoItems = [0, 1, 2, 3];
        infoItems.forEach((_, index) => {
            setTimeout(() => {
                setInfoAnimated(prev => [...prev, index]);
            }, 300 + index * 100);
        });
        
        setTimeout(() => setSocialAnimated(true), 700);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (status) setStatus(null);
    };

    const handleSubmit = async () => {
        try {
            if (!formData.name || !formData.phone) return;

            setStatus("loading");
            const response = await submitContactForm(formData);
            
            if (response.status === 200 || response.status === 201) {
                setStatus("success");
                setFormData({ name: "", email: "", phone: "", message: "" });
                setTimeout(() => setStatus(null), 5000);
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <section id="contactBlock">
            <div className="container">
                <div className="contactBlock">
                    <div className={`contactBlock-group-one ${formAnimated ? 'formAnimated' : ''}`}>
                        <h2>{t("contacts.formTitle")}</h2>
                        <div className="contact-input-group">
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={t("contacts.namePlaceholder")} 
                                className="contact-input-one"
                            />
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@email.com" 
                                className="contact-input-two"
                            />
                        </div>
                        <input 
                            type="text" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={t("contacts.phonePlaceholder")} 
                            className="contact-input-number"
                        />
                        <div className="contact-textarea-group">
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required 
                                rows="5"
                                className="contact-textarea"
                                placeholder={t("contacts.messagePlaceholder")}
                            ></textarea>
                        </div>
                        
                        <button 
                            className="contact-button" 
                            onClick={handleSubmit}
                            disabled={status === "loading"}
                        >
                            {status === "loading" ? t("contacts.sending") : t("contacts.send")}
                        </button>

                        {status === "success" && (
                            <div className="status-message success">
                                ✓ {t("contacts.success")}
                            </div>
                        )}

                        {status === "error" && (
                            <div className="status-message error">
                                {t("contacts.error")}
                            </div>
                        )}
                    </div>
                    
                    <div className="contact-group-two">
                        <h2 className="contact-two-title">{t("contacts.infoTitle")}</h2>
                        
                        <div className={`contact-information ${infoAnimated.includes(0) ? 'infoAnimated' : ''}`}>
                            <a href="#"><BsGeoAltFill /></a>
                            <div className="contact-information-text">
                                <h3>{t("contacts.address")}</h3>
                                <h4>{t("contacts.addressVal")}</h4>
                            </div>
                        </div>

                        <div className={`contact-information ${infoAnimated.includes(1) ? 'infoAnimated' : ''}`}>
                            <a href="#"><FaPhoneAlt /></a>
                            <div className="contact-information-text">
                                <h3>{t("contacts.phone2")}</h3>
                                <h4>{t("contacts.phoneVal")}</h4>
                            </div>
                        </div>

                        <div className={`contact-information ${infoAnimated.includes(2) ? 'infoAnimated' : ''}`}>
                            <a href="#"><MdEmail /></a>
                            <div className="contact-information-text">
                                <h3>{t("contacts.emailLabel")}</h3>
                                <h4>{t("contacts.emailVal")}</h4>
                            </div>
                        </div>

                        <div className={`contact-information ${infoAnimated.includes(3) ? 'infoAnimated' : ''}`}>
                            <a href="#"><IoTime /></a>
                            <div className="contact-information-text">
                                <h3>{t("contacts.hours")}</h3>
                                <h4>{t("contacts.hoursVal")}</h4>
                            </div>
                        </div>

                        <div className={`contact-social ${socialAnimated ? 'socialAnimated' : ''}`}>
                            <h3>{t("contacts.social")}</h3>
                            <div className="contact-social-general">
                                <div className="contact-social-block">
                                    <FaInstagram className="contact-block-icon"/>
                                    <h5>Instagram</h5>
                                </div>
                                <div className="contact-social-block">
                                    <FaWhatsapp className="contact-block-icon"/>
                                    <h5>WhatsApp</h5>
                                </div>
                                <div className="contact-social-block">
                                    <RiTelegram2Fill className="contact-block-icon"/>
                                    <h5>Telegram</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactBlock;