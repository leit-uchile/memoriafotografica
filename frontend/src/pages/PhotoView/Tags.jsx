import React from "react";
import { Container, Row, Col, Badge } from "reactstrap";
import { Link } from "react-router-dom";

const Tags = ({ tags, onRedirect, style }) => (
  <Container fluid style={style}>
    <Row>
      <Col style={{ fontSize: "1.2em" }}>
        {tags.length === 0 ? (
          <p>No hay tags asociados</p>
        ) : (
          tags.map((el, index) => (
            <Badge
              key={el.id}
              color="secondary"
              pill
              onClick={e => onRedirect(el.id, el.value)}
            >
              #{el.value}
            </Badge>
          ))
        )}
        <Link style={{ marginLeft: "0.2em", fontSize: "12px" }} to="#">
          Sugerir
        </Link>
      </Col>
    </Row>
  </Container>
);

export default Tags;