import React from "react";
import { Table, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faImage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../styles.css";

export const CategoryTable = ({ cats, updateToDelete, toDelete, onAdd }) => (
  <Table responsive striped className="statBox">
    <thead>
      <tr>
        <th></th>
        <th>Nombre</th>
        <th>Fecha Creación</th>
        <th>Fecha Actualización</th>
        <th># Fotos</th>
        <th>Acci&oacute;n</th>
      </tr>
    </thead>
    <tbody>
      {cats.length !== 0
        ? cats.map((el) => (
            <tr key={el.id}>
              <th>
                <input
                  type="checkbox"
                  aria-label="Checkbox for delete Categories"
                  onClick={(e) => updateToDelete(el.id, e.target.checked)}
                  defaultChecked={toDelete.includes(el.id)}
                ></input>
              </th>
              <th>
                <Link to={`/curador/dashboard/categories/${el.id}/`}>
                  <FontAwesomeIcon icon={faEdit} /> {el.title}
                </Link>
              </th>
              <td>{new Date(el.created_at).toLocaleString()}</td>
              <td>{new Date(el.updated_at).toLocaleString()}</td>
              <td>{el.count}</td>
              <td>
                <Button onClick={() => onAdd(el.id)}>
                  Agregar <FontAwesomeIcon icon={faImage} />
                </Button>
              </td>
            </tr>
          ))
        : null}
    </tbody>
  </Table>
);
