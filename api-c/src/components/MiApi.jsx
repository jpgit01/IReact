import React, { useEffect, useState } from "react";
import Buscador from "./Buscador";

function MiApi({ setLeyes }) {
  const [dataUrl1, setDataUrl1] = useState([]);
  const [dataUrl2, setDataUrl2] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [showBuscador, setShowBuscador] = useState(false);

  const getData = async (url) => {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  };



  useEffect(() => {
    getData("https://api.victorsanmartin.com/feriados/en.json").then((data) => {
      setDataUrl1(data?.data);
    });
  }, []);

  const handleFirstButtonClick = () => {
    setCurrentData(dataUrl1);
    setLeyes(dataUrl1);
    setShowBuscador(false); 
  };

  const handleSecondButtonClick = () => {
    if (dataUrl2.length === 0) {
      getData("https://www.feriadosapp.com/api/laws.json").then((data) => {
        setDataUrl2(data?.data);
        setCurrentData(data?.data);
        setLeyes(data?.data);
        setShowBuscador(true); 
      });
    } else {
      setCurrentData(dataUrl2);
      setLeyes(dataUrl2);
      setShowBuscador(true); 
    }
  };

  return (
    <>
      <div>
        <button onClick={handleFirstButtonClick}>Feriados 2024</button>
        <button onClick={handleSecondButtonClick}>
          Leyes correspondientes a días feriados
        </button>
        {showBuscador && <Buscador leyes={currentData} />}
        {currentData.map((item, index) => (
          <div key={item.id ? item.id + "-" + index : index}>
            {item.id && <p>Id: {item.id}</p>}
            {item.title && <p>Titulo: {item.title}</p>}
            {item.content && <p>Contenido: {item.content}</p>}
            {item.link && <p>Titulo: {item.link}</p>}

            {item.date && <p>Fecha: {item.date}</p>}
            {item.extra && <p>Extra: {item.extra}</p>}
            {item.type && <p>Tipo: {item.type}</p>}
          </div>
        ))}
        
      </div>
    </>
  );
}

export default MiApi;
