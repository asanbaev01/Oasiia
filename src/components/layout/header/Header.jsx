import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import '../../../assets/style/header.css';
import logoImg from "../../../assets/img/logo.png";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const langRef = useRef(null);

  const languages = [
    { code: "ky", label: "Кыргызча" },
    { code: "ru", label: "Русский" },
    { code: "en", label: "English" }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[1];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang.code);
    localStorage.setItem("oasia-lang", lang.code);
    setLangOpen(false);
  };

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.tours"), path: "/tours" },
    { name: t("nav.directions"), path: "/directions" },
    { name: t("nav.services"), path: "/services" },
    { name: t("nav.gallery"), path: "/gallery" },
    { name: t("nav.faq"), path: "/faq" },
    { name: t("nav.contacts"), path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  return (
    <header className={scrolled ? "header scrolled" : "header"}>
      <div className="container-fluid">
        <div className="header-wrapper">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/" className="logo">
              <img src={logoImg} alt="Oasia" />
            </Link>
          </motion.div>

          <nav className="nav-menu">
            {navLinks.map((link, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <NavLink to={link.path} className="nav-item">{link.name}</NavLink>
              </motion.div>
            ))}
          </nav>

          <div className="header-right">
            <div className="lang-wrapper" ref={langRef}>
              <motion.div 
                whileTap={{ scale: 0.95 }}
                className={`lang-select ${langOpen ? 'open' : ''}`} 
                onClick={() => setLangOpen(!langOpen)}
              >
                <div className="lang-badge">
                  <span>{currentLang.code.toUpperCase()}</span>
                </div>
                <span className="lang-text">{currentLang.code.toUpperCase()}</span>
                <motion.span 
                  animate={{ rotate: langOpen ? 180 : 0 }}
                  className="lang-arrow"
                ></motion.span>
              </motion.div>

              <AnimatePresence>
                {langOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="lang-dropdown"
                  >
                    {languages.map((lang) => (
                      <motion.div 
                        whileHover={{ x: 5 }}
                        key={lang.code} 
                        className={`lang-option ${currentLang.code === lang.code ? 'active' : ''}`}
                        onClick={() => changeLanguage(lang)}
                      >
                        <span className="opt-code">{lang.code.toUpperCase()}</span>
                        <span className="opt-label">{lang.label}</span>
                        {currentLang.code === lang.code && (
                          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="opt-check">✓</motion.span>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div className="desktop-book-btn" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Link to="/contact">
                <button className="btn-book">{t("nav.book")}</button>
              </Link>
            </motion.div>

            <button 
              className={`burger-btn ${menuOpen ? 'active' : ''}`} 
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}></motion.span>
              <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}></motion.span>
              <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}></motion.span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="mobile-nav"
          >
            <div className="mobile-nav-content">
              <div className="mobile-nav-header">
                <img src={logoImg} alt="Oasia" className="mobile-logo" />
                <button className="close-btn" onClick={() => setMenuOpen(false)}>✕</button>
              </div>
              
              <div className="mobile-nav-links">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <NavLink to={link.path} onClick={() => setMenuOpen(false)}>{link.name}</NavLink>
                  </motion.div>
                ))}
              </div>

              <div className="mobile-nav-footer">
                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                  <button className="btn-book-mobile">{t("nav.book")}</button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;