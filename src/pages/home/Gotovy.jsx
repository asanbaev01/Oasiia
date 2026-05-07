import React, { useState, useEffect } from 'react'
import '../../assets/style/gotovy.css'
import { useTranslation } from "react-i18next"
import { Link } from 'react-router-dom';

export default function Gotovy() {
  const { t } = useTranslation()
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    setTimeout(() => setAnimated(true), 100)
  }, [])

  return (
    <section className="gotovy-section">
      <div className={`gotovy-container ${animated ? 'container-animated' : ''}`}>
        <h2 className="gotovy-title">{t('cta.title')}</h2>
        <p className="gotovy-subtitle">{t('cta.subtitle')}</p>

        <Link to="/contact">
          <button className="gotovy-btn">{t('cta.btn')}</button>
        </Link>
      </div>
    </section>
  )
}
