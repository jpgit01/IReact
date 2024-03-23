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
            <h1 className="display-4 text-primary">Días Feriados y leyes correspondientes en Chile 2024</h1>
          </div>
        </div>
        <div className="row border">
          <div className="col-md-12">
            <Button
              variant="primary"
              size="sm"
              className="m-3"
              onClick={handleFirstButtonClick}
            >
              Feriados 2024
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="m-3"
              onClick={handleSecondButtonClick}
            >
              Leyes correspondientes a días feriados
            </Button>
            {showBuscador && <Buscador leyes={currentData} />}

            {showTable1 && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>FECHA</th>
                    <th>TITULO</th>
                    <th>EXTRA</th>
                    <th>TIPO</th>
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
                    <th>TITULO</th>
                    <th>CONTENIDO</th>
                    <th>LINK</th>
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
                              Ley
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
