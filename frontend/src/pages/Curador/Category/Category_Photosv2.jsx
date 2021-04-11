import React, { Fragment, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { gallery } from "../../../actions";
import { PhotoSelector, LeitSpinner, Pagination } from "../../../components";
import { bindActionCreators } from "redux";
import {
  selectPhotos,
  selectPhotosCount,
  selectCategoriesError,
  selectCategoriesDetails,
  selectCategoriesUpdatePhotos,
} from "../../../reducers";

const RemovePhotos = ({ action, disabled }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <Fragment>
      <Button color="secondary" onClick={toggle} disabled={disabled}>
        Remover Fotos
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        scrollable
        unmountOnClose={false}
        role="confirm"
      >
        <ModalHeader toggle={toggle}>Remover Fotos</ModalHeader>
        <ModalBody>
          Las fotos seran removidas de la categoria, esta acci&oacute;n puede
          deshacerse manualmente.
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              toggle();
              action();
            }}
          >
            Continuar
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

const Category_Photos = ({
  photos,
  photo_count,
  catDetails,
  updatedPhotos,
  getPhotosAuth,
  getCategory,
  updateCategory,
  resetErrors,
  associate,
  match,
}) => {
  const [page, setPage] = useState({ page: 0, page_size: 10 });
  const [pictures, setPictures] = useState([]);
  const [params, setParams] = useState({
    redirect: false,
    id: "",
  });

  // Initial load and on photos update
  useEffect(() => {
    let params = "&category=" + match.params.id;
    getCategory(match.params.id);
    getPhotosAuth(page.page, page.page_size, params);
    if (updatedPhotos) {
      resetErrors();
    }
    // eslint-disable-next-line
  }, [updatedPhotos, getCategory, getPhotosAuth, resetErrors]);

  var mapped = photos.map((el) => ({
    src: el.thumbnail,
    height: el.aspect_h,
    width: el.aspect_w,
    id: el.id,
  }));

  const setDaPage = (p) => {
    setPage((s) => ({ ...s, page: p }));
    let url = "&category=" + match.params.id;
    getPhotosAuth(p, page.page_size, url);
  };

  const handleOnClick = (obj) => {
    const { id } = photos[obj.index];
    console.log(id);
    // If its there remove it
    const newList = pictures.filter((el) => el !== id);
    if (pictures.filter((el) => el === id).length === 0) {
      setPictures([...newList, id]);
    } else {
      setPictures(newList);
    }
  };

  const selectAll = (add) => {
    if (add) {
      let filter = pictures.filter((el) => {
        for (let index = 0; index < photos.length; index++) {
          if (photos[index].id === el) {
            return false;
          }
        }
        return true;
      });
      let mappedIds = photos.map((el) => el.id);
      setPictures([...filter, ...mappedIds]);
    } else {
      let filter = pictures.filter((el) => {
        for (let index = 0; index < photos.length; index++) {
          if (photos[index].id === el) {
            return false;
          }
        }
        return true;
      });
      setPictures([...filter]);
    }
  };

  const removePhotos = () => {
    associate(pictures, catDetails.id, "remove");
  };

  const doRedirect = () => {
    setParams({ redirect: true, id: catDetails.id });
  };

  if (params.redirect) {
    return (
      <Redirect push to={`/curador/dashboard/categories/${params.id}/add`} />
    );
  }

  return (
    <Container fluid>
      <Row style={{ marginTop: "1em" }}>
        <Col style={{ textAlign: "center" }}>
          <Button color="primary" onClick={doRedirect}>
            Agregar fotos nuevas <FontAwesomeIcon icon={faExternalLinkAlt} />
          </Button>{" "}
          <RemovePhotos
            action={removePhotos}
            disabled={pictures.length === 0}
          />{" "}
          {!photos ? (
            <LeitSpinner />
          ) : (
            <Fragment>
              <PhotoSelector
                useContainer={true}
                photos={mapped}
                targetRowHeight={200}
                onClick={(e, obj) => handleOnClick(obj)}
                putAll={(add) => selectAll(add)}
              />
            </Fragment>
          )}
        </Col>
      </Row>
      <Row style={{ marginTop: "1em" }}>
        <Col>
          <Pagination
            count={photo_count}
            page_size={page.page_size}
            page={page.page}
            setStatePage={setDaPage}
            size="md"
            label="metadata-pagination"
            displayFirst
            displayLast
          />
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  photos: selectPhotos(state),
  photo_count: selectPhotosCount(state),
  catError: selectCategoriesError(state),
  catDetails: selectCategoriesDetails(state),
  updatedPhotos: selectCategoriesUpdatePhotos(state),
});
const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      getCategory: gallery.category.getCategory,
      updateCategory: gallery.category.updateCategory,
      associate: gallery.photos.associateCategory,
      resetErrors: gallery.category.resetErrors,
      getPhotosAuth: gallery.photos.getPhotosAuth,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(Category_Photos);
