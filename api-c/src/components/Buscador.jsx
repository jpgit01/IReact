import React, { useState } from 'react';

function Buscador({ leyes }) {
  const [selectedId, setSelectedId] = useState('');
  const [ley, setLey] = useState(null);

  const handleChange = (event) => {
    const id = event.target.value;
    setSelectedId(id);
    const leyEncontrada = leyes.find((ley) => ley.id === id);
    setLey(leyEncontrada);
  };
  const divStyle = {
    border: '1px solid black',
    backgroundColor: 'lightgray',
  
  };

  return (
    <div>
      <select value={selectedId} onChange={handleChange}>
        <option value="">¿Buscas una ley especifica?</option>
        {leyes.map((ley) => (
          <option key={ley.id} value={ley.id} >
            Ley Número: {ley.id}
          </option>
        ))}
      </select>
      {ley && (
        <div style={divStyle}>
          <h2>{ley.title}</h2>
          <p>{ley.content}</p>
          <p>{ley.link}</p>
        </div>
      )}
    </div>
  );
}

export default Buscador;
