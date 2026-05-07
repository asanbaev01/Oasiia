import React, { useState, useEffect } from 'react'
import '../../assets/style/otcroi.css'
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Otcroi() {
  const { t } = useTranslation();
  const [destinations, setDestinations] = useState([])
  const [headerAnimated, setHeaderAnimated] = useState(false)
  const [animatedCards, setAnimatedCards] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const fakeApiData = [
        { 
          id: 1, 
          name: t("directions.turkey.name"), 
          count: `12 ${t("directions.toursCount")}`, 
          img: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2070&auto=format&fit=crop' 
        },
        { 
          id: 2, 
          name: t("directions.thailand.name"), 
          count: `8 ${t("directions.toursCount")}`, 
          img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop' 
        },
        { 
          id: 3, 
          name: t("directions.uae.name"), 
          count: `15 ${t("directions.toursCount")}`, 
          img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop' 
        },
        { 
          id: 4, 
          name: t("directions.egypt.name"), 
          count: `10 ${t("directions.toursCount")}`, 
          img: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=2070&auto=format&fit=crop' 
        }
      ]
      setDestinations(fakeApiData)
      
      setTimeout(() => {
        fakeApiData.forEach((_, index) => {
          setTimeout(() => {
            setAnimatedCards(prev => [...prev, index])
          }, index * 120)
        })
      }, 250)
    }

    fetchData()
    setTimeout(() => setHeaderAnimated(true), 100)
  }, [t])

  return (
    <section className="otcroi-section">
      <div className="container">
        <div className={`otcroi-header ${headerAnimated ? 'header-animated' : ''}`}>
          <span className="otcroi-badge">{t("directions.pageTag")}</span>
          <h2 className="otcroi-main-title">{t("directions.pageTitle")}</h2>
          <p className="otcroi-subtitle">{t("directions.pageSubtitle")}</p>
        </div>

        <div className="otcroi-grid">
          {destinations.map((item, index) => (
            <div 
              key={item.id} 
              className={`dest-card ${animatedCards.includes(index) ? 'card-animated' : ''}`}
              style={{ backgroundImage: `url(${item.img})` }}
            >
              <div className="dest-overlay">
                <div className="dest-info">
                  <h3 className="dest-name">{item.name}</h3>
                  <p className="dest-count">{item.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="otcroi-footer">
          <Link to="/directions" className="all-dest-btn">
            {t("directions.viewAll")}
          </Link>
        </div>
      </div>
    </section>
  )
}