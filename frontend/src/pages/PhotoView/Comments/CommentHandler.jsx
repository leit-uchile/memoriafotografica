import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Input,
  Label,
  FormGroup,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import { gallery } from "../../../actions";
import Comment from "./Comment";
import { LeitSpinner } from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faComments } from "@fortawesome/free-solid-svg-icons";
import { bindActionCreators } from "redux";
import { selectComments,
          selectUserData,
          selectUserIsAuthenticated,
          selectCommentsLoaded } from "../../../reducers";
import "./styles.css";

const CommentHandler = ({
  id,
  comments,
  commentsLoaded,
  newComment,
  fetchComments,
  userData,
  auth,
  style,
  fluid,
}) => {
  useEffect(() => {
    fetchComments(id);
  }, [id, commentsLoaded, fetchComments]);

  const [comment, setComment] = useState("");

  // If is auth then allow reports
  var commentRows = comments.map((el, key) => (
    <Row key={"Comment" + key}>
      <Col style={{ padding: "0.2em" }}>
        <Comment
          element={el}
          modal={auth}
          viewerId={userData == null ? -1 : userData.id}
        />
      </Col>
    </Row>
  ));

  return (
    <Container style={style} fluid={fluid}>
      <Row>
        <Col>
          <h3>
            <FontAwesomeIcon icon={faComments} /> Comentarios
          </h3>
        </Col>
      </Row>
      {comments.length !== 0 ? (
        commentsLoaded ? (
          commentRows
        ) : (
          <div style={{ textAlign: "center" }}>
            <LeitSpinner />
          </div>
        )
      ) : (
        <Row>
          <Col className="commentDiv">
            {" "}
            A&uacute;n no hay comentarios. ¡Se el primero!
          </Col>
        </Row>
      )}
      {auth ? (
        <Row style={{ marginTop: "2em" }}>
          <Col>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                newComment(id, comment);
                setComment("");
              }}
            >
              <FormGroup>
                <Label>
                  <FontAwesomeIcon icon={faComment} /> Comentar
                </Label>
                <Input
                  type="text"
                  placeholder="Comentario ..."
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
              </FormGroup>
              <Button color="primary" type="submit">
                Enviar comentario
              </Button>
            </Form>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  comments: selectComments(state),
  commentsLoaded: selectCommentsLoaded(state),
  auth: selectUserIsAuthenticated(state),
  userData: selectUserData(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      newComment: gallery.comments.putComment,
      fetchComments: gallery.comments.getComments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(CommentHandler);
