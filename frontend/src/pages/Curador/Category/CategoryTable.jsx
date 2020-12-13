import React from "react";
import { Table, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import "../styles.css";
import EditModal from "./EditModal";

export const CategoryTable = ({ cats, updateToDelete, toDelete, redirect }) => (
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
      {cats.map((el) => (
        <tr key={el.id}>
          <th>
            <input
              type="checkbox"
              aria-label="Checkbox for delete Categories"
              onClick={(e) => updateToDelete(el.id, e.target.checked)}
              defaultChecked={toDelete.includes(el.id)}
            ></input>
          </th>
          <th>{el.title}</th>
          <td>{new Date(el.created_at).toLocaleString()}</td>
          <td>{new Date(el.updated_at).toLocaleString()}</td>
          <td>{el.count}</td>
          <td>
            {/* <EditModal catDetails={el}/> */}
            <Button
              onClick={() =>
                redirect(`/curador/dashboard/categories/${el.id}/`)
              }
            >
              Ver/Editar fotos <FontAwesomeIcon icon={faImage} />
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);
