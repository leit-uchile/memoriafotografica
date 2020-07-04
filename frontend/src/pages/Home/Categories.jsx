import React from 'react';
import {Col, DropdownItem} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const Categories = ({ categorias, onClick, size }) => (
  <Col {...size}>
    {categorias.length === 0
      ? ""
      : categorias.map((el, index) => (
          <DropdownItem
            key={el.id}
            onClick={() => onClick(el.id)}
            style={el.selected ? styles.selected : styles.unselected}
          >
            {el.title}
            {el.selected ? <FontAwesomeIcon icon={faCheck} /> : ""}
          </DropdownItem>
        ))}
  </Col>
);

const styles = {
  unselected: {
    color: "#97878f"
  },
  selected: {
    color: "#97878f",
    fontWeight: "bold"
  }
}

export default Categories;