import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { home, misc, search } from "../actions";
import Photo from "../components/Photo";
import {
  Container,
  Row,
  Col,
  ButtonDropdown,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Gallery from "react-photo-gallery";
import LeitSpinner from "../components/LeitSpinner";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategories: [],
      searchOrder: "desc",
      photoPagination: {
        page: 0,
        maxAllowed: 35
      },
      maxAllowedCategories: 8,
      catsOpen: false,
      sortOpen: false,
      chosenPhotoIndex: 0, // For redirect
      redirect: false,
      link: ""
    };

    // componentWillLoad
    this.props.setRoute("/gallery/");
    this.props.onLoadGetPhotos();
    this.props.onLoadGetCats();
  }

  handleOnClick = obj => {
    this.setState({ redirect: true, chosenPhotoIndex: obj.index });
  };

  allowMoreCats = () => {
    this.setState({
      maxAllowedCategories: this.state.maxAllowedCategories + 4
    });
  };

  allowMorePics = () => {
    this.setState({ maxPhotos: this.state.maxPhotos + 10 });
  };

  toggleCategory = () => {
    this.setState({ catsOpen: !this.state.catsOpen });
  };

  pickCategory = id => {
    // Remove if in already
    if (this.state.selectedCategories.filter(el => el === id).length !== 0) {
      this.setState(
        {
          selectedCategories: this.state.selectedCategories.filter(
            el => el !== id
          )
        },
        this.reloadOnChange
      );
    } else {
      this.setState(
        {
          selectedCategories: [...this.state.selectedCategories, id]
        },
        this.reloadOnChange
      );
    }
  };

  setSortingOrder = order => {
    this.setState({ searchOrder: order }, this.reloadOnChange);
  };

  reloadOnChange = () => {
    const { sortByUpload, recoverByCats, sortByField } = this.props;
    if (this.state.selectedCategories.length !== 0) {
      recoverByCats(this.state.selectedCategories, this.state.searchOrder);
    } else {
      sortByUpload(this.state.searchOrder);
    }
    this.setState({
      photoPagination: {
        maxAllowed: this.state.photoPagination.maxAllowed,
        page: 0
      }
    });
  };

  changePage = direction => {
    const { maxAllowed, page } = this.state.photoPagination;
    if (direction < 0) {
      if (this.state.photoPagination.page > 0) {
        setTimeout(
          () =>
            this.setState({
              photoPagination: { maxAllowed: maxAllowed, page: page - 1 }
            }),
          300
        );
      }
    } else {
      if (
        Math.floor(
          this.props.photos.length / this.state.photoPagination.maxAllowed
        ) >=
        page + 1
      ) {
        setTimeout(
          () =>
            this.setState({
              photoPagination: { maxAllowed: maxAllowed, page: page + 1 }
            }),
          300
        );
      }
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };

  setPage = number => {
    setTimeout(() => this.setState({
      photoPagination: {
        maxAllowed: this.state.photoPagination.maxAllowed,
        page: number
      }
    }), 300)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };

  render() {
    const {
      photos,
      cats,
      filters,
      removeSearch,
      setRoute,
      loadingPhotos,
      setSelectedId
    } = this.props;

    const { maxAllowed, page } = this.state.photoPagination;

    const pageLimit = Math.floor(
      photos.length / this.state.photoPagination.maxAllowed
    );

    // For gallery
    var mapped = photos
      .slice(page * maxAllowed, (page + 1) * maxAllowed)
      .map(el => ({
        src: el.thumbnail,
        height: el.aspect_h,
        width: el.aspect_w,
        id: el.id
      }));

    // Utility Function
    var isSelected = (id, array) => {
      return array ? array.filter(el => el === id).length !== 0 : false;
    };
    // arr1 is sorted
    var arraysIntersect = (arr1, arr2) => {
      return arr1.filter(el => arr2.indexOf(el) > -1).length !== 0;
    };
    var currentCats = cats
      ? cats.slice(0, this.state.maxAllowedCategories).map(el => {
          return {
            ...el,
            selected: isSelected(el.id, this.state.selectedCategories)
          };
        })
      : [];

    if (this.state.redirect) {
      setRoute("/photo/"); // For NavLink in Navbar
      setSelectedId(this.state.chosenPhotoIndex); // For in photo navigation
      return (
        <Redirect
          push
          to={`/photo/${mapped[this.state.chosenPhotoIndex].id}`}
        />
      );
    }

    return (
      <Fragment>
        <Helmet>
          <meta property="og:title" content="Buscar fotografias" />
          <meta property="og:type" content="Motor de búsqueda" />
          <meta
            property="og:url"
            content=" http://memoriafotografica.ing.fcfm.cl/"
          />
          <meta property="og:image" content=" http://example.com/image.jpg" />
          <meta property="og:description" content="Descripcion" />
          <title>Buscar fotografias</title>
        </Helmet>
        <div style={styles.galleryMenu}>
          <Container>
            <Row>
              <Col md="7" lg="9">
                <div style={styles.filtersContainer}>
                  {filters.length != 0 ? (
                    filters.map(el => (
                      <span
                        key={el.metaID}
                        style={styles.tags}
                        onClick={() => removeSearch(el.metaID, el.value)}>
                        #{el.value} <FontAwesomeIcon icon={faTimesCircle} />
                      </span>
                    ))
                  ) : (
                    <h2> Todas las fotograf&iacute;as</h2>
                  )}
                </div>
              </Col>
              <Col md="5" lg="3">
                <ButtonDropdown
                  isOpen={this.state.catsOpen}
                  toggle={this.toggleCategory}
                  direction="down"
                  className="home-button">
                  <DropdownToggle
                    caret
                    style={
                      !this.state.catsOpen
                        ? { ...styles.dropdownButton }
                        : {
                            ...styles.dropdownButton,
                            backgroundColor: "#e9ecef8a"
                          }
                    }>
                    Categorias
                    {this.state.selectedCategories.length > 0 ? (
                      <span style={styles.selectedCatsNumber}>
                        {this.state.selectedCategories.length}
                      </span>
                    ) : null}
                  </DropdownToggle>
                  <DropdownMenu
                    style={{
                      width: "30em",
                      boxShadow: "0 0 15px 0 rgba(0,0,0,.20)"
                    }}>
                    <div style={styles.triangulo}></div>
                    <Row>
                      <Categories
                        categorias={
                          currentCats
                            ? currentCats.filter((e, i) => i % 2 === 0)
                            : []
                        }
                        onClick={this.pickCategory}
                      />
                      <Categories
                        categorias={
                          currentCats
                            ? currentCats.filter((e, i) => i % 2 === 1)
                            : []
                        }
                        onClick={this.pickCategory}
                      />
                    </Row>
                    <Row>
                      <Col>
                        <DropdownItem
                          style={{ textAlign: "center" }}
                          onClick={this.allowMoreCats}>
                          Cargar más categorias
                        </DropdownItem>
                      </Col>
                    </Row>
                  </DropdownMenu>
                </ButtonDropdown>
                <UncontrolledButtonDropdown className="home-button">
                  <DropdownToggle caret style={styles.dropdownButton}>
                    Ordenar
                  </DropdownToggle>
                  <DropdownMenu
                    style={{ boxShadow: "0 0 15px 0 rgba(0,0,0,.20)" }}>
                    <div style={styles.triangulo}></div>
                    <DropdownItem header>Por orden cronológico</DropdownItem>
                    <DropdownItem>Más antiguas primero</DropdownItem>
                    <DropdownItem>Más nuevas primero</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem header>Por fecha de subida</DropdownItem>
                    <DropdownItem onClick={() => this.setSortingOrder("asc")}>
                      Más antiguas primero
                    </DropdownItem>
                    <DropdownItem onClick={() => this.setSortingOrder("desc")}>
                      Más nuevas primero
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </Col>
            </Row>
          </Container>
        </div>
        <Container fluid style={styles.galleryContainer}>
          <Row>
            <Col>
              {loadingPhotos ? (
                <LeitSpinner />
              ) : (
                <Gallery
                  photos={mapped}
                  targetRowHeight={200}
                  onClick={(e, index) => this.handleOnClick(index)}
                />
              )}
            </Col>
          </Row>
          <Row style={{ marginTop: "2em" }}>
            <Col>
              <Pagination
                size="lg"
                aria-label="Page navigation example"
                style={{ justifyContent: "center" }}>
                <PaginationItem
                  disabled={0 === this.state.photoPagination.page}>
                  <PaginationLink first onClick={() => this.setPage(0)} />
                </PaginationItem>
                <PaginationItem
                  disabled={0 === this.state.photoPagination.page}>
                  <PaginationLink
                    previous
                    onClick={() => this.changePage(-1)}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>
                    {this.state.photoPagination.page + 1}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem
                  disabled={pageLimit < this.state.photoPagination.page + 1}>
                  <PaginationLink next onClick={() => this.changePage(1)} />
                </PaginationItem>
                <PaginationItem
                  disabled={pageLimit < this.state.photoPagination.page + 1}>
                  <PaginationLink
                    last
                    onClick={() => this.setPage(pageLimit)}
                  />
                </PaginationItem>
              </Pagination>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

const Categories = ({ categorias, onClick }) => (
  <Col>
    {categorias.length == 0
      ? "-"
      : categorias.map((el, index) => (
          <DropdownItem
            key={el.id}
            onClick={() => onClick(el.id)}
            style={el.selected ? styles.Selected : styles.unSelected}>
            {el.title}
            {el.selected ? <FontAwesomeIcon icon={faCheck} /> : ""}
          </DropdownItem>
        ))}
  </Col>
);

const styles = {
  galleryMenu: {
    margin: "0 auto",
    borderBottom: "1px solid rgb(210,214,218)",
    background: "white",
    position: "sticky",
    top: "4em",
    zIndex: "2"
  },
  galleryContainer: {
    width: "100%",
    minHeight: "100vh",
    padding: "1.25em 3.1em",
    backgroundColor: "#f7f8fa",
    textAlign: "center",
    marginBottom: "-2em"
  },
  filtersContainer: {
    paddingTop: "1em",
    display: "flex",
    alignItems: "left",
    verticalAlign: "middle",
    flexDirection: "row"
  },
  tags: {
    color: "white",
    borderRadius: "10px",
    backgroundColor: "#9a9e9d",
    margin: "2px",
    padding: "4px 12px 4px 12px"
  },
  dropdownButton: {
    color: "#ff5a60",
    backgroundColor: "white",
    margin: "1em 1em 0.5em 1em",
    borderRadius: "0",
    padding: "10px",
    border: "none"
  },
  selectedCatsNumber: {
    backgroundColor: "#f2f2f2",
    color: "#ff5a60",
    padding: "0.5em",
    borderRadius: "0.5em"
  },
  unSelected: {
    color: "#97878f"
  },
  Selected: {
    color: "#97878f",
    fontWeight: "bold"
  },
  triangulo: {
    position: "absolute",
    width: "20px",
    height: "20px",
    borderTop: "1px solid rgb(210,214,218)",
    borderRight: "0px solid rgb(210,214,218)",
    borderBottom: "0px solid rgb(210,214,218)",
    borderLeft: "1px solid rgb(210,214,218)",
    top: "0",
    left: "8em",
    marginLeft: "-25px",
    content: "",
    transform: "rotate(45deg)",
    marginTop: "-10px",
    background: "#ffff"
  }
};

const mapStateToProps = state => {
  return {
    photos: state.home.photos,
    cats: state.home.all_cats,
    filters: state.search.metaIDs,
    auth: state.auth.token,
    loadingPhotos: state.home.loading
  };
};

const mapActionsToProps = dispatch => ({
  onLoadGetPhotos: () => dispatch(home.home()),
  onLoadGetCats: () => dispatch(home.categories()),
  setRoute: route => dispatch(misc.setCurrentRoute(route)),
  removeSearch: (id, value) => dispatch(search.removeSearchItem(id, value)),
  sortByField: (tag, order) => dispatch(home.sortByField(tag, order)),
  sortByUpload: order => dispatch(home.sortByUpload(order)),
  recoverByCats: (catIds, order) => dispatch(home.recoverByCats(catIds, order)),
  setSelectedId: id => dispatch(home.setSelectedId(id))
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Home);
