import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { user } from "../../actions";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faSuitcase,
  faCameraRetro,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";
import { bindActionCreators } from "redux";
import {
  selectUserPhotos,
  selectUserComments,
  selectUserNotifications,
} from "../../reducers";
import Gallery from "react-photo-gallery";
import { LeitSpinner, Pagination } from "../../components";
import "./styles.css";
import Comment from "../PhotoView/Comments/Comment";

const Landing = ({
  user,
  photos,
  getPhotos,
  comments,
  getComments,
  notifications,
  getNotifications,
}) => {
  const [params, setParams] = useState({
    redirect: false,
    url: "",
  });

  const [pagPhotos, setPagPhotos] = useState({
    page: 0,
    page_size: 4,
    loading: true,
  });
  const [pagComments, setPagComments] = useState({
    page: 0,
    page_size: 5,
    loading: true,
  });
  const [pagNotifications, setPagNotifications] = useState({
    page: 0,
    page_size: 5,
    loading: true,
  });

  const addMore = (
    <FontAwesomeIcon
      icon={faPlusCircle}
      onClick={() => setParams({ redirect: true, url: "/upload" })}
      title="Agregar más"
    />
  );

  useEffect(() => {
    setPagPhotos((pag) => ({ ...pag, loading: true }));
    getPhotos(
      user.id,
      pagPhotos.page + 1,
      pagPhotos.page_size,
      "&approved=false"
    ).then((r) => {
      setPagPhotos((pag) => ({ ...pag, loading: false }));
    });
  }, [pagPhotos.page]);

  useEffect(() => {
    setPagComments((pag) => ({ ...pag, loading: true }));
    getComments(user.id, pagComments.page + 1, pagComments.page_size).then(
      (r) => {
        setPagComments((pag) => ({ ...pag, loading: false }));
      }
    );
  }, [pagComments.page]);

  useEffect(() => {
    setPagNotifications((pag) => ({ ...pag, loading: true }));
    getNotifications(
      user.id,
      pagNotifications.page + 1,
      pagNotifications.page_size
    ).then((r) => {
      setPagNotifications((pag) => ({ ...pag, loading: false }));
    });
  }, [pagNotifications.page]);

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
          <Col>
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
          <Col>
            <div className="stat-box">
              <Container fluid className="stat-box-header">
                <h2>Fotograf&iacute;as sin aprobación {addMore}</h2>
              </Container>
              <hr />
              <Container fluid>
                {!pagPhotos.loading ? (
                  photos.results.length !== 0 ? (
                    <Row>
                      <Col
                        sm={
                          photos.results.length === 1
                            ? { size: 4, offset: 4 }
                            : { size: 12 }
                        }
                      >
                        <Gallery
                          photos={photos.results.map((el) => ({
                            src: el.thumbnail,
                            height: el.aspect_h,
                            width: el.aspect_w,
                            id: el.id,
                          }))}
                          targetRowHeight={250}
                        />
                      </Col>
                    </Row>
                  ) : (
                    "No tienes fotografías pendientes"
                  )
                ) : (
                  <Row>
                    <Col style={{ textAlign: "center" }}>
                      <LeitSpinner />
                    </Col>
                  </Row>
                )}
                {photos.count !== 0 ? (
                  <Pagination
                    count={photos.count}
                    page_size={pagPhotos.page_size}
                    page={pagPhotos.page}
                    setStatePage={(p) =>
                      setPagPhotos((pag) => ({ ...pag, page: p }))
                    }
                    size="md"
                    label="photos"
                    displayFirst
                    displayLast
                  />
                ) : null}
              </Container>
            </div>
          </Col>
          <Col>
            <div className="stat-box">
              <Container fluid className="stat-box-header">
                <h2>Mis comentarios</h2>
              </Container>
              <hr />
              <Container>
                <Row>
                  <Col>
                    {!pagComments.loading ? (
                      comments.results.length !== 0 ? (
                        <Container>
                          {comments.results.map((el, key) => (
                            <Row key={"Comment" + key}>
                              <Col>
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
                      ) : (
                        "No tienes comentarios"
                      )
                    ) : (
                      <Row>
                        <Col style={{ textAlign: "center" }}>
                          <LeitSpinner />
                        </Col>
                      </Row>
                    )}
                    {comments.count !== 0 ? (
                      <Pagination
                        count={comments.count}
                        page_size={pagComments.page_size}
                        page={pagComments.page}
                        setStatePage={(p) =>
                          setPagComments((pag) => ({ ...pag, page: p }))
                        }
                        size="md"
                        label="comments"
                        displayFirst
                        displayLast
                      />
                    ) : null}
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="stat-box">
              <Container fluid className="stat-box-header">
                <h2>Notificaciones</h2>
              </Container>
              <hr />
              <Container fluid>
                <Row>
                  <Col>
                    {!pagNotifications.loading ? (
                      notifications.results.length !== 0 ? (
                        <Container></Container>
                      ) : (
                        "No tienes notificaciones"
                      )
                    ) : (
                      <Row>
                        <Col style={{ textAlign: "center" }}>
                          <LeitSpinner />
                        </Col>
                      </Row>
                    )}
                    {notifications.count !== 0 ? (
                      <Pagination
                        count={notifications.count}
                        page_size={pagNotifications.page_size}
                        page={pagNotifications.page}
                        setStatePage={(p) =>
                          setPagNotifications((pag) => ({ ...pag, page: p }))
                        }
                        size="md"
                        label="notifications"
                        displayFirst
                        displayLast
                      />
                    ) : null}
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

const makeIcons = (rol_id) => {
  switch (rol_id) {
    case 1:
      return <FontAwesomeIcon icon={faCameraRetro} />;
    case 2:
      return <FontAwesomeIcon icon={faAddressCard} />;
    case 3:
      return <FontAwesomeIcon icon={faSuitcase} />;
    default:
      return "Failed";
  }
};

const mapStateToProps = (state) => ({
  photos: selectUserPhotos(state),
  comments: selectUserComments(state),
  notifications: selectUserNotifications(state),
  user: state.user.userData,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      getPhotos: user.getUserPhotos,
      getComments: user.getUserComments,
      getNotifications: user.getUserNotifications,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(Landing);
