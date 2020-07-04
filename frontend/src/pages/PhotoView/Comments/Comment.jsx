import React, { useState } from "react";
import { Container, Row, Col, Button, Input } from "reactstrap";
import { connect } from "react-redux";
import { gallery } from "../../../actions";
import ReportModal from "../../../components/ReportModal";
import { Link } from "react-router-dom";
import moment from "moment";

const Comment = ({
  element: { content, censure, usuario, id, created_at, updated_at },
  viewerId,
  updateComment,
  deleteComment,
}) => {
  var userName =
    usuario.first_name !== "" && usuario.first_name !== null
      ? `${usuario.first_name} ${usuario.last_name}`
      : "[nombre de usuario]";
  const [editing, setEditing] = useState(false);
  const [newComment, setNewComment] = useState(content);
  return (
    <Container
      fluid
      className="commentDiv"
      style={{
        border: "1px solid #ccc",
        borderRadius: "3px",
        backgroundColor: "var(--leit-bg-gray)",
        padding: "0.5em",
      }}
    >
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
              backgroundColor: "var(--leit-pink)",
              marginLeft: "auto",
            }}
          ></div>
        </Col>
        <Col xs={9} md={10} ld={11}>
          <div
            style={{
              display: "inline-block",
              borderRight: "2px solid gray",
              padding: "0 15px 0 0",
            }}
          >
            <b>
              <Link to={"/user/public/" + usuario.id + "/"}>{userName}</Link>
            </b>
          </div>
          {created_at ? (
            moment(created_at).format("hh:mm") ===
            moment(updated_at).format("hh:mm") ? (
              <div
                style={{
                  display: "inline-block",
                  padding: "0 15px",
                  color: "#999",
                }}
              >
                {" "}
                Publicado el {moment(created_at).format("DD/MM/YYYY")} a las{" "}
                {moment(created_at).format("hh:mm")}{" "}
              </div>
            ) : (
              <div
                style={{
                  display: "inline-block",
                  padding: "0 15px",
                  color: "#999",
                }}
              >
                {" "}
                Editado el {moment(updated_at).format("DD/MM/YYYY")} a las{" "}
                {moment(updated_at).format("hh:mm")}{" "}
              </div>
            )
          ) : (
            <div
              style={{
                display: "inline-block",
                padding: "0 15px",
                color: "#999",
              }}
            >
              Cargando...
            </div>
          )}
          {usuario.id === viewerId ? (
            !editing ? (
              <div style={{ display: "inline-block", padding: "0" }}>
                <Button
                  color="link"
                  style={{ display: "inline-block", padding: "0" }}
                  onClick={() => setEditing(true)}
                >
                  Editar
                </Button>
                <Button
                  color="link"
                  style={{ display: "inline-block", padding: "0" }}
                  onClick={() => deleteComment(id)}
                >
                  Eliminar
                </Button>
              </div>
            ) : (
              <div style={{ display: "inline-block", padding: "0" }}>
                <Button
                  color="link"
                  style={{ display: "inline-block", padding: "0" }}
                  onClick={() => {
                    content !== newComment
                      ? updateComment(id, newComment, moment(Date(Date.now())))
                      : setEditing(false);
                    setEditing(false);
                  }}
                >
                  Guardar
                </Button>
                <Button
                  color="link"
                  style={{ display: "inline-block", padding: "0" }}
                  onClick={() => {
                    setNewComment(content);
                    setEditing(false);
                  }}
                >
                  Descartar
                </Button>
              </div>
            )
          ) : null}
          <ReportModal
            style={{ display: "inline-block" }}
            className="float-right"
            elementId={id}
            reportTitle={"Reportar Comentario"}
            options={[
              "Contenido inapropiado",
              "Incita a la violencia",
              "Contenido difamatorio",
            ]}
            helpText={
              "Si consideras que hay un problema con esta comentario por favor envíamos un reporte mediante este formulario."
            }
            reportType={3}
            buttonTitle={"Comentario inapropiado"}
          />
          {editing ? (
            <Input
              type="text"
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
            />
          ) : (
            <p style={{ display: "block" }}>{content}</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

const mapActionsToProps = (dispatch) => ({
  updateComment: (id, comment, date) =>
    dispatch(gallery.comments.editComment(id, comment, date)),
  deleteComment: (id) => dispatch(gallery.comments.deleteComment(id)),
});
export default connect(null, mapActionsToProps)(Comment);

//export default Comment;
