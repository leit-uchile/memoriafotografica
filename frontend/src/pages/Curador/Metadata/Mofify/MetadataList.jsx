import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
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
const MetadataList = ({ metadata, iptcs, getSelection }) => {
  // When the lists changes reset selection
  useEffect(() => {
    // List changed ?
    if (metadata[0] && state[metadata[0].value] === undefined) {
      let selected = {};
      metadata.forEach((element, key) => {
        selected[element.value] = false;
      });
      selected.checked = false;
      setState(selected);
    }
    //eslint-disable-next-line
  }, [metadata]);

  const [state, setState] = useState({ checked: false });

  const mapNames = (id) => iptcs.filter((el) => el.id === id)[0].name;

  const selectAll = () => {
    let selected = {};
    metadata.forEach((element, key) => {
      selected[element.value] = !state.checked;
      if (!state.checked) {
        selected["nb-" + key] = !state.checked;
      }
    });
    selected.checked = !state.checked;
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
    <Table responsive striped>
      <thead>
        <tr>
          <th>
            <input type="checkbox" onChange={() => selectAll()}></input>
          </th>
          <th>Estado</th>
          <th>Valor</th>
          <th>Tipo</th>
          <th>Fecha de subida</th>
          <th>Fecha de Modificaci&oacute;n</th>
        </tr>
      </thead>
      <tbody>
        {metadata.map((el, key) => (
          <tr key={el.id}>
            <td>
              <input
                type="checkbox"
                checked={state[el.value]}
                onChange={() => toggleElement(el.value, key)}
              ></input>
            </td>
            <td>
              {el.approved ? (
                <span style={{ color: "green" }}>Aprobada{check}</span>
              ) : (
                <span style={{ color: "red" }}>No Aprobada</span>
              )}
              <br></br>
              {el.censured ? (
                <span style={{ color: "red" }}>Censurada</span>
              ) : null}
            </td>
            <td>{el.value}</td>
            <td>{mapNames(el.metadata)}</td>
            <td>{new Date(el.created_at).toLocaleDateString("es")}</td>
            <td>{new Date(el.updated_at).toLocaleDateString("es")}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MetadataList;
