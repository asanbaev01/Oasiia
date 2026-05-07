import React, { useState, useEffect } from 'react'
import '../../assets/style/directions.css'
import { useTranslation } from "react-i18next"

const WhereText = () => {
    const { t } = useTranslation();
    const [animated, setAnimated] = useState(false)

    useEffect(() => {
        setTimeout(() => setAnimated(true), 100)
    }, [])

    return (
        <section className='WhereText__section1'>
            <div className={`WhereText__text ${animated ? 'text-animated' : ''}`}>
                <p>{t("directions.pageTag")}</p>
                <h1>{t("directions.pageTitle")}</h1>
                <p>{t("directions.pageSubtitle")}</p>
            </div>
        </section>
    )
}

export default WhereText