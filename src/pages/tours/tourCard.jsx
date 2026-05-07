import React from 'react';
import { Link } from 'react-router-dom';
import { IoTime } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const TourCard = ({ tour, currency, convertPrice }) => {
    const { t } = useTranslation();

    return (
        <Link to={`/tours/${tour.slug}/`} className="tour-card-two">
            <div className='tour-card-two-banner'>
                <div className='tour-name'>
                    <h2 className='tour-name-text'>{tour.category_name}</h2>
                </div>
                <div className='tour-time'>
                    <IoTime className='tour-time-icon' />
                    <h3 className='tour-time-text'>{tour.duration}</h3>
                </div>
                <div className='tour-card-image'>
                    <img src={tour.preview_image} alt={tour.title} />
                </div>
            </div>
            <div className='tour-card-group'>
                <h2 className='tour-card-rating'>⭐ {tour.rating}</h2>
                <h2 className='tour-card-reviews'>{tour.reviews} {t('tours.reviews')}</h2>
                <div className='tour-card-level'>
                    <h2 className='tour-card-level-text'>{tour.difficulty}</h2>
                </div>
            </div>
            <h3 className='tour-title-text'>{tour.title}</h3>
            <p className='tour-description-text'>
                {tour.description?.length > 80 
                    ? tour.description.slice(0, 77) + '...'
                    : tour.description}
            </p>
            <div className='tour-card-link'>
                <div className='tour-card-price'>
                    <h3>{t('tours.from')}</h3>
                    <h4>
                        {convertPrice(tour.price)} <span>{currency === 'KGS' ? t('tours.som') : currency}</span>
                    </h4>
                </div>
                <div className='tour-card-information'>
                    <h3>{t('tours.more')}</h3>
                    <FaArrowRight className='card-information-icon' />
                </div>
            </div>
        </Link>
    );
};

export default TourCard;