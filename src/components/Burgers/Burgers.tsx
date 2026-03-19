import React, { useState } from 'react';
import './Burgers.scss';
import { BURGRS } from '../../mockedData';
import BurgerCard from './BurgerCard';

export default function Burgers() {
  const [index, setIndex] = useState(0);
  const visibleCount = 3;
  const maxIndex = Math.max(0, BURGRS.length - visibleCount);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  const slideWidth = 100 / visibleCount;
  const trackStyle = {
    transform: `translateX(-${index * slideWidth}%)`,
    transition: 'transform 0.8s ease',
  };

  return (
    <div className="burgers-container">
      <h1>Our Burgers</h1>
      <div className="slider">
        <button className="slider-control btn-prev" disabled={index === 0} onClick={prev}>
          ‹
        </button>

        <div className="slider-window">
          <ul className="slider-track" style={trackStyle}>
            {BURGRS.map((burger) => (
              <BurgerCard key={burger.id} {...burger} />
            ))}
          </ul>
        </div>

        <button className="slider-control btn-next" disabled={index === maxIndex} onClick={next}>
          ›
        </button>
      </div>

      <div className="slider-pagination">
        {BURGRS.map((_, idx) => (
          <button
            key={`dot-${idx}`}
            className={`dot ${idx === index ? 'active' : ''}`}
            onClick={() => setIndex(Math.min(maxIndex, Math.max(0, idx)))}
          />
        ))}
      </div>
    </div>
  );
}
