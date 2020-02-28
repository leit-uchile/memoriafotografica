import React from "react";
import { Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const check = <FontAwesomeIcon icon={faCheckCircle} />;

const PhotoList = ({ photos, onApprove }) => {
  return (
    <Table responsive striped>
      <thead>
        <tr>
          <th>
            <input type="checkbox"></input>
          </th>
          <th>Estado</th>
          <th>Titulo</th>
          <th>Imagen</th>
          <th>Descripcion</th>
          <th>Autor</th>
          <th>Metadata</th>
          <th>Fecha de subida</th>
        </tr>
      </thead>
      <tbody>
        {photos.map((el, key) => (
          <tr key={el.id}>
            <td>
              <input type="checkbox"></input>
            </td>
            <td>
              {el.approved ? (
                <span style={{ color: "green" }}>Aprobada{check}</span>
              ) : <span style={{ color: "red" }}>No Aprobada</span>}
              <br></br>
              {el.censured ? (
                <span style={{ color: "red" }}>Censurada</span>
              ) : null}
            </td>
            <td>{el.title}</td>
            <td>
              <img alt={el.title} src={el.thumbnail} width="100px%" />
            </td>
            <td>{el.description}</td>
            <td>
              <Link to={`/user/public/${el.usuario.id}`}>
                {el.usuario.first_name} {el.usuario.last_name}
              </Link>
            </td>
            <td>
              {el.metadata.map(m => (
                <span style={{ display: "block" }}>{m}</span>
              ))}
            </td>
            <td>{new Date(el.created_at).toLocaleDateString("es")}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PhotoList;
