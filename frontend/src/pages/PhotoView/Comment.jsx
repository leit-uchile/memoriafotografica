import React from "react";
import { Container, Row, Col } from "reactstrap";
import ReportModal from "../../components/ReportModal";

const Comment = ({ content: { content, censure, usuario, id } }) => {
  var userName =
    usuario.first_name !== "" && usuario.first_name !== null
      ? `${usuario.first_name} ${usuario.last_name}`
      : "[nombre de usuario]";

  return (
    <Container
      fluid
      className="commentDiv"
      style={{
        backgroundColor: "#e9ecef",
        borderRadius: "5px",
        padding: "0.5em"
      }}>
      <Row>
        <Col xs={3} md={2} ld={1}>
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "25px",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${usuario.avatar})`,
              backgroundColor: "#ff5a60",
              marginRight: "auto"
            }}></div>
        </Col>
        <Col xs={9} md={10} ld={11}>
          <div
            style={{
              display: "inline-block",
              borderRight: "2px solid gray",
              padding: "0 15px 0 0"
            }}>
            <b>{userName}</b>
          </div>
          <div style={{ display: "inline-block", padding: "0 15px" }}>
            {usuario.rol_type}
          </div>
          <ReportModal
            style={{ display: "inline-block" }}
            className="float-right"
            photoId={id}
            reportTitle={"Reportar Comentario"}
            options={[
              "Contenido inapropiado",
              "Incita a la violencia",
              "Contenido difamatorio"
            ]}
            helpText={
              "Si consideras que hay un problema con esta comentario por favor envíamos un reporte mediante este formulario."
            }
            reportType={3}
            buttonTitle={"Comentario inapropiado"}
          />
          <p style={{ display: "block" }}>{content}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Comment;
