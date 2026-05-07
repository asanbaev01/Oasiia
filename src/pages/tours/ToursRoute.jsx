import React, { useState, useMemo } from 'react';
import { useTranslation } from "react-i18next";
import { FaCheck, FaArrowUp, FaArrowDown, FaStar } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { ImSearch } from "react-icons/im";
import TourCard from './tourCard';
import { useFetch } from '../../hooks/useFetch';
import { getTours } from '../../services/Api';

const ToursRoute = () => {
    const { t } = useTranslation();
    const { data, loading } = useFetch(getTours);
    const toursData = data?.data || data || [];

    const [currency, setCurrency] = useState('KGS');
    const currencies = ['KGS', 'USD', 'RUB'];
    
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('default');
    const [maxPrice, setMaxPrice] = useState(100000);

    const regions = [
        { id: 'all', label: t('tours.all') },
        { id: 'Иссык-куль', label: 'Иссык-куль' },
        { id: 'Баткен', label: 'Баткен' },
        { id: 'Ош', label: 'Ош' },
        { id: 'Нарын', label: 'Нарын' }
    ];

    const sortOptions = [
        { value: 'cheap', label: t('tours.priceAsc'), icon: <FaArrowUp /> },
        { value: 'expensive', label: t('tours.priceDesc'), icon: <FaArrowDown /> },
        { value: 'rating', label: t('tours.ratingDesc'), icon: <FaStar /> },
    ];

    const convertPrice = (price) => {
        const numPrice = Number(price);
        if (currency === 'USD') return (numPrice / 89).toFixed(1);
        if (currency === 'RUB') return (numPrice * 1.1).toFixed(0);
        return numPrice;
    };

    const filteredTours = useMemo(() => {
        let result = Array.isArray(toursData) ? [...toursData] : [];

        if (filter !== 'all') {
            result = result.filter(tour => tour.category_name === filter);
        }

        result = result.filter(tour => Number(tour.price) <= maxPrice);

        if (sort === 'cheap') result.sort((a, b) => a.price - b.price);
        if (sort === 'expensive') result.sort((a, b) => b.price - a.price);
        if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);

        return result;
    }, [toursData, filter, maxPrice, sort]);

    return (
        <section id='toursRoute'>
            <div className='container'>
                <div className='toursRoute'>
                    <div className='toursRoute-group-one'>
                        <div className='currency'>
                            <h1 className='currency-title'>{t('tours.currency')}</h1>
                            <div className='currency-list'>
                                {currencies.map(item => (
                                    <button
                                        key={item}
                                        onClick={() => setCurrency(item)}
                                        className={`currency-btn ${currency === item ? 'active' : ''}`}
                                    >
                                        {item === 'KGS' ? t('tours.som').toUpperCase() : item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className='filter'>
                            <h1 className='filter-title'>{t('tours.filter')}</h1>
                            <div className='filter-list'>
                                {regions.map(region => (
                                    <button
                                        key={region.id}
                                        onClick={() => setFilter(region.id)}
                                        className={`filter-btn ${filter === region.id ? 'active' : ''}`}
                                    >
                                        {region.label}
                                        {filter === region.id && <FaCheck style={{marginLeft: '8px'}}/>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className='price'>
                            <h1 className='price-title'>{t('tours.maxPrice')}</h1>
                            <h2 className='price-display'>{maxPrice} {t('tours.som')}</h2>
                            <input
                                type="range"
                                min='500'
                                max='100000'
                                step='500'
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                className='price-input' 
                            />
                        </div>

                        <div className='sort'>
                            <h1 className='sort-title'>{t('tours.sort')}</h1>
                            <div className='sort-list'>
                                {sortOptions.map(item => (
                                    <button
                                        key={item.value}
                                        onClick={() => setSort(item.value)}
                                        className={`sort-btn ${sort === item.value ? 'active' : ''}`}
                                    >
                                        {item.icon && <span className='sort-icon'>{item.icon}</span>}
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {(sort !== 'default' || filter !== 'all' || maxPrice < 100000) && (
                            <button className='sort-reset' onClick={() => {setSort('default'); setFilter('all'); setMaxPrice(100000)}}>
                                <IoClose /> {t('tours.reset')}
                            </button>
                        )}
                    </div>

                    <div className='tours-grid-block-general'>
                        {loading ? (
                            <h2 className='loading-text'>{t('tours.loading')}</h2>
                        ) : filteredTours.length === 0 ? (
                            <div className='tours-none-group'>
                                <h2 className='tours-none-text'>{t('tours.noResults')}</h2>
                                <ImSearch className='tours-none-icon'/>
                            </div>
                        ) : (
                            filteredTours.map(tour => (
                                <TourCard 
                                    key={tour.id} 
                                    tour={tour} 
                                    currency={currency} 
                                    convertPrice={convertPrice}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ToursRoute;