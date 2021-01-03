import React from "react";
import { Table, Badge } from "reactstrap";
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
          <th>Nombre</th>
          <th>Imagen</th>
          <th>Estado</th>
          <th>Descripci&oacute;n</th>
          <th>Subida el</th>
          <th># Metadata</th>
          <th>Acci&oacute;n</th>
        </tr>
      </thead>
      <tbody>
        {photos.map((el, key) => (
          <tr key={el.id}>
            <td>{el.title}</td>
            <td>
              <img alt={el.title} src={el.thumbnail} width="100px%" />
              <div>
                <Link to={`/photo/${el.id}`}>Ver imagen</Link>
              </div>
            </td>
            <td style={{ fontSize: "1.2em" }}>
              {el.approved ? (
                <Badge pill color="success">
                  Aprobada{" "}{check}
                </Badge>
              ) : (
                <Badge pill color="warning">No aprobada</Badge>
              )}
              <br></br>
              {el.censure ? (
                <Badge pill color="danger">Censurada</Badge>
              ) : null}
            </td>
            <td>{el.description}</td>
            <td>{new Date(el.created_at).toLocaleDateString("es")}</td>
            <td>
              {el.metadata.map((m) => (
                <span key={m} style={{ display: "block" }}>
                  {m}
                </span>
              ))}
            </td>
            <td>
              <FilterModal key={key} photoId={el.id} editPhoto={editPhoto} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PhotoList;
