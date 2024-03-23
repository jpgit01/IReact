import React, { useState } from "react";
import "./App.css";
import MiApi from "./components/MiApi";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const [leyes, setLeyes] = useState([]);

  return (
    <>
      <Container>
        <Row>
          <Col className="col-md-12">
            <MiApi setLeyes={setLeyes} />
            {console.log(leyes)}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
