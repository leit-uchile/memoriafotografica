import React from "react";
import "../../components/Routes/noMatch.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Container,
  Row,
  Col,
} from "reactstrap";
import {
  faCheck,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";


const  MessageConfirmation = ({ status }) => (
  <Container style={{ textAlign: "center", marginTop: "2em" }}>
    <Row style={{ marginTop: "10rem" }}>
      <Col sm={12} md={6}>
        {status ? (
          <FontAwesomeIcon
            icon={faCheck}
            style={{ color: "green" }}
            size={"10x"}
          />
        ) : (
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            style={{ color: "red" }}
            size={"10x"}
          />
        )}
      </Col>
      <Col sm={12} md={6} style={{ alignSelf: "center" }}>
        {status ? (
          <>
            <h2>¡Activacion exitosa!</h2>
            <p style={{ marginTop: "2em" }}>
              Haz activado tu cuenta. Ahora puedes hacer uso del repositorio
            </p>
          </>
        ) : (
          <>
            <h2>No pudimos activar tu cuenta</h2>
            <p style={{ marginTop: "2em" }}>
              El código ya fue usado o ha expirado. Si esto persiste por favor
              informanos a{" "}
              <a href="mailto:soporte@leit.cl?Subject=Error%20en%20el%20sitio">
                soporte&#64;leit.cl
              </a>
            </p>
          </>
        )}
      </Col>
    </Row>
  </Container>
);




export default MessageConfirmation