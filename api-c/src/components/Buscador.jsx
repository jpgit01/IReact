import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/esm/Button";

function Buscador({ leyes }) {
  const [selectedId, setSelectedId] = useState("");
  const [ley, setLey] = useState(null);

  const handleChange = (event) => {
    const id = event.target.value;
    setSelectedId(id);
    const leyEncontrada = leyes.find((ley) => ley.id === id);
    setLey(leyEncontrada);
  };

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 5,
      }}
    />
  );

  return (
    <>
      <div className="container bg-light p-3 rounded border ">
        <div className="row ">
          <div className="col-md-12">
            <h2>¿Buscas una ley específica?</h2>
          </div>
        </div>
        <Form.Group className="mb-3">
          <Form.Select name="leyes" value={selectedId} onChange={handleChange}>
            <option value="">¿Buscas una ley específica?</option>
            {leyes
              .slice()
              .sort((a, b) => b.id - a.id)
              .map((ley) => (
                <option key={ley.id} value={ley.id}>
                  Seleccionar Ley: {ley.id}
                </option>
              ))}
          </Form.Select>
        </Form.Group>

        {ley && (
          <div>
            <Alert variant="success">
              <Alert.Heading>
                <h2>{ley.title}</h2>
              </Alert.Heading>
              <h4 className="mt-3 mb-2">Resumen</h4>
              <p>{ley.content}</p>
              <a href={ley.link} target="blank">
                <Button variant="primary" size="sm" className="mt-2">
                  Ver Ley
                </Button>
              </a>
            </Alert>
          </div>
        )}
      </div>
      <ColoredLine color="blue" />
    </>
  );
}

export default Buscador;
