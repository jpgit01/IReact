import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert';

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
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2>¿Buscas una ley específica?</h2>
          </div>
        </div>
        <Form.Group className="mb-3">
          <Form.Select name="leyes" value={selectedId} onChange={handleChange}>
            <option value="">¿Buscas una ley especifica?</option>
            {leyes.map((ley) => (
              <option key={ley.id} value={ley.id}>
                Ley Número: {ley.id}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {ley && (
          <div>
            <Alert variant="success">
              <Alert.Heading><h2>{ley.title}</h2></Alert.Heading>
              <p>{ley.content}</p>
            </Alert>
          </div>
        )}
      </div>
      <ColoredLine color="blue" />
    </>
  );
}

export default Buscador;
