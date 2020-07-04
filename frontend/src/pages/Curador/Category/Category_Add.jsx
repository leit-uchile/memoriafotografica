import React, { useState, useEffect, Fragment } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Form,
  FormGroup,
  Label,
  Card,
  CardBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { gallery, metadata } from "../../../actions";
import { PhotoSelector, LeitSpinner, Pagination } from "../../../components";
import ReactTags from "react-tag-autocomplete";

const Category_Add = ({
  photos,
  photo_count,
  match,
  loading,
  catDetails,
  tags,
  updatedPhotos,
  getCategory,
  getPhotosAuth,
  associate,
  resetErrors,
  recoverTags,
}) => {
  const [page, setPage] = useState({ page: 0, page_size: 10 });
  const [state, setState] = useState({
    pictures: [],
    tags: [],
    ignore_cat: match.params.id,
  });

  useEffect(() => {
    getCategory(match.params.id);
    let url = recoverUrl();
    getPhotosAuth(page.page, page.page_size, url);
    if (updatedPhotos) {
      resetErrors();
    }
    // eslint-disable-next-line
  }, [updatedPhotos, getCategory, getPhotosAuth, resetErrors]);

  const setDaPage = (p) => {
    setPage((s) => ({ ...s, page: p }));
    let url = recoverUrl();
    getPhotosAuth(p, page.page_size, url);
  };

  const handleChange = (event) => {
    event.persist(); // Fix Syntetic Event failure
    setState((d) => ({
      ...d,
      [event.target.name]: event.target.value,
    }));
  };

  const deleteTag = (i) => {
    const tags = state.tags.slice(0);
    tags.splice(i, 1);
    setState((d) => ({ ...d, tags: [...tags] }));
  };

  const additionTag = (tag) => {
    const tags = [].concat(state.tags, tag);
    setState((d) => ({ ...d, tags: [...tags] }));
  };

  const handleInputChange = (query) => {
    if (query.length >= 2) {
      recoverTags(query, 1, 10);
    }
  };

  const recoverUrl = () => {
    const {
      photo_title,
      description,
      uploaded_on,
      taken_on,
      tags,
      ignore_cat,
    } = state;
    let url = `&ncategory=${ignore_cat}`;
    if (photo_title && photo_title !== "") {
      url = url + `&title=${photo_title}`;
    }
    if (description && description !== "") {
      url = url + `&desc=${description}`;
    }
    if (uploaded_on && uploaded_on !== "") {
      url = url + `&uploaded=${uploaded_on}`;
    }
    if (taken_on && taken_on !== "") {
      url = url + `&taken=${taken_on}`;
    }
    if (tags.length !== 0) {
      url = url + `&metadata=${tags.map((el) => el.id).join(",")}`;
    }
    return url;
  };

  // This is awfull
  const handleSearch = (e) => {
    e.preventDefault();
    setDaPage(0);
  };

  const handleOnClick = (obj) => {
    const { id } = obj.photo;
    // If its there remove it
    const newList = state.pictures.filter((el) => el !== id);
    if (state.pictures.filter((el) => el === id).length !== 0) {
      setState((d) => ({ ...d, pictures: [...newList] }));
    } else {
      setState((d) => ({ ...d, pictures: [...newList, id] }));
    }
  };

  const selectAll = (add) => {
    if (add) {
      let filter = state.pictures.filter((el) => {
        for (let index = 0; index < photos.length; index++) {
          if (photos[index].id === el) {
            return false;
          }
        }
        return true;
      });
      let mappedIds = photos.map((el) => el.id);
      setState((d) => ({ ...d, pictures: [...filter, ...mappedIds] }));
    } else {
      let filter = state.pictures.filter((el) => {
        for (let index = 0; index < photos.length; index++) {
          if (photos[index].id === el) {
            return false;
          }
        }
        return true;
      });
      setState((d) => ({ ...d, pictures: [...filter] }));
    }
  };

  const addPhotos = () => {
    associate(state.pictures, match.params.id);
  };

  var mapped = photos.map((el) => ({
    src: el.thumbnail,
    height: el.aspect_h,
    width: el.aspect_w,
    id: el.id,
  }));

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
            Agregar fotos a Categoria: {catDetails.title}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Form>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="metadata_category">Etiqueta</Label>
                      <ReactTags
                        style={{ width: "auto" }}
                        placeholder={"Contiene etiqueta..."}
                        autoresize={false}
                        allowNew={true}
                        tags={state.tags}
                        suggestions={tags.results.map((e) => ({
                          name: e.value,
                          id: e.id,
                        }))}
                        handleDelete={deleteTag}
                        handleAddition={additionTag}
                        handleInputChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="title_category">Titulo</Label>
                      <Input
                        type="text"
                        placeholder="Titulo contiene..."
                        onChange={handleChange}
                        id="title_category"
                        name="photo_title"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="description_category">
                        Descripci&oacute;n
                      </Label>
                      <Input
                        type="text"
                        placeholder="Descripcion contiene..."
                        onChange={handleChange}
                        id="description_category"
                        name="description"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="uploaded_on">Subida desde</Label>
                      <Input
                        type="date"
                        placeholder="Contiene etiqueta..."
                        onChange={handleChange}
                        id="uploaded_on"
                        name="uploaded_on"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="taken_on">Tomada desde</Label>
                      <Input
                        type="date"
                        placeholder="Titulo contiene..."
                        onChange={handleChange}
                        id="taken_on"
                        name="taken_on"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: "1em" }}>
        <Col style={{ textAlign: "center" }}>
          <Button color="primary" onClick={handleSearch}>
            Buscar
          </Button>{" "}
          <Button color="success" onClick={addPhotos}>
            Agregar fotos nuevas
          </Button>{" "}
          {loading ? (
            <Fragment>
              <br />
              <LeitSpinner />
            </Fragment>
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
  tags: state.metadata.general_tags,
});

const mapActionsToProps = (dispatch) => ({
  getCategory: (id) => dispatch(gallery.category.getCategory(id)),
  associate: (pIds, catId, action = "add") =>
    dispatch(gallery.photos.associateCategory(pIds, catId, action)),
  resetErrors: () => dispatch(gallery.category.resetErrors()),
  getPhotosAuth: (page, page_size, search = "") =>
    dispatch(gallery.photos.getPhotosAuth(page, page_size, search)),
  recoverTags: (query, page, pageSize) =>
    dispatch(metadata.searchMetadataByValueGeneral(query, page, pageSize)),
});

export default connect(mapStateToProps, mapActionsToProps)(Category_Add);
