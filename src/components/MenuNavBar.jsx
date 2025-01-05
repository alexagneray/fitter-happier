import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

export default function MenuNavBar(option, setOption) {
  return (
    <>
      <Navbar expand="lg" className="bg-info">
        <Container>
          <Navbar.Brand href="#home">
            <img src="art1.jpg" width={100} />
            <em
              style={{
                fontSize: "2em",
                borderRight: "1px rgb(46, 46, 46) solid",
                paddingRight: "20px",
              }}
            >
              &nbsp;Fitter, Happier
            </em>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>Why ?</Nav.Link>
              <Nav.Link>More Productive</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr />
    </>
  );
}
