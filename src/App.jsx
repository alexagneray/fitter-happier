import { useState } from "react";

import { MoreProductive } from "./MoreProductive";
import MenuNavBar from "./MenuNavBar";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col } from "react-bootstrap";

// const ACTIONS = [
//   { id: 0, name: "Faire du sport", checked: false, checkDate: null },
//   { id: 1, name: "Lire un livre", checked: false, checkDate: null },
//   { id: 2, name: "Méditer", checked: false, checkDate: null },
// ];

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <MenuNavBar />
        </Col>
      </Row>
      <MoreProductive />
    </Container>
  );
}

function NowSelfEmployed() {
  return <p>Now self employed</p>;
}
export default App;
