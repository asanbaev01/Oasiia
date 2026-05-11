import React, { useState, useEffect } from 'react'
import { FaRegClock, FaStar, FaArrowRight } from 'react-icons/fa'
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { getFeaturedTours } from '../../services/Api'
import '../../assets/style/lutTur.css'

import bat from '../../assets/img/bat.jpg'
import kol from '../../assets/img/kool.jpg'

export default function LutTur() {
  const { t } = useTranslation()
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [headerAnimated, setHeaderAnimated] = useState(false)
  const [animatedCards, setAnimatedCards] = useState([])

  useEffect(() => {
    const fetchRealData = async () => {
      try {
        setLoading(true)
        const response = await getFeaturedTours()
        const data = response.data?.data || response.data || []
        setTrips(data)
        
        setTimeout(() => {
          data.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedCards(prev => [...prev, index])
            }, index * 150)
          })
        }, 300)
      } catch (error) {
        console.error("Error fetching tours:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchRealData()
    setTimeout(() => setHeaderAnimated(true), 100)
  }, [t])
  const getTourImage = (item) => {
    if (item.image && item.image !== "" && item.image !== "string") return item.image
    if (item.image_file && item.image_file !== "" && item.image_file !== "string") return item.image_file
    const title = item.title?.toLowerCase() || ""
    const slug = item.slug?.toLowerCase() || ""
    if (title.includes('баткен') || slug.includes('batken')) return bat
    if (title.includes('куль') || title.includes('көл') || slug.includes('kul')) return kol
    return kol 
  }
  if (loading) {
    return <div className="trips-loader">{t('tours.loading')}</div>
  }
  return (
    <section className="trips-section">
      <div className={`trips-header ${headerAnimated ? 'header-animated' : ''}`}>
        <span className="popular-badge">{t('sections.popularTag')}</span>
        <h2 className="trips-main-title">{t('sections.popularTitle')}</h2>
        <p className="trips-subtitle">{t('sections.popularSubtitle')}</p>
      </div>

      <div className="trips-container">
        {trips.length > 0 ? (
          trips.map((item, index) => {
            const tourImage = getTourImage(item)
            return (
              <div 
                key={item.id || index} 
                className={`trip-card ${animatedCards.includes(index) ? 'card-animated' : ''}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div
                  className="trip-banner"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url(${tourImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: '#0f172a'
                  }}
                >
                  <span className="trip-tag">{item.category?.name || item.tag}</span>
                  <div className="trip-time">
                    <FaRegClock size={12} /> {item.duration}
                  </div>
                </div>
                <div className="trip-body">
                  <div className="trip-info-row">
                    <span className="trip-rating">
                      <FaStar size={14} color="#fbbf24" /> {item.rating > 0 ? item.rating : '5.0'}
                    </span>
                    <span className="dot-divider">•</span>
                    <span className="trip-reviews-count">
                      {item.reviews} {t('units.reviews')}
                    </span>
                    <span className="dot-divider">•</span>
                    <span className={`difficulty-badge ${(item.difficulty || 'easy').toLowerCase()}`}>
                      {item.difficulty_display || item.difficulty}
                    </span>
                  </div>
                  <h3 className="trip-main-name">{item.title}</h3>
                  <p className="trip-short-desc">
                    {item.description?.length > 100 
                      ? item.description.slice(0, 97) + "..." 
                      : item.description}
                  </p>
                  <div className="trip-action-area">
                    <div className="trip-price-wrapper">
                      <span className="prefix-from">{t('units.from')}</span>
                      <span className="amount-val">{parseFloat(item.price).toLocaleString()}</span>
                      <span className="currency-unit">KGS</span>
                    </div>
                    <Link to={`/tours/${item.slug}/`} className="go-details-btn">
                      {t('buttons.more')} <FaArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <p>{t('tours.noResults')}</p>
        )}
      </div>
      <div className="bottom-link-wrapper">
        <Link to="/tours" className="explore-all-btn">
          {t('sections.allTours')} <FaArrowRight size={14} style={{ marginLeft: '8px' }} />
        </Link>
      </div>
    </section>
  )
}

