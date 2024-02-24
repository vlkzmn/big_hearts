/* eslint-disable max-len */
import { useState } from 'react';
import cn from 'classnames';
import './HomePageFaq.scss';
import faqData from '../api/faqData.json';

export const HomePageFaq = () => {
  const [expandedQuestion, setExpandedQuestion] = useState<null | number >(null);

  const toggleAnswer = (index: number) => {
    if (expandedQuestion === index) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(index);
    }
  };

  return (
    <div className="faq">
      <div className="faq__container">
        <p className="faq__sub-title">
          є питання?
        </p>

        <h2 className="faq__title">
          Маємо відповіді на поширеніші з них
        </h2>

        <div className="faq__content">
          {faqData.map((item, index) => (
            <div className="faq__qa" key={item.question}>
              <button
                type="button"
                className={cn('faq__question', { 'faq__question--active': expandedQuestion === index })}
                onClick={() => toggleAnswer(index)}
              >
                {item.question}
              </button>

              <p className={cn('faq__answer', { 'faq__answer--active': expandedQuestion === index })}>
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
