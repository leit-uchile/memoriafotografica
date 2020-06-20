import React, { Fragment } from "react";
import { Container, Row, Col, Badge } from "reactstrap";
import { Link } from "react-router-dom";

const Categories = ({ cats, onRedirect }) => (
  <Fragment>
    <br />
    <h5>Categorias</h5>
    <p>
      {cats.length === 0 ? (
        <span>No se encuentra en una categoría</span>
      ) : (
        cats.map((el, index) => (
          <Badge
            key={index}
            color="primary"
            style={{
              cursor: "pointer",
              fontSize: "12px",
              marginRight: "0.2em",
            }}
            pill
            onClick={(e) => onRedirect(el.id, el.value)}
          >
            {el.title}
          </Badge>
        ))
      )}
      <Link style={{ marginLeft: "0.2em" }} to="#">
        Sugerir
      </Link>
    </p>
  </Fragment>
);

export default Categories;
