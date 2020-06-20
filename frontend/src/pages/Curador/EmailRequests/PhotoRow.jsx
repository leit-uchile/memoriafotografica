import React from "react";
import { Button } from "reactstrap";

/**
 * Render design pattern
 * @param {Object} request
 * @param {Function} render how to render details
 * @param {Function} actions how to render actions
 */
const PhotoRow = ({ request, key, actions, render }) => {
  const onlyInfo = (req) => {
    let reqCopy = { ...req };
    delete reqCopy.photos;
    delete reqCopy.resolved;
    delete reqCopy.email_sent;
    delete reqCopy.created_at;
    delete reqCopy.updated_at;
    return reqCopy;
  };
  return (
    <tr>
      <td>
        <Button
          color="danger"
          disabled={request.resolved}
          onClick={() => actions(request.id)}
        >
          Gestionar
        </Button>
      </td>
      <td
        style={
          request.resolved
            ? request.email_sent
              ? { color: "green" }
              : { color: "red" }
            : { color: "red" }
        }
      >
        {request.resolved
          ? request.email_sent
            ? "Aprobada"
            : "Rechazada"
          : "Sin resolver"}
      </td>
      <td>{new Date(request.created_at).toLocaleDateString("es")}</td>
      <td>{new Date(request.updated_at).toLocaleDateString("es")}</td>
      <td>{request.reason}</td>
      <td>{render(onlyInfo(request))}</td>
    </tr>
  );
};

export default PhotoRow;
