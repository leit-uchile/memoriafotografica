import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const Categories = ({ cats, onRedirect, style }) => (
  <Container fluid style={style}>
    <Row>
      <Col style={{ fontSize: "1.2em" }}>
        <p>
          {cats.length === 0
            ? "No se encuentra en una categoría"
            : cats.map((el, index) => (
                <span style={{ marginRight: "0.2em" }} key={index}>
                  {el.title}
                </span>
              ))}
          <Link style={{ marginLeft: "0.2em" }} to="#">
            Sugerir
          </Link>
        </p>
      </Col>
    </Row>
  </Container>
);

export default Categories;
