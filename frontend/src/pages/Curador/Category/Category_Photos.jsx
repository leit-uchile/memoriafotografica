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

const RemovePhotos = ({ action }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <Fragment>
      <Button color="warning" onClick={toggle}>
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
  loading,
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
  const [data, setData] = useState({ title: "", pictures: [] });

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

  useEffect(() => {
    setData((d) => ({ ...d, title: catDetails.title }));
  }, [catDetails]);

  var mapped = photos.map((el) => ({
    src: el.thumbnail,
    height: el.aspect_h,
    width: el.aspect_w,
    id: el.id,
  }));

  const setDaPage = (p) => {
    setPage((s) => ({ ...s, page: p }));
    let params = "&category=" + match.params.id;
    getPhotosAuth(p, page.page_size, params);
  };

  const addTitle = (e) => {
    let target = e.target; // REACT BUG: e.target is not persistent over state update
    setData((d) => ({ ...d, title: target.value }));
  };

  const update = () => {
    updateCategory({ ...catDetails, title: data.title });
  };

  const handleOnClick = (obj) => {
    const { id } = obj.photo;
    // If its there remove it
    const newList = data.pictures.filter((el) => el !== id);
    if (data.pictures.filter((el) => el === id).length !== 0) {
      setData((d) => ({ ...d, pictures: [...newList] }));
    } else {
      setData((d) => ({ ...d, pictures: [...newList, id] }));
    }
  };

  const selectAll = (add) => {
    if (add) {
      let filter = data.pictures.filter((el) => {
        for (let index = 0; index < photos.length; index++) {
          if (photos[index].id === el) {
            return false;
          }
        }
        return true;
      });
      let mappedIds = photos.map((el) => el.id);
      setData((d) => ({ ...d, pictures: [...filter, ...mappedIds] }));
    } else {
      let filter = data.pictures.filter((el) => {
        for (let index = 0; index < photos.length; index++) {
          if (photos[index].id === el) {
            return false;
          }
        }
        return true;
      });
      setData((d) => ({ ...d, pictures: [...filter] }));
    }
  };

  const removePhotos = () => {
    associate(data.pictures, catDetails.id);
  };

  const doRedirect = () => {
    setData((d) => ({ ...d, redirect: catDetails.id }));
  };

  if (data.redirect) {
    return (
      <Redirect
        push
        to={`/curador/dashboard/categories/${data.redirect}/add`}
      />
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2>
            <Link
              to="/curador/dashboard/categories"
              className="btn btn-secondary"
            >
              <FontAwesomeIcon icon={faChevronCircleLeft} />
            </Link>{" "}
            Ver/Modificar Categoria: {catDetails.title}
          </h2>
        </Col>
      </Row>
      <Row>
        <Label for="exampleEmail" sm={2}>
          Editar Nombre
        </Label>
        <Col sm={10}>
          <InputGroup>
            <Input
              placeholder={"Nombre"}
              defaultValue={data.title}
              onChange={addTitle}
              maxLength="30"
            />
            <InputGroupAddon addonType="append">
              <Button color="primary" onClick={update}>
                Modificar Nombre
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
      <Row style={{ marginTop: "1em" }}>
        <Col style={{ textAlign: "center" }}>
          <Button color="primary" onClick={doRedirect}>
            Agregar fotos nuevas <FontAwesomeIcon icon={faExternalLinkAlt} />
          </Button>{" "}
          <RemovePhotos action={removePhotos} />{" "}
          {loading ? (
            <LeitSpinner />
          ) : (
            <Fragment>
              <PhotoSelector
                useContainer={false}
                photos={mapped}
                targetRowHeight={200}
                onClick={(e, index) => handleOnClick(index)}
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
            size="lg"
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
  photos: state.photos.photos,
  photo_count: state.photos.count,
  loading: state.site_misc.curador.loading,
  catError: state.categories.error,
  catDetails: state.categories.categoryDetail,
  updatedPhotos: state.categories.updatedPhotos,
});
const mapActionsToProps = (dispatch) => ({
  getCategory: (id) => dispatch(gallery.category.getCategory(id)),
  updateCategory: (data) => dispatch(gallery.category.updateCategory(data)),
  associate: (pIds, catId, action = "remove") =>
    dispatch(gallery.photos.associateCategory(pIds, catId, action)),
  resetErrors: () => dispatch(gallery.category.resetErrors()),
  getPhotosAuth: (page, page_size, search = "") =>
    dispatch(gallery.photos.getPhotosAuth(page, page_size, search)),
});

export default connect(mapStateToProps, mapActionsToProps)(Category_Photos);
