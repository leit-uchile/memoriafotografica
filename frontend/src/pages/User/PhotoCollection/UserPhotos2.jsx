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
  selectPhotosPhotoUpdate,
  selectPhotosItemStatus,
  selectUserPublicStatus,
} from "../../../reducers";
import { LeitSpinner } from "../../../components";
import CreateAlbumModal from "./CreateAlbumModal";

const UserPhotos = ({
  location,
  match,
  user,
  dataStatus,
  publicUser,
  loadPublicUser,
  photos,
  onLoadGetPhotos,
  onLoadGetPublicPhotos,
  setOps,
  editPhoto,
  deletePhoto,
  itemStatus,
  updatedPhoto,
  setSelectedId,
}) => {
  const [params, setParams] = useState({
    redirect: false,
    index: "",
  });
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const publicView = location.pathname.includes("public");

  useEffect(() => {
    if (publicView) {
      loadPublicUser(match.params.id);
      onLoadGetPublicPhotos(match.params.id, "&page=1&page_size=100");
    } else {
      onLoadGetPhotos(user.id, 1, 100, "&approved=true");
    }
    // eslint-disable-next-line
  }, [publicView, user, updatedPhoto]);

  useEffect(() => {
    setOps(selected.length);
    // eslint-disable-next-line
  }, [selected]);

  useEffect(() => {
    if (itemStatus === "idle") {
      setModal(false);  // This closes EditPhotosModal
    }
  },[itemStatus]);

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
        <Col>
          <h2
            style={{
              textAlign: `${publicView ? "center" : "left"}`,
            }}
          >
            {publicView && publicUser
              ? `Fotos de ${publicUser.first_name}`
              : "Mis fotos"}{" "}
            {dataStatus === "success" ? (
              <Badge color="primary">{photos.results.length}</Badge>
            ) : null}
          </h2>
        </Col>
      </Row>
      {publicView ? null : (
        <Row>
          <Col className="user-dashboard-buttons">
            <Button color="tertiary" onClick={() => setSelectAll(!selectAll)}>
              {!selectAll ? "Seleccionar todas" : "Deseleccionar"}
            </Button>
            <Button
              disabled={selected.length === 0}
              color="primary"
              onClick={() => setModal(!modal)}
            >
              Editar selección ({selected.length})
            </Button>
            <EditPhotosModal
              photosId={selected}
              isOpen={modal}
              handleToggle={() => setModal(!modal)}
              editPhoto={(id, content) => editPhoto(id, content)}
              deletePhoto={(id) => deletePhoto(id)}
              isCurator={false}
              updating={""}
            />
            <CreateAlbumModal photosID={selected} />
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <Container fluid>
            <div className="stat-box rounded">
              {dataStatus === "idle" ? (
                <span></span>
              ) : dataStatus === "loading" ? (
                <Row>
                  <Col style={{ textAlign: "center" }}>
                    <LeitSpinner />
                  </Col>
                </Row>
              ) : dataStatus === "success" ? (
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
                        checkAll={selectAll}
                        selectIcon="pen"
                        getSelection={(v) => {
                          var keys = Object.keys(v)
                            .filter((el) => el.includes("nb-"))
                            .map((el) => el.substr(3));
                          setSelected(
                            keys.map((el) => photos.results[Number(el)].id)
                          );
                        }}
                        update={updatedPhoto}
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
                <p>Ha ocurrido un error</p>
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
  dataStatus: selectUserPublicStatus(state),
  publicUser: selectUserPublicUser(state),
  itemStatus: selectPhotosItemStatus(state),
  updatedPhoto: selectPhotosPhotoUpdate(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      setSelectedId: site_misc.setSelectedId,
      loadPublicUser: user.loadAUser,
      onLoadGetPublicPhotos: user.loadPublicUserPhotos,
      onLoadGetPhotos: user.getUserPhotos,
      setOps: gallery.photos.setNBOps,
      editPhoto: gallery.photos.editPhoto,
      deletePhoto: gallery.photos.deletePhoto,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(UserPhotos);
