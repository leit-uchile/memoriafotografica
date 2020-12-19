import React, { useState } from "react";
import { Table, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles.css";

const CategoryTable = ({ cats, updateToDelete, toDelete, redirect }) => {
  const [state, setState] = useState({});
  const [checkAll, setCheckAll] = useState(false);

  return (
    <Table responsive striped className="statBox">
      <thead>
        <tr>
          <th>
            <input type="checkbox" value={checkAll}></input>
          </th>
          <th>Nombre</th>
          <th>Creada el</th>
          <th>&Uacute;ltima actualizaci&oacute;n</th>
          <th># Fotos</th>
          <th>Acci&oacute;n</th>
        </tr>
      </thead>
      <tbody>
        {cats.map((el, key) => (
          <tr key={key}>
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
                color="secondary"
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </Button>
              {/* <Button color="danger">
                <FontAwesomeIcon icon={faTrash} />
              </Button> */}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CategoryTable;
