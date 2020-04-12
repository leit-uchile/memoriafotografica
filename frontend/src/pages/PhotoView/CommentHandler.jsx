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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faComments } from "@fortawesome/free-solid-svg-icons";
const CommentHandler = ({
  id,
  comments,
  commentsLoaded,
  newComment,
  fetchComments,
  userId,
  auth,
  style,
  fluid
}) => {
  useEffect(() => {
    fetchComments(id);
  }, [id, commentsLoaded, fetchComments]);

  const [comment, setComment] = useState("");

  // If is auth then allow reports
  var commentRows = comments.map((el, key) => (
    <Row key={"Comment" + key}>
      <Col
        style={styles.commentContainerStyle}>
        <Comment content={el} modal={auth} currentUserId={userId}/>
      </Col>
    </Row>
  ));

  return (
    <Container style={style} fluid={fluid}>
      <Row>
        <Col>
          <h3> 
          <FontAwesomeIcon icon={faComments} />
          {" "} Comentarios
          </h3>
        </Col>
      </Row>
      {comments.length !== 0 ? commentRows : null}
      <Row style={{ marginTop: "2em" }}>
        <Col>
          <Form
            onSubmit={e => {
              e.preventDefault();
              newComment(id, comment);
              setComment("");
            }}>
            <FormGroup>
              <Label>
              <FontAwesomeIcon icon={faComment} />
              {" "} Comentar 
              </Label>
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

const mapStateToProps = state => ({
  comments: state.photoDetails.comments,
  commentsLoaded: state.photoDetails.commentsLoaded,
  auth: state.auth.isAuthenticated,
  userId: state.user.userData.id
});

const mapActionsToProps = dispatch => ({
  newComment: (id, comment) => dispatch(photoDetails.putComment(id, comment)),
  fetchComments: (id, auth) => dispatch(photoDetails.getComments(id))
});
export default connect(
  mapStateToProps,
  mapActionsToProps
)(CommentHandler);
