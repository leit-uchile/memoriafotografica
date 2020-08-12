import React from "react";
import { Col, DropdownItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./categories.css";

const Categories = ({ categorias, onClick, size }) => (
  <Col {...size} style={{ margin: "0", padding: "0" }}>
    {categorias.length === 0
      ? ""
      : categorias.map((el, index) => (
          <DropdownItem
            key={el.id}
            onClick={() => onClick(el.id)}
            className={`categories ${el.selected ? "selected" : ""}`}
          >
            {el.title}{" "}
            {el.selected ? (
              <FontAwesomeIcon style={{ fontSize: "inherit" }} icon={faCheck} />
            ) : (
              ""
            )}
          </DropdownItem>
        ))}
  </Col>
);

export default Categories;
