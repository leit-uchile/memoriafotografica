import React from "react";
import { Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import FilterModal from "./FilterModal";
import "../styles.css";

const check = <FontAwesomeIcon icon={faCheckCircle} />;

const PhotoList = ({ photos, editPhoto }) => {
  return (
    <Table responsive striped className="statBox">
      <thead>
        <tr>
          {/* <th>
            <input type="checkbox"></input>
          </th> */}
          <th>Estado</th>
          <th>Titulo</th>
          <th>Imagen</th>
          <th>Descripcion</th>
          <th>Autor</th>
          <th>Metadata</th>
          <th>Fecha de subida</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {photos.map((el, key) => (
          <tr key={el.id}>
            {/* <td>
              <input type="checkbox"></input>
            </td> */}
            <td>
              {el.approved ? (
                <span style={{ color: "green" }}>Aprobada{check}</span>
              ) : (
                <span style={{ color: "red" }}>No Aprobada</span>
              )}
              <br></br>
              {el.censure ? (
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
              {el.metadata.map((m) => (
                <span key={m} style={{ display: "block" }}>
                  {m}
                </span>
              ))}
            </td>
            <td>{new Date(el.created_at).toLocaleDateString("es")}</td>
            <td>
              <FilterModal
                editPhoto={editPhoto}
                buttonLabel="Gestionar"
                photo={el}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PhotoList;
