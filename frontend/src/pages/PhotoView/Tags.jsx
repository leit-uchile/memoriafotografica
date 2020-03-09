import React from "react";
import { Container, Row, Col, Badge } from "reactstrap";
import { Link } from "react-router-dom";

const Tags = ({ tags, onRedirect, style }) => (
  <Container fluid style={style}>
    <Row>
      <Col style={{ fontSize: "12px"}}>
        {tags.length === 0 ? (
          <span>No hay tags asociados</span>
        ) : (
          tags.map((el, index) => (
            <Badge
              key={el.id}
              color="secondary"
              style={{ cursor: 'pointer', fontSize: '12px'}}
              pill
              onClick={e => onRedirect(el.id, el.value)}
            >
              #{el.value}
            </Badge>
          ))
        )}
        <Link style={{ marginLeft: "0.2em" }} to="#">
          Sugerir
        </Link>
      </Col>
    </Row>
  </Container>
);

export default Tags;