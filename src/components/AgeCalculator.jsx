import '../styles/AgeCalculator.css';
import React, { useState } from 'react';

const AgeCalculator = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [dayError, setDayError] = useState(false);
  const [monthError, setMonthError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [futureDateError, setFutureDateError] = useState(false);
  const [age, setAge] = useState({ years: '--', months: '--', days: '--' });

  const isValidDate = (d, m, y) => {
    const date = new Date(y, m - 1, d);
    return date.getFullYear() === parseInt(y, 10) && date.getMonth() === m - 1 && date.getDate() === parseInt(d, 10);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentYear = new Date().getFullYear(); 
    const isDayError = day === '' || day <= 0 || day > 31;
    const isMonthError = month === '' || month <= 0 || month > 12;
    const isYearError = year === '' || year > currentYear;
    const isDateError = !isDayError && !isMonthError && !isYearError && !isValidDate(day, month, year);
    const isFutureDateError = new Date(year, month - 1, day) > new Date();

    setDayError(isDayError);
    setMonthError(isMonthError);
    setYearError(isYearError);
    setDateError(isDateError);
    setFutureDateError(isFutureDateError);

    if (!isDateError && !isFutureDateError && day !== '' && month !== '' && year !== '') {
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      let ageYears = today.getFullYear() - birthDate.getFullYear();
      let ageMonths = today.getMonth() - birthDate.getMonth();
      let ageDays = today.getDate() - birthDate.getDate();

      if (ageMonths < 0 || (ageMonths === 0 && today.getDate() < birthDate.getDate())) {
        ageYears--;
        ageMonths += 12;
      }

      if (ageDays < 0) {
        const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        ageDays = prevMonthLastDay - birthDate.getDate() + today.getDate();
        ageMonths--;
      }

      setAge({ years: ageYears, months: ageMonths, days: ageDays });
    } else {
      setAge({ years: '--', months: '--', days: '--' });
    }
  };

  const currentYear = new Date().getFullYear(); 

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <div className="entradas">
          <div className="input-group">
            <label htmlFor="dia" className={(dayError || dateError || futureDateError) ? 'error' : ''}>DAY</label>
            <input 
              type="text" 
              id="dia" 
              name="dia" 
              placeholder="DD" 
              required 
              value={day} 
              onChange={(e) => setDay(e.target.value)} 
              className={(dayError || dateError || futureDateError) ? 'error' : ''} 
            />
            <div className="error-container">
              {dayError && <span className="error">{day === '' ? 'This field is required' : (day <= 0 || day > 31) ? 'Must be a valid day' : ''}</span>}
              {dateError && <span className="error">Must be a valid date</span>}
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="mes" className={(monthError || dateError || futureDateError) ? 'error' : ''}>MONTH</label>
            <input 
              type="text" 
              id="mes" 
              name="mes" 
              placeholder="MM" 
              required 
              value={month} 
              onChange={(e) => setMonth(e.target.value)} 
              className={(monthError || dateError || futureDateError) ? 'error' : ''} 
            />
            <div className="error-container">
              {monthError && <span className="error">{month === '' ? 'This field is required' : (month <= 0 || month > 12) ? 'Must be a valid month' : ''}</span>}
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="ano" className={(yearError || dateError || futureDateError) ? 'error' : ''}>YEAR</label>
            <input 
              type="text" 
              id="ano" 
              name="ano" 
              placeholder="YYYY" 
              required 
              value={year} 
              onChange={(e) => setYear(e.target.value)} 
              className={(yearError || dateError || futureDateError) ? 'error' : ''} 
            />
            <div className="error-container">
              {yearError && <span className="error">{year === '' ? 'This field is required' : year > currentYear ? 'Must be in the past' : ''}</span>}
            </div>
          </div>
          <button type="submit" className="botao">
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44">
              <g fill="none" stroke="#FFF" strokeWidth="2">
                <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/>
              </g>
            </svg>
          </button>
        </div>
      </form>
      <div className="linha"></div>
      <div className="saida">
        <p><span className="--">{age.years}</span>years</p>
        <p><span className="--">{age.months}</span>months</p>
        <p><span className="--">{age.days}</span>days</p>
      </div>
    </>
  );
};

export default AgeCalculator;