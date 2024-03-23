import React, { useState } from 'react';
import './App.css';
import MiApi from './components/MiApi';

function App() {
  const [leyes, setLeyes] = useState([]);

  return (
    <>
      <MiApi setLeyes={setLeyes} />
    </>
  );
}

export default App;
