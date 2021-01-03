import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container, ButtonGroup, Input } from "reactstrap";
import { connect } from "react-redux";
import { gallery } from "../../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThLarge,
  faThList,
  faFilter,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { LeitSpinner, Pagination } from "../../../components";
import PhotoList from "./PhotoList";
import PhotoCards from "./PhotoCards";
import FilterOptions from "../FilterOptions";
import { bindActionCreators } from "redux";
import {
  selectPhotos,
  selectPhotosCount,
  selectErrors,
  selectWebAdminAllTags,
  selectUserIsAuthenticated,
  selectPhotosPhotoUpdate,
} from "../../../reducers";

const filters = [
  { display: "Subida desde", type: "date", name: "since" },
  { display: "Subida hasta", type: "date", name: "until" },
  {
    display: "Aprobación",
    type: "select",
    options: ["Aprobados", "No aprobados"],
    name: "approved",
  },
  {
    display: "Censura",
    type: "select",
    options: ["Censurados", "Sin cerurar"],
    name: "censured",
  },
];

const Filter = ({ photos, photoCount, getPhotosAuth, editPhoto, updatedPhoto }) => {
  const [searchState, setSearchState] = useState("");
  const [filter, setFilter] = useState({
    censured: "",
    since: "",
    until: "",
    approved: "",
  });

  const [cardsView, setCardsView] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    page_size: 12,
    loading: true,
  });

  useEffect(() => {
    setPagination((pag) => ({ ...pag, loading: true }));
    let url = "&sort=updated_at-desc";
    if (searchState !== "") {
      url = url + `&title=${searchState}`;
    }
    if (filter.censured !== "") {
      url = url + `&censured=${filter.censured}`;
    }
    if (filter.since !== "") {
      url = url + `&created_at=${filter.since}`;
    }
    if (filter.until !== "") {
      url = url + `&created_at_until=${filter.until}`;
    }
    if (filter.approved.length !== 0) {
      url = url + `&approved=${filter.approved}`;
    }
    getPhotosAuth(pagination.page + 0, pagination.page_size, url).then((r) => {
      setPagination((pag) => ({ ...pag, loading: false }));
    });
  }, [
    searchState,
    filter,
    pagination.page,
    pagination.page_size,
    getPhotosAuth,
    updatedPhoto,
  ]);

  const setPage = (p) => {
    setPagination((pag) => ({ ...pag, page: p }));
  };

  return (
    <Container fluid>
      <h2>Filtrar Fotografías</h2>
      <Row style={{ marginBottom: "10px" }}>
        <Col sm="6">
          <ButtonGroup>
            <Button disabled>Filtrar</Button>
            <Button color="primary" id="toggler">
              <FontAwesomeIcon icon={faFilter} />
            </Button>
            <Input
              type="select"
              className="btn btn-secondary"
              onChange={(e) =>
                setPagination({ page: 0, page_size: Number(e.target.value) })
              }
            >
              <option value="12">12 por p&aacute;gina</option>
              <option value="25">25 por p&aacute;gina</option>
              <option value="50">50 por p&aacute;gina</option>
            </Input>
          </ButtonGroup>
          <ButtonGroup className="mr-auto">
            <Input
              type="text"
              name="search-curador"
              placeholder="Filtrar por título"
              value={searchState}
              onChange={(e) => {
                setPagination((p) => ({ ...p, page: 0 }));
                setSearchState(e.target.value);
              }}
            />
            <Button color="primary">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </ButtonGroup>
        </Col>
        <Col sm={{ offset: 2, size: 4 }}>
          <ButtonGroup>
            <Button disabled>Ver como</Button>
            <Button
              disabled={!cardsView}
              onClick={() => setCardsView(!cardsView)}
            >
              <FontAwesomeIcon icon={faThList} />
            </Button>
            <Button
              disabled={cardsView}
              onClick={() => setCardsView(!cardsView)}
            >
              <FontAwesomeIcon icon={faThLarge} />
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FilterOptions
            id="#toggler"
            params={filters}
            setState={(name, value) => setFilter({ ...filter, [name]: value })}
          />
        </Col>
      </Row>
      <div>
        {!pagination.loading ? (
          photos.length !== 0 ? (
            <Row>
              <Col>
                {!cardsView ? (
                  <PhotoList photos={photos} editPhoto={editPhoto} />
                ) : (
                  <PhotoCards photos={photos} editPhoto={editPhoto} />
                )}
              </Col>
            </Row>
          ) : (
            "No hay fotografías disponibles"
          )
        ) : (
          <Row>
            <Col style={{ textAlign: "center" }}>
              <LeitSpinner />
            </Col>
          </Row>
        )}
        {photoCount !== 0 ? (
          <Pagination
            count={photoCount}
            page_size={pagination.page_size}
            page={pagination.page}
            setStatePage={setPage}
            size="md"
          />
        ) : null}
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  errors: selectErrors(state),
  isAuthenticated: selectUserIsAuthenticated(state),
  meta: selectWebAdminAllTags(state),
  photos: selectPhotos(state),
  photoCount: selectPhotosCount(state),
  updatedPhoto: selectPhotosPhotoUpdate(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      getPhotosAuth: gallery.photos.getPhotosAuth,
      editPhoto: gallery.photos.editPhoto,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(Filter);
