import React from 'react';
import './App.css';
import InputRow from './components/inputRow/InputRow';

function App() {
  return (
    <div className="App">
        <InputRow rowNumber="one"/>
        <InputRow rowNumber="two"/>
    </div>
  );
}

export default App;
