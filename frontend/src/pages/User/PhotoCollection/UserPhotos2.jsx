import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Row, Col, Container, Badge } from "reactstrap";
import { user, site_misc, gallery } from "../../../actions";
import EditPhotosModal from "./EditPhotosModal";
import PhotoEditor from "../../../components/PhotoEditor";
import { Helmet } from "react-helmet";
import Gallery from "react-photo-gallery";
import { bindActionCreators } from "redux";
import "./userPhotos.css";
import {
  selectUserPhotos,
  selectUserData,
  selectUserPublicUser,
  selectPhotosUpdatedPhoto,
  selectPhotosRefresh,
} from "../../../reducers";
import { LeitSpinner } from "../../../components";

const UserPhotos = ({
  location,
  match,
  user,
  publicUser,
  loadPublicUser,
  photos,
  onLoadGetPhotos,
  onLoadGetPublicPhotos,
  editPhoto,
  deletePhoto,
  updatedPhoto,
  refresh,
  setSelectedId,
}) => {
  const [params, setParams] = useState({
    redirect: false,
    index: "",
  });
  const [allSelected, setAll] = useState(false);
  const [modal, setModal] = useState(false);
  const [photosToEdit, setPhotosToEdit] = useState([]);

  const publicView = location.pathname.includes("public");

  useEffect(() => {
    if (publicView) {
      loadPublicUser(match.params.id);
      onLoadGetPublicPhotos(match.params.id, "&page=1&page_size=100");
    } else {
      onLoadGetPhotos(user.id, 1, 100, "&approved=true");
    }
  }, [publicView, user]);

  useEffect(() => {
    if ((updatedPhoto || refresh) && !modal) {
      setTimeout(() => window.location.reload(), 1000);
    }
  }, [updatedPhoto]);

  const handleOnSelect = (obj) => {
    const id = obj.photo.id;
    const newList = photosToEdit.filter((el) => el !== id);
    if (newList.length === photosToEdit.length) {
      // si el objeto no estaba
      setPhotosToEdit([...newList, id]); //lo agregamos
    } else {
      setPhotosToEdit([...newList]); //si estaba, asi que lo eliminamos
    }
  };

  if (params.redirect) {
    setSelectedId(params.index);
    return (
      <Redirect
        push
        to={`/photo/${photos.results[params.index].id}/?user=${
          publicView ? publicUser.id : user.id
        }`}
      />
    );
  }
  return (
    <Container fluid className="dashboard">
      <Helmet>
        <title>
          {publicView && publicUser
            ? "Fotos de " + publicUser.first_name
            : "Mis fotos"}
        </title>
      </Helmet>
      <Row>
        <Col className="dashboard-col">
          <h2
            style={{
              textAlign: `${publicView ? "center" : "left"}`,
            }}
          >
            {publicView && publicUser
              ? `Fotos de ${publicUser.first_name}`
              : "Mis fotos"}{" "}
            {photos.results ? (
              <Badge color="primary">{photos.results.length}</Badge>
            ) : null}
          </h2>
        </Col>
      </Row>
      {publicView ? null : (
        <Row>
          <Col className="user-dashboard-buttons">
            <Button
              color="secondary"
              onClick={() =>
                !allSelected
                  ? (setPhotosToEdit(photos.results.map((el) => el.id)),
                    setAll(true))
                  : (setPhotosToEdit([]), setAll(false))
              }
            >
              {!allSelected ? "Seleccionar todas" : "Deseleccionar"}
            </Button>
            <Button
              disabled={photosToEdit.length === 0}
              color="primary"
              onClick={() => setModal(!modal)}
            >
              Editar selección ({photosToEdit.length})
            </Button>
            <EditPhotosModal
              photosId={photosToEdit}
              isOpen={modal}
              handleToggle={() => setModal(!modal)}
              editPhoto={(id, content) => editPhoto(id, content)}
              deletePhoto={(id) => deletePhoto(id)}
              isCurator={false}
            />
          </Col>
        </Row>
      )}
      <Row>
        <Col className="dashboard-col">
          <Container fluid>
            <div className="stat-box rounded">
              {photos.results ? (
                publicView ? (
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
                        onClick={(e, obj) =>
                          setParams({
                            redirect: true,
                            index: obj.index,
                          })
                        }
                      />
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col
                      sm={
                        photos.results.length === 1
                          ? { size: 4, offset: 4 }
                          : { size: 12 }
                      }
                    >
                      <PhotoEditor
                        photos={photos.results.map((el) => ({
                          src: el.thumbnail,
                          height: el.aspect_h,
                          width: el.aspect_w,
                          id: el.id,
                        }))}
                        targetRowHeight={250}
                        onClick={(e, obj) => handleOnSelect(obj)}
                        selectAll={allSelected}
                        onRedirect={(e, obj) =>
                          setParams({
                            redirect: true,
                            index: obj.index,
                          })
                        }
                      />
                    </Col>
                  </Row>
                )
              ) : (
                <Row>
                  <Col style={{ textAlign: "center" }}>
                    <LeitSpinner />
                  </Col>
                </Row>
              )}
            </div>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  photos: selectUserPhotos(state),
  user: selectUserData(state),
  publicUser: selectUserPublicUser(state),
  updatedPhoto: selectPhotosUpdatedPhoto(state),
  refresh: selectPhotosRefresh(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      setSelectedId: site_misc.setSelectedId,
      loadPublicUser: user.loadAUser,
      onLoadGetPhotos: user.getUserPhotos,
      onLoadGetPublicPhotos: user.loadPublicUserPhotos,
      editPhoto: gallery.photos.editPhoto,
      deletePhoto: gallery.photos.deletePhoto,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(UserPhotos);
