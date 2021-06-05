import React, { useState, useEffect, Fragment } from "react";
import { Table, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../styles.css";
import DeleteModal from "./DeleteModal";

const CategoryTable = ({
  cats,
  getSelection,
  redirect,
  removeCategories,
  update,
}) => {
  const [state, setState] = useState({});
  const [checkAll, setCheckAll] = useState(false);
  const [catToDelete, setCat] = useState([]);
  const [toggleDelete, setToggleDelete] = useState(false);

  // Useful to init and reset when user changes page or elements
  useEffect(() => {
    // List changed ?
    if (cats[0] && state[cats[0].title] === undefined) {
      let selected = {};
      cats.forEach((element, key) => {
        selected[element.title] = false;
      });
      setState(selected);
      getSelection(selected);
    }
    // eslint-disable-next-line
  }, [cats, update]);

  const selectAll = () => {
    let selected = {};
    cats.forEach((element, key) => {
      selected[element.title] = !checkAll;
      if (!checkAll) {
        selected["nb-" + key] = !checkAll;
      }
    });
    setCheckAll(!checkAll);
    setState(selected);
    getSelection(selected);
  };

  const toggleElement = (val, key) => {
    let update = { ...state };
    update[val] = !state[val];
    if (!state[val]) {
      update["nb-" + key] = !state[val];
    } else {
      delete update["nb-" + key];
    }
    setState(update);
    getSelection(update);
  };

  return (
    <Fragment>
      <DeleteModal
        toggle={toggleDelete}
        setToggle={setToggleDelete}
        toDelete={catToDelete}
        removeCategories={removeCategories}
      />
      <Table responsive striped className="statBox">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={() => selectAll()}
                value={checkAll}
              ></input>
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
                  checked={state[el.title]}
                  onChange={() => toggleElement(el.title, key)}
                ></input>
              </th>
              <th>{el.title}</th>
              <td>{new Date(el.created_at).toLocaleString()}</td>
              <td>{new Date(el.updated_at).toLocaleString()}</td>
              <td>{el.count}</td>
              <td>
                {/* <EditModal catDetails={el}/> */}
                <Button
                  className="action"
                  onClick={() =>
                    redirect(`/curador/dashboard/categories/${el.id}/`)
                  }
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Button>
                <Button
                  className="action"
                  onClick={() => {
                    setCat([el.id]);
                    setToggleDelete(!toggleDelete);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default CategoryTable;
