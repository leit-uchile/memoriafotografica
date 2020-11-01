import React from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
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
      <td>
        {request.resolved
          ? request.approved 
            ? (
            <span style={{ color: "green" }}>Aprobada{check}</span>
            )  : (
            <span style={{ color: "red" }}>No Aprobada</span>
            )
          : <span style={{ color: "red" }}>Sin Resolver</span>}
      </td>
      <td>{render(userDetails(request))}</td>
      <td>{request.reason}</td>
      <td>{new Date(request.created_at).toLocaleDateString("es")}</td>
      <td>{new Date(request.updated_at).toLocaleDateString("es")}</td>
      <td>
        <Button
          color="danger"
          disabled={request.resolved}
          onClick={() => actions(request.id)}
        >
          Gestionar
        </Button>
      </td>
    </tr>
  );
};

export default PhotoRow;
