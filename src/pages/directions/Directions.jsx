import React from "react";
import '../../assets/style/directions.css'
import WhereText from "./WhereText";
import { HiArrowLongRight } from "react-icons/hi2";
import { getDirections } from '../../services/Api.js';
import { useFetch } from '../../hooks/useFetch.js'
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Directions = () => {
    const { t } = useTranslation()
    const { data: directions = [], loading } = useFetch(getDirections)

    if (loading) {
        return (
            <div className="directions__wrapper">
                <div className="WhereText__background">
                    <div className="container">
                        <WhereText />
                    </div>
                </div>
                <div className="container">
                    <div className="directionsBlocks-loader">
                        <div className="loader"></div>
                        <p>Загрузка...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="directions__wrapper">
            <div className="WhereText__background">
                <div className="container">
                    <WhereText />
                </div>
            </div>

            <div className="container">
                <div className="directionsBlocks">
                    {directions?.map((block, index) => {
                        return (
                            <div key={block.id} className='directionBlock' style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="directionBlock__img1">
                                    <div className="directionBlock__img2">
                                        <img src={block.image_file} alt="" />
                                        <h2>{t(block.name)}</h2>
                                        <h3>{t(block.region)}</h3>
                                    </div>
                                </div>
                                <p>{t(block.description)}</p>
                                <Link to="/tours">
                                    <button>
                                        Смотреть туры
                                        <HiArrowLongRight className='directionBlock__button__icon' />
                                    </button>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Directions;