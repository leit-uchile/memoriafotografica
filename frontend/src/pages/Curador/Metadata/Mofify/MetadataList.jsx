import React from "react";
import { Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const check = <FontAwesomeIcon icon={faCheckCircle} />;

const MetadataList = ({ metadata, iptcs }) => {
  const mapNames = (id) => iptcs.filter((el) => el.id === id)[0].name;
  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th>
            <input type="checkbox"></input>
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
              <input type="checkbox"></input>
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
