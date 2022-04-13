import React from "react";
import { Container, Navbar } from "react-bootstrap";
export const Header = () => {
  return (
    <div>
      <Navbar bg="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <img
              src="https://www.ats-digital.com/wp-content/themes/ats-digital-theme/theme/images/logos/Logo-T.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};
