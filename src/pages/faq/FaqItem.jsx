import React, { useState, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const FaqItem = () => {
    const { t } = useTranslation();
    const [activeId, setActiveId] = useState(null);
    const [animatedItems, setAnimatedItems] = useState([]);

    const faqData = [
        {
            id: 1,
            question: t("faq.questions.bestTime"),
            answer: t("faq.questions.bestTimeAns")
        },
        {
            id: 2,
            question: t("faq.questions.visa"),
            answer: t("faq.questions.visaAns")
        },
        {
            id: 3,
            question: t("faq.questions.included"),
            answer: t("faq.questions.includedAns")
        },
        {
            id: 4,
            question: t("faq.questions.howToGet"),
            answer: t("faq.questions.howToGetAns")
        }
    ];

    useEffect(() => {
        if (faqData.length > 0) {
            setActiveId(faqData[0].id);
        }
        
        faqData.forEach((_, index) => {
            setTimeout(() => {
                setAnimatedItems(prev => [...prev, index]);
            }, 150 + index * 80);
        });
    }, [t]);

    const toggle = (id) => {
        setActiveId(prev => (prev === id ? null : id));
    };

    return (
        <section id="faqItem">
            <div className="container">
                <div className="faq-list">
                    {faqData.map((item, index) => (
                        <div
                            key={item.id}
                            className={`faq-item ${activeId === item.id ? 'active' : ''} ${animatedItems.includes(index) ? 'item-animated' : ''}`}
                            onClick={() => toggle(item.id)}
                        >
                            <div className="faq-question">
                                <span>{item.question}</span>
                                <BiChevronDown
                                    className={`faq-icon ${activeId === item.id ? 'open' : ''}`}
                                />
                            </div>
                            <div className="faq-answer">
                                <div className="faq-answer-content">
                                    <p>{item.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqItem;



