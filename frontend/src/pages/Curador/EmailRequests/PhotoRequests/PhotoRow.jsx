import React from "react";
import { Button, Badge } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTasks } from "@fortawesome/free-solid-svg-icons";

const check = <FontAwesomeIcon icon={faCheckCircle} />;

/**
 * Render design pattern
 * @param {Object} request
 * @param {Function} render how to render details
 * @param {Function} actions how to render actions
 */
const PhotoRow = ({ request, key, actions, render }) => {
  //It takes only user details
  const userDetails = (req) => {
    let reqCopy = { ...req };
    delete reqCopy.photos;
    delete reqCopy.resolved;
    delete reqCopy.approved;
    delete reqCopy.created_at;
    delete reqCopy.updated_at;
    return reqCopy;
  };
  return (
    <tr>
      <td>{render(userDetails(request))}</td>
      <td>{request.reason}</td>
      <td style={{ fontSize: "1.2em" }}>
        {request.resolved ? (
          <Badge pill color="success">
            Resuelto {check}
          </Badge>
        ) : (
          <Badge pill color="warning">
            Pendiente
          </Badge>
        )}
      </td>
      <td>{new Date(request.created_at).toLocaleDateString("es")}</td>
      <td>{new Date(request.updated_at).toLocaleDateString("es")}</td>
      <td>
        {request.resolved ? (
          request.approved ? (
            <b>Aprobada</b>
          ) : (
            <b>No Aprobada</b>
          )
        ) : (
          <Button className="action" onClick={() => actions(request.id)}>
            <FontAwesomeIcon icon={faTasks} />
          </Button>
        )}
      </td>
    </tr>
  );
};

export default PhotoRow;
