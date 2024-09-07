import React from 'react';
import AgeCalculator from './components/AgeCalculator';
import './styles/AgeCalculator.css';

const App = () => {
  return (
    <div className="main-container">
      <div className="main-content">
        <AgeCalculator />
      </div>
    </div>
  );
};

export default App;
