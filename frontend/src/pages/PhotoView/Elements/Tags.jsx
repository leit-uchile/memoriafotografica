import React, { Fragment } from "react";
import { Badge } from "reactstrap";
import { Link } from "react-router-dom";

const Tags = ({ tags, onRedirect }) => (
  <Fragment>
    <br />
    <h5 style={{ textAlign: "left" }}>Etiquetas</h5>
    {tags.length === 0 ? (
      <span style={{fontStyle: 'italic'}}>No hay tags asociados</span>
    ) : (
      tags.map((el, index) => (
        <Badge
          className="tags"
          key={el.id}
          pill
          onClick={(e) => onRedirect(el.id, el.value)}
        >
          #{el.value}
        </Badge>
      ))
    )}
    <Link style={{ marginLeft: "0.2em" }} to="#">
      Sugerir
    </Link>
  </Fragment>
);

export default Tags;
