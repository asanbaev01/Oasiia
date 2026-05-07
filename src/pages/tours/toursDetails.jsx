import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { IoTime } from "react-icons/io5";
import { IoMdPeople } from "react-icons/io";
import { TbCurrentLocationFilled } from "react-icons/tb";
import { FaCheck, FaArrowLeft } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import '../../assets/style/toursDetails.css';
import { useFetch } from '../../hooks/useFetch';
import { getTourBySlug } from '../../services/Api';

const TourDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { data, loading } = useFetch(() => getTourBySlug(slug));

    const tour = data?.data || data;

    if (loading) return <div className="container"><h2>{t('tours.loading')}</h2></div>;
    if (!tour) return <div className="container"><h2>{t('tours.noResults')}</h2></div>;

    const features = Array.isArray(tour.features) ? tour.features : [];
    const included = Array.isArray(tour.included) ? tour.included : [];

    return (
        <>
            <section id='toursDetails' style={{
                background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${tour.image_file || tour.preview_image}) no-repeat center/cover`,
                minHeight: '450px',
                display: 'flex',
                alignItems: 'center'
            }}>
                <div className='container'>
                    <div className='toursDetails'>
                        <h1 className='toursDetails-title'>{tour.title}</h1>
                    </div>
                </div>
            </section>

            <div className='container'>
                <div className='toursDetails-general'>
                    <div className='toursDetails-group-one'>
                        <div className='toursDetails-block-general'>
                            <div className="toursDetails-block-one">
                                <IoTime className='toursDetails-icon' />
                                <div className='block-one-text'>
                                    <h2>{t('tours.detail.duration')}</h2>
                                    <h3>{tour.duration}</h3>
                                </div>
                            </div>
                            <div className="toursDetails-block-two">
                                <IoMdPeople className='toursDetails-icon' />
                                <div className='block-one-text'>
                                    <h2>{t('tours.detail.groupSize')}</h2>
                                    <h3>{tour.group_size}</h3>
                                </div>
                            </div>
                            <div className="toursDetails-block-three">
                                <span className='toursDetails-icon-three'>⭐</span>
                                <div className='block-one-text'>
                                    <h2>{t('tours.rating')}</h2>
                                    <h3>{tour.rating}</h3>
                                </div>
                            </div>
                            <div className="toursDetails-block-four">
                                <TbCurrentLocationFilled className='toursDetails-icon' />
                                <div className='block-one-text'>
                                    <h2>{t('tours.detail.difficulty')}</h2>
                                    <h3 className='degree-text'>{tour.difficulty}</h3>
                                </div>
                            </div>
                        </div>

                        <h2 className='about-tour'>{t('tours.about')}</h2>
                        <p className='tour-description'>{tour.description}</p>

                        <h2 className='tour-peculiarities'>{t('tours.detail.highlights')}</h2>
                        <div className='peculiarities-general'>
                            <div className='peculiarities-block-group'>
                                {features.map((item, i) => (
                                    <div key={i} className='peculiarities-block'>
                                        <FaCheck className='peculiarities-icon' />
                                        <h2>{typeof item === 'object' ? item.text : item}</h2>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <h2 className='tour-included'>{t('tours.detail.included')}</h2>
                        <div className='included-general'>
                            {included.map((item, i) => (
                                <div key={i} className='included-block'>
                                    <GoDotFill className='included-icon' />
                                    <h2>{typeof item === 'object' ? item.text : item}</h2>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='reservation-block'>
                        <h3 className='reservation-from'>{t('tours.detail.from')}</h3>
                        <h2 className='reservation-price'>{tour.price}</h2>
                        <h4 className='reservation-currency'>{t('tours.som')}</h4>
                        <button className="btn-book" onClick={() => navigate('/contact')}>
                            {t('tours.detail.book')}
                        </button>
                        <div className='reservation-back' onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                            <FaArrowLeft className='reservation-icon' />
                            <h5>{t('tours.detail.back')}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TourDetails;