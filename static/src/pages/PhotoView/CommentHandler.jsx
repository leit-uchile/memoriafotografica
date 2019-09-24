import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Input,
  Label,
  FormGroup,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import { photoDetails } from "../../actions";
import Comment from "./Comment";

const CommentHandler = ({
  id,
  auth: { token },
  comments,
  commentsLoaded,
  newComment,
  fetchComments
}) => {
  useEffect(() => {
    fetchComments(id, token);
  }, [id, commentsLoaded]);

  const [comment, setComment] = useState("");

  var commentRows = comments.map((el, key) => (
    <Row>
      <Col
        md={{
          size: 8,
          offset: 2
        }}
        style={styles.commentContainerStyle}>
        <Comment content={el} />
      </Col>
    </Row>
  ));

  return (
    <Container style={{ marginBottom: "2em", marginTop: "2em" }}>
      <Row>
        <Col>
          <h3>Comentarios</h3>
        </Col>
      </Row>
      {comments.length !== 0 ? commentRows : null}
      <Row style={{ marginTop: "2em" }}>
        <Col>
          <Form
            onSubmit={e => {
              e.preventDefault();
              newComment(id, comment, token);
              setComment("");
            }}>
            <FormGroup>
              <Label>Comentar</Label>
              <Input
                type="text"
                placeholder="Comentario ..."
                onChange={e => setComment(e.target.value)}
                value={comment}
              />
            </FormGroup>
            <Button color="primary" type="submit">
              Enviar comentario
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const styles = {
  commentContainerStyle: {
    padding: "0.2em"
  }
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    comments: state.photoDetails.comments,
    commentsLoaded: state.photoDetails.commentsLoaded
  };
};

const mapActionsToProps = dispatch => {
  return {
    newComment: (id, comment, auth) => {
      return dispatch(photoDetails.putComment(id, comment, auth));
    },
    fetchComments: (id, auth) => {
      return dispatch(photoDetails.getComments(id, auth));
    }
  };
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(CommentHandler);
