import React from "react";
import HomePage from "../pages/homePage";

export default function Menu() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <HomePage />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="menu-link" to="/products">
              Home
            </Link>
            <Link className="menu-link" to="/favourite">
              Favourite
            </Link>
            <Link className="menu-link" to="/add-product">
              Add product
            </Link>
            <Link className="menu-link" to="/chat">
              Chat
            </Link>
            <Link className="menu-link" to="/login">
              {token != null ? "Logout" : "Login"}
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Link to={"/cart"}>
          <FontAwesomeIcon icon={faCartShopping} />
          <span>{getTotalItem}</span>
        </Link>
      </Container>
    </Navbar>
  );
}
