import React, { useState, useEffect, Fragment } from "react";
import { Table, Button, Badge } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faPencilAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles.css";
import ModifyModal from "./ModifyModal";

const check = <FontAwesomeIcon icon={faCheckCircle} />;

/**
 * Displays a list of metadata
 *
 * Allows selection and updates parent state.
 * The information sent upstream is an array of array index
 * in the shape ["nb-0", "nb-3", ...]
 *
 * @param {Array} metadata for manipulation and selection
 * @param {Array} iptcs for name mapping
 * @param {Function} getSelection recovers the position of the metadata that's selected
 */
const MetadataList = ({ metadata, iptcs, getSelection, update }) => {
  const [state, setState] = useState({});
  const [checkAll, setCheckAll] = useState(false);
  const mapNames = (id) => iptcs.filter((el) => el.id === id)[0].name;
  const [operation, setOperation] = useState("0");
  const [modify, setToModify] = useState([]);
  const [toggleModify, setToggleModify] = useState(false);

  // Useful to init and reset when user changes page or elements
  useEffect(() => {
    // List changed ?
    if (metadata[0] && state[metadata[0].value] === undefined) {
      let selected = {};
      metadata.forEach((element, key) => {
        selected[element.value] = false;
      });
      setState(selected);
      getSelection(selected);
    }
    // eslint-disable-next-line
  }, [metadata, update]);

  const selectAll = () => {
    let selected = {};
    metadata.forEach((element, key) => {
      selected[element.value] = !checkAll;
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
      <ModifyModal
        op={operation}
        selected={modify}
        iptcs={iptcs}
        open={toggleModify}
        toggle={() => setToggleModify(!toggleModify)}
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
            <th>Valor</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Creada el</th>
            <th>Ultima actualizaci&oacute;n</th>
            <th>Acci&oacute;n</th>
          </tr>
        </thead>
        <tbody>
          {metadata.map((el, key) => (
            <tr key={key}>
              <td>
                <input
                  type="checkbox"
                  checked={state[el.value]}
                  onChange={() => toggleElement(el.value, key)}
                ></input>
              </td>
              <td>{el.value}</td>
              <td>{mapNames(el.metadata)}</td>
              <td style={{ fontSize: "1.2em" }}>
                {el.approved ? (
                  <Badge pill color="success">
                    Aprobada {check}
                  </Badge>
                ) : (
                  <Badge pill color="danger">
                    No aprobada
                  </Badge>
                )}
              </td>
              <td>{new Date(el.created_at).toLocaleDateString("es")}</td>
              <td>{new Date(el.updated_at).toLocaleDateString("es")}</td>
              <td>
                <Button
                  className="action"
                  onClick={() => {
                    setToModify([el]);
                    setOperation("Modificar Selección");
                    setToggleModify(!toggleModify);
                  }}
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </Button>
                <Button
                  className="action"
                  onClick={() => {
                    setToModify([el]);
                    setOperation("Eliminar");
                    setToggleModify(!toggleModify);
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

export default MetadataList;
