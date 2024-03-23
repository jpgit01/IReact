import React, { useState } from 'react';
import './App.css';
import MiApi from './components/MiApi';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [leyes, setLeyes] = useState([]);

  return (
    <>
      <MiApi setLeyes={setLeyes} />
    </>
  );
}

export default App;
