import React from "react";
import { Container, Row, Col } from "reactstrap";
import {Link} from 'react-router-dom';
import "./noMatch.css"

const NoMatch = ({ location }) => {
  return (
    <div style={{ minHeight: "75vh" }} className="page404">
      <Container style={{ textAlign: "center"}}>
        <Row>
          <Col sm={6} className="page404-right">
            <h2>404</h2>
            <h4 style={{textAlign: "center"}}>Oops</h4>
          </Col>
          <Col sm={6} className="page404-left">
            <p>
              La p&aacute;gina <b>{location.pathname}</b> no existe o ya no esta disponible.
            </p>
            <p>
              Si crees que esto es un error contactanos en <Link to="/misc/resources/contact-us">Contacto</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NoMatch;
