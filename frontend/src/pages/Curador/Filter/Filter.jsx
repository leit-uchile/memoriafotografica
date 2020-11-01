import React, { Component } from "react";
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
  selectSiteMiscCuradorRefresh,
  selectSiteMiscCuradorLoading,
  selectWebAdminAllTags,
  selectUserIsAuthenticated,
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

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listView: 1,
      page: 0,
      pageSize: 12,
      search: "",
      approved: "",
      censured: "",
      since: "",
      until: "",
    };
    this.props.getPhotosAuth(0, 12, "&sort=updated_at-desc");
  }

  /**
   * 0 for list
   * 1 for cards
   */
  swapView = (num) => {
    this.setState({ listView: num });
  };

  setCurrentPage = (number) => {
    console.log("Page set:", number);
    this.setState(
      {
        page: number,
      },
      () =>
        this.props.getPhotosAuth(
          this.state.page,
          this.state.pageSize,
          this.recoverUrl()
        )
    );
  };

  recoverUrl = () => {
    const { censured, since, until, approved, search } = this.state;
    let url = "&sort=updated_at-desc";
    if (search !== "") {
      url = url + `&title=${search}`;
    }
    if (censured && censured !== "") {
      url = url + `&censured=${censured}`;
    }
    if (since && since !== "") {
      url = url + `&created_at=${since}`;
    }
    if (until && until !== "") {
      url = url + `&created_at_until=${until}`;
    }
    if (approved.length !== 0) {
      url = url + `&approved=${approved}`;
    }
    return url;
  };

  setFilterOption = (name, value) => {
    this.setState({ [name]: value }, () => {
      let url = this.recoverUrl();
      this.props.getPhotosAuth(this.state.page, this.state.pageSize, url);
    });
  };

  render() {
    const { photos, photoCount } = this.props;
    const { pageSize, page } = this.state;
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
                  this.setState(
                    { page: 0, pageSize: Number(e.target.value) },
                    () => {
                      this.props.getPhotosAuth(0, this.state.pageSize);
                    }
                  )
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
                value={this.state.search}
                onChange={(e) => {
                  this.setCurrentPage(0);
                  this.setState({ search: e.target.value });
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
                disabled={this.state.listView ? true : false}
                onClick={() => this.swapView(1)}
              >
                <FontAwesomeIcon icon={faThList} />
              </Button>
              <Button
                disabled={this.state.listView ? false : true}
                onClick={() => this.swapView(0)}
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
              setState={this.setFilterOption}
            />
          </Col>
        </Row>
        <Row>
          {this.props.loading ? (
            <Col style={{ textAlign: "center" }}>
              <LeitSpinner />
            </Col>
          ) : (
            <Col>
              {this.state.listView ? (
                <PhotoList photos={photos} editPhoto={this.props.editPhoto} />
              ) : (
                <PhotoCards photos={photos} editPhoto={this.props.editPhoto} />
              )}
            </Col>
          )}
        </Row>
        {photoCount === 0 ? (
          "No hay fotografías disponibles"
        ) : (
          <Row style={{ marginTop: "2em" }}>
            <Col>
              <Pagination
                count={photoCount}
                page_size={pageSize}
                page={page}
                setStatePage={this.setCurrentPage}
                size="md"
              />
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: selectErrors(state),
  isAuthenticated: selectUserIsAuthenticated(state),
  meta: selectWebAdminAllTags(state),
  photos: selectPhotos(state),
  photoCount: selectPhotosCount(state),
  loading: selectSiteMiscCuradorLoading(state),
  refresh: selectSiteMiscCuradorRefresh(state),
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
