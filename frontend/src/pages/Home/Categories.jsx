import React from 'react';
import {Col, DropdownItem} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Categories = ({ categorias, onClick, size }) => (
  <Col {...size}>
    {categorias.length === 0
      ? "-"
      : categorias.map((el, index) => (
          <DropdownItem
            key={el.id}
            onClick={() => onClick(el.id)}
            style={el.selected ? styles.Selected : styles.unSelected}
          >
            {el.title}
            {el.selected ? <FontAwesomeIcon icon={faCheck} /> : ""}
          </DropdownItem>
        ))}
  </Col>
);

const styles = {
  unSelected: {
    color: "#97878f"
  },
  Selected: {
    color: "#97878f",
    fontWeight: "bold"
  }
}

export default Categories;