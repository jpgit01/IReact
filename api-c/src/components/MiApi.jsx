import React, { useEffect, useState } from "react";
import Buscador from "./Buscador";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function MiApi({ setLeyes }) {
  const [dataUrl1, setDataUrl1] = useState([]);
  const [dataUrl2, setDataUrl2] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [showBuscador, setShowBuscador] = useState(false);
  const [showTable1, setShowTable1] = useState(false);
  const [showTable2, setShowTable2] = useState(false);

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
    setShowTable1(true);
    setShowTable2(false);
  };

  const handleSecondButtonClick = () => {
    if (dataUrl2.length === 0) {
      getData("https://www.feriadosapp.com/api/laws.json").then((data) => {
        setDataUrl2(data?.data);
        setCurrentData(data?.data);
        setLeyes(data?.data);
        setShowBuscador(true);
        setShowTable1(false);
        setShowTable2(true);
      });
    } else {
      setCurrentData(dataUrl2);
      setLeyes(dataUrl2);
      setShowBuscador(true);
      setShowTable1(false);
      setShowTable2(true);
    }
  };

  
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-primary">Días Festivos y leyes asociadas. Chile 2024</h1>
          </div>
        </div>
        <div className="row border p-3">
          <div className="col-md-12">
          <div className="d-grid gap-2 m-3">
            <Button
              variant="primary"
              size="sm"
              className="mt-2"
              onClick={handleFirstButtonClick}
            >
              Feriados primer semestre 2024
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="mt-2"
              onClick={handleSecondButtonClick}
            >
              Leyes correspondientes
            </Button>
            </div>
            {showBuscador && <Buscador leyes={currentData} />}

            {showTable1 && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Nombre del feriado</th>
                    <th>Condición</th>
                    <th>Categoría</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item, index) => (
                    <tr key={item.id ? item.id + "-" + index : index}>

                      
                      <td>{item.date}</td>
                      <td>{item.title}</td>
                      <td>{item.extra}</td>
                      <td>{item.type}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            {showTable2 && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Contenido</th>
                    <th>Enlace</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((item, index) => (
                    <tr key={item.id ? item.id + "-" + index : index}>
                      <td>{item.title}</td>
                      <td>{item.content}</td>
                      <td>
                        <div className="d-grid gap-2">
                          <a href={item.link} target="blank">
                            <Button variant="primary" size="sm">
                              Ver
                            </Button>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MiApi;
