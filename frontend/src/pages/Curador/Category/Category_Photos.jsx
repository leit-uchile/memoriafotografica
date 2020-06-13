import React, { Fragment } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { gallery, metadata } from "../../../actions";
import { useEffect } from "react";
import { PhotoSelector, LeitSpinner, Pagination } from "../../../components";
import { useState } from "react";
const Category_Photos = ({
  photos,
  photo_count,
  loading,
  catDetails,
  getPhotosAuth,
  getCategory,
  match,
}) => {
  const [page, setPage] = useState({ page: 0, page_size: 10 });
  const [data, setData] = useState({ title: "" });

  useEffect(() => {
    let params = "&category=" + match.params.id;
    getCategory(match.params.id);
    getPhotosAuth(page.page, page.page_size, params);
  }, []);

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

  const handleOnClick = () => {};
  const selectAll = () => {};

  // BUGFIX: there's a border case like
  // pageLimit = floor(50/25) = 2 and gives pages (0,1,2)
  // but pageLimit should be 1 so we can have the pages (0,1)
  const maxPage =
    Math.floor(photo_count / page.page_size) === photo_count / page.page_size
      ? Math.floor(photo_count / page.page_size) - 1
      : Math.floor(photo_count / page.page_size);

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
              value={data.title}
              onChange={(e) =>
                setData((d) => ({ ...d, title: e.currentTarget.value }))
              }
            />
            <InputGroupAddon addonType="append">
              <Button color="success">Modificar Nombre</Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
      <Row style={{ marginTop: "1em" }}>
        <Col style={{ textAlign: "center" }}>
          {loading ? (
            <LeitSpinner />
          ) : (
            <Fragment>
              <Button color="primary">
                Agregar fotos nuevas{" "}
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </Button>{" "}
              <Button color="warning">Remover Fotos</Button>{" "}
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
            maxPage={maxPage}
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
  newCat: state.categories.newCat,
  catError: state.categories.error,
  catDetails: state.categories.categoryDetail,
  tags: state.metadata.general_tags,
});
const mapActionsToProps = (dispatch) => ({
  getCategory: (id) => dispatch(gallery.category.getCategory(id)),
  updateCategory: (data) => dispatch(gallery.category.updateCategory(data)),
  resetErrors: () => dispatch(gallery.category.resetErrors()),
  getPhotosAuth: (page, page_size, search = "") =>
    dispatch(gallery.photos.getPhotosAuth(page, page_size, search)),
  recoverTags: (query, page, pageSize) =>
    dispatch(metadata.searchMetadataByValueGeneral(query, page, pageSize)),
});

export default connect(mapStateToProps, mapActionsToProps)(Category_Photos);
