import React, { useState, useEffect } from 'react'
import '../../assets/style/poche.css'
import { useTranslation } from "react-i18next"
import { GiMountainCave } from "react-icons/gi"
import { HiOutlineShieldCheck } from "react-icons/hi2"
import { RiLeafLine } from "react-icons/ri"
import { FaRegStar } from "react-icons/fa6"

export default function Poche() {
  const { t } = useTranslation()
  const [headerAnimated, setHeaderAnimated] = useState(false)
  const [animatedCards, setAnimatedCards] = useState([])

  const advantages = [
    {
      id: 1,
      icon: <GiMountainCave />, 
      title: t('why.experts'),
      desc: t('why.expertsDesc')
    },
    {
      id: 2,
      icon: <HiOutlineShieldCheck />,
      title: t('why.safety'),
      desc: t('why.safetyDesc')
    },
    {
      id: 3,
      icon: <RiLeafLine />,
      title: t('why.eco'),
      desc: t('why.ecoDesc')
    },
    {
      id: 4,
      icon: <FaRegStar />,
      title: t('why.rating'),
      desc: t('why.ratingDesc')
    }
  ]

  useEffect(() => {
    setTimeout(() => setHeaderAnimated(true), 100)
    
    advantages.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedCards(prev => [...prev, index])
      }, 200 + index * 120)
    })
  }, [])

  return (
    <section className="poche-section">
      <div className="container">
        <div className={`poche-header ${headerAnimated ? 'header-animated' : ''}`}>
          <span className="poche-badge">{t('sections.whyTag')}</span>
          <h2 className="poche-title">{t('sections.whyTitle')}</h2>
          <p className="poche-subtitle">{t('sections.whySubtitle')}</p>
        </div>

        <div className="poche-grid">
          {advantages.map((item, index) => (
            <div 
              key={item.id} 
              className={`poche-card ${animatedCards.includes(index) ? 'card-animated' : ''}`}
            >
              <div className="poche-icon-wrapper">
                {item.icon}
              </div>
              <h3 className="poche-card-title">{item.title}</h3>
              <p className="poche-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}