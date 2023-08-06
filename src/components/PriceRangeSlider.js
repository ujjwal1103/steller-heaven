import React, { useState } from 'react';
import './style.css'
const PriceRangeSlider = () => {
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const priceGap = 1000;
 
  const handleMinPriceChange = (event) => {
    const newMinPrice = parseInt(event.target.value);
    if ((maxPrice - newMinPrice >= priceGap) && newMinPrice >= 0) {
      setMinPrice(newMinPrice);
    }
  };

  const handleMaxPriceChange = (event) => {
    const newMaxPrice = parseInt(event.target.value);
    if ((newMaxPrice - minPrice >= priceGap) && newMaxPrice <= 10000) {
      setMaxPrice(newMaxPrice);
    }
  };

  const handleRangeMinChange = (event) => {
    const newMinVal = parseInt(event.target.value);
    const newMaxVal = Math.max(newMinVal + priceGap, maxPrice);
    setMinPrice(newMinVal);
    setMaxPrice(newMaxVal);
  };

  const handleRangeMaxChange = (event) => {
    const newMaxVal = parseInt(event.target.value);
    const newMinVal = Math.min(newMaxVal - priceGap, minPrice);
    setMaxPrice(newMaxVal);
    setMinPrice(newMinVal);
  };

  const rangeLeft = (minPrice / 10000) * 100 + '%';
  const rangeRight = 100 - (maxPrice / 10000) * 100 + '%';

  return (
    <div className="wrapper">
      <header>
        <h2>Price Range</h2>
        <p>Use slider or enter min and max price</p>
      </header>
      <div className="price-input">
        <div className="field">
          <span>Min</span>
          <input type="number" className="input-min" value={minPrice} onChange={handleMinPriceChange} />
        </div>
        <div className="separator">-</div>
        <div className="field">
          <span>Max</span>
          <input type="number" className="input-max" value={maxPrice} onChange={handleMaxPriceChange} />
        </div>
      </div>
      <div className="slider">
        <div className="progress" style={{ left: rangeLeft, right: rangeRight }}></div>
      </div>
      <div className="range-input">
        <input type="range" className="range-min" min="0" max="10000" value={minPrice} step="100" onChange={handleRangeMinChange} />
        <input type="range" className="range-max" min="0" max="10000" value={maxPrice} step="100" onChange={handleRangeMaxChange} />
      </div>
    </div>
  );
};

export default PriceRangeSlider;
