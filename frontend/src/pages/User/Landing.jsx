import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "reactstrap";
import { connect } from "react-redux";
import { user } from "../../actions";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";
import { bindActionCreators } from "redux";
import { selectUserPhotos, selectUserComments } from "../../reducers";
import Gallery from "react-photo-gallery";
import { Pagination } from "../../components";
import "./styles.css";
import Comment from "../PhotoView/Comments/Comment";

const Landing = ({ user, photos, getPhotos, comments, getComments }) => {
  const [params, setParams] = useState({
    redirect: false,
    url: "",
  });
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [pagination, setPagination] = useState({ page: 0, page_size: 5 });

  const addMore = (
    <FontAwesomeIcon
      icon={faPlusCircle}
      onClick={() => setParams({ redirect: true, url: "/upload" })}
      title="Agregar más"
    />
  );

  var mappedPhotos = photos.map((el) => ({
    src: el.thumbnail,
    height: el.aspect_h,
    width: el.aspect_w,
    id: el.id,
  }));

  var mappedComments = [];

  useEffect(() => {
    getPhotos(user.id, 100, 0, "&approved=false");
    if (photos !== undefined) {
      setLoadingPhotos(false);
    }
  }, []);

  useEffect(() => {
    getComments(user.id, pagination.page + 1, pagination.page_size);
    if (comments !== {}) {
      setLoadingComments(false);
    }
  }, [pagination]);

  const setPage = (p) => {
    setPagination((pag) => ({ ...pag, page: p }));
  };

  if (params.redirect) {
    return <Redirect push to={params.url} />;
  }
  return (
    <Container fluid className="dashboard">
      <Helmet>
        <title>{`Escritorio de ${user.first_name} ${user.last_name}`}</title>
      </Helmet>
      <div>
        <Row>
          <Col className="dashboard-col">
            <h2
              style={{
                textAlign: "left",
              }}
            >
              Escritorio
            </h2>
          </Col>
        </Row>
        <Row>
          <Col className="dashboard-col">
            <div className="stat-box">
              <Container fluid className="stat-box-header">
                <h2>Fotograf&iacute;as sin aprobación {addMore}</h2>
              </Container>
              <hr />
              <Container fluid>
                <Row>
                  <Col
                    sm={
                      mappedPhotos.length === 1
                        ? { size: 4, offset: 4 }
                        : { size: 12 }
                    }
                  >
                    {loadingPhotos ? (
                      <Spinner />
                    ) : photos.length !== 0 ? (
                      <Gallery photos={mappedPhotos} targetRowHeight={250} />
                    ) : (
                      "No tienes fotografías pendientes"
                    )}
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
          <Col className="dashboard-col">
            <div className="stat-box">
              <Container fluid className="stat-box-header">
                <h2>Mis comentarios</h2>
              </Container>
              <hr />
              <Container>
                <Row>
                  <Col className="dashboard-col">
                    {comments.results ? (
                      comments.length !== 0 ? (
                        <Container>
                          {comments.results.map((el, key) => (
                            <Row key={"Comment" + key}>
                              <Col style={{paddingBottom: "8px"}}>
                                <Comment
                                  element={{
                                    content: el.content,
                                    usuario: user,
                                    id: el.id,
                                    created_at: el.created_at,
                                    updated_at: el.updated_at,
                                  }}
                                />
                              </Col>
                            </Row>
                          ))}
                        </Container>
                      ) : null
                    ) : (
                      <Spinner />
                    )}
                    {comments.count === 0 ? (
                      "No tienes comentarios"
                    ) : (
                      <Pagination
                        count={comments.count}
                        page_size={pagination.page_size}
                        page={pagination.page}
                        setStatePage={setPage}
                        size="md"
                        label="comments-pagination"
                        displayFirst
                        displayLast
                      />
                    )}
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="dashboard-col">
            <div className="stat-box">
              <Container fluid className="stat-box-header">
                <h2>Notificaciones</h2>
              </Container>
              <hr />
              <Container fluid>
                <p>En construccion</p>
              </Container>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  photos: selectUserPhotos(state),
  comments: selectUserComments(state),
  user: state.user.userData,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      getPhotos: user.getUserPhotos,
      getComments: user.getUserComments,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(Landing);
