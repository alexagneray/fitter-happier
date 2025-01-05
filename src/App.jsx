import { MoreProductive } from "./components/MoreProductive";
import MenuNavBar from "./components/MenuNavBar";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col } from "react-bootstrap";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GenericPage from "./pages/GenericPage";
import MoreProductivePage from "./pages/MoreProductivePage";
import WhyPage from "./pages/WhyPage";

// const ACTIONS = [
//   { id: 0, name: "Faire du sport", checked: false, checkDate: null },
//   { id: 1, name: "Lire un livre", checked: false, checkDate: null },
//   { id: 2, name: "Méditer", checked: false, checkDate: null },
// ];

function App() {
  return (
    <Container>
      <Row>
        <Col></Col>
      </Row>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GenericPage pageElem={<HomePage />} />} />
          <Route
            path="/moreproductive"
            element={<GenericPage pageElem={<MoreProductivePage />} />}
          />
          <Route path="/why" element={<GenericPage pageElem={<WhyPage />} />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

function NowSelfEmployed() {
  return <p>Now self employed</p>;
}
export default App;
