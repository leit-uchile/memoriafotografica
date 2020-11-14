import React, { useState } from "react";
import { Container, Row, Col, Button, Input } from "reactstrap";
import { connect } from "react-redux";
import { gallery } from "../../../actions";
import ReportModal from "../../../components/ReportModal";
import { Link } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { bindActionCreators } from "redux";
import "./styles.css";

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
    <Container fluid className="commentDiv">
      <Row>
        <Col xs={3} md={2} ld={1}>
          <div
            className="comment-photo"
            style={{
              backgroundImage: `url(${usuario.avatar})`,
            }}
          ></div>
        </Col>
        <Col xs={9} md={10} ld={11}>
          <div className="comment-user">
            <b>
              <Link to={"/user/public/" + usuario.id + "/"}>{userName}</Link>
            </b>
          </div>
          {created_at ? (
            moment(created_at).format("hh:mm") ===
            moment(updated_at).format("hh:mm") ? (
              <div className="comment-date">
                {" "}
                Publicado el {moment(created_at).format("DD/MM/YYYY")} a las{" "}
                {moment(created_at).format("hh:mm")}{" "}
              </div>
            ) : (
              <div className="comment-date">
                {" "}
                Editado el {moment(updated_at).format("DD/MM/YYYY")} a las{" "}
                {moment(updated_at).format("hh:mm")}{" "}
              </div>
            )
          ) : (
            <div className="comment-date">Cargando...</div>
          )}
          {usuario.id === viewerId ? (
            !editing ? (
              <div className="comment-user-options">
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => setEditing(true)}
                  title="Editar"
                />
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  onClick={() => deleteComment(id)}
                  title="Eliminar"
                />
              </div>
            ) : (
              <div className="comment-user-options">
                <Button
                  color="link"
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
                  onClick={() => {
                    setNewComment(content);
                    setEditing(false);
                  }}
                >
                  Descartar
                </Button>
              </div>
            )
          ) : (
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
          )}
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

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      updateComment: gallery.comments.editComment,
      deleteComment: gallery.comments.deleteComment,
    },
    dispatch
  );

export default connect(null, mapActionsToProps)(Comment);

//export default Comment;
