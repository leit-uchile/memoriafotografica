import React from "react";
import { Table, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export const CategoryTable = ({ cats, updateToDelete, toDelete }) => (
  <Table responsive striped className="statBox">
    <thead>
      <th></th>
      <th>Nombre</th>
      <th>Fecha Creación</th>
      <th>Fecha Actualización</th>
      <th># Fotos</th>
      <th>Editar</th>
    </thead>
    <tbody>
      {cats.length > 0 ? (
        cats.map((el) => (
          <tr key={el.id}>
            <th>
              <input
                type="checkbox"
                aria-label="Checkbox for delete Categories"
                onClick={(e) => updateToDelete(el.id, e.target.checked)}
                checked={toDelete.includes(el.id)}
              ></input>
            </th>
            <th>{el.title}</th>
            <td>{new Date(el.created_at).toLocaleString()}</td>
            <td>{new Date(el.updated_at).toLocaleString()}</td>
            <td>{el.count}</td>
            <td>
              <Button>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
            </td>
          </tr>
        ))
      ) : (
        <span>No existen categorias</span>
      )}
    </tbody>
  </Table>
);
