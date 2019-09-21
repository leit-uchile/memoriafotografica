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
  DropdownItem
} from "reactstrap";
import { Redirect } from "react-router-dom";
//import gallery from "../css/galleryHome.css";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Gallery from "react-photo-gallery";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategories: [],
      maxAllowedCategories: 8,
      maxPhotos: 40,
      redirect: false,
      link: "",
      catsOpen: false,
      sortOpen: false,
      chosenPhotoIndex: 0
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.pickCategory = this.pickCategory.bind(this);
    this.allowMoreCats = this.allowMoreCats.bind(this);
    this.allowMorePics = this.allowMorePics.bind(this);
    this.toggleCategory = this.toggleCategory.bind(this);
  }

  handleOnClick = obj => {
    this.setState({ redirect: true, chosenPhotoIndex: obj.index });
  };

  componentWillMount() {
    this.props.setRoute("/gallery/");
    this.props.onLoadGetPhotos();
    this.props.onLoadGetCats();
  }

  allowMoreCats() {
    this.setState({
      maxAllowedCategories: this.state.maxAllowedCategories + 4
    });
  }

  allowMorePics() {
    this.setState({ maxPhotos: this.state.maxPhotos + 10 });
  }

  toggleCategory() {
    this.setState({ catsOpen: !this.state.catsOpen });
  }

  pickCategory(id) {
    // Remove if in already
    if (this.state.selectedCategories.filter(el => el === id).length !== 0) {
      this.setState({
        selectedCategories: this.state.selectedCategories.filter(
          el => el !== id
        )
      });
    } else {
      this.setState({
        selectedCategories: [...this.state.selectedCategories, id]
      });
    }
  }

  render() {
    const {
      photos,
      cats,
      filters,
      removeSearch,
      sortByTag,
      sortByUpload,
      auth,
      setRoute
    } = this.props;

    var filtersId = filters.map(el => el.metaID);
    var filtersText =
      filters.length != 0 ? (
        filters.map(el => (
          <span
            key={el.metaID}
            style={styles.tags}
            onClick={() => removeSearch(el.metaID, el.value)}>
            #{el.value} <FontAwesomeIcon icon={faTimesCircle} />
          </span>
        ))
      ) : (
        <h2>Todas las fotograf&iacute;as</h2>
      );

    var mapped = photos.map(el => ({
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
    var currentCats1 = currentCats
      ? currentCats
          .filter((e, i) => i % 2 === 0)
          .map(el => {
            return {
              ...el,
              selected: isSelected(el.id, this.state.selectedCategories)
            };
          })
      : [];
    var currentCats2 = currentCats
      ? currentCats
          .filter((e, i) => i % 2 === 1)
          .map(el => {
            return {
              ...el,
              selected: isSelected(el.id, this.state.selectedCategories)
            };
          })
      : [];

    if (
      filters &&
      filters.length === 0 &&
      this.state.selectedCategories.length === 0
    ) {
      var currentPhotos = mapped.slice(0, this.state.maxPhotos); //todas las fotos
    } else if (
      filters &&
      filters.length !== 0 &&
      this.state.selectedCategories.length !== 0
    ) {
      //hay tag y categoria -> intersectar
      currentPhotos = photos
        .filter(
          el =>
            arraysIntersect(el.category, this.state.selectedCategories) &&
            arraysIntersect(el.metadata, filtersId)
        )
        .slice(0, this.state.maxPhotos);
    } else {
      //cuando falta uno de los dos -> union
      currentPhotos = photos
        .filter(
          el =>
            arraysIntersect(el.category, this.state.selectedCategories) ||
            arraysIntersect(el.metadata, filtersId)
        )
        .slice(0, this.state.maxPhotos);
    }

    var selectedCatsNumber =
      this.state.selectedCategories.length > 0 ? (
        <span style={styles.selectedCatsNumber}>
          {this.state.selectedCategories.length}
        </span>
      ) : null;
    if (this.state.redirect) {
      setRoute("/photo/");
      return (
        <Redirect
          push
          to={`/photo/${currentPhotos[this.state.chosenPhotoIndex].id}`}
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
        <Container >
        <Row>
          <Col md="9">
            <div style={styles.filtersContainer}>{filtersText}</div>
          </Col>
          <Col md="3">
            <ButtonDropdown
              isOpen={this.state.catsOpen}
              toggle={this.toggleCategory}
              direction="down">
              <DropdownToggle
                caret
                style={styles.dropdownButton}
                color="danger">
                Categorias {selectedCatsNumber}
              </DropdownToggle>
              <DropdownMenu
                style={
                  this.state.catsOpen
                    ? { boxShadow: "0 0 15px 0 rgba(0,0,0,.20)" }
                    : { visibility: "hidden" }
                }>
                <Container fluid>
                  <Row>
                    <Categories
                      categorias={currentCats1}
                      onClick={this.pickCategory}
                    />
                    <Categories
                      categorias={currentCats2}
                      onClick={this.pickCategory}
                    />
                  </Row>
                  <Row>
                    <Col>
                      <DropdownItem
                        onClick={this.allowMoreCats}>
                        Cargar más categorias
                      </DropdownItem>
                    </Col>
                  </Row>
                </Container>
              </DropdownMenu>
            </ButtonDropdown>
            <UncontrolledButtonDropdown>
              <DropdownToggle
                caret
                style={styles.dropdownButton}
                color="danger">
                Ordenar
              </DropdownToggle>
              <DropdownMenu style={{ boxShadow: "0 0 15px 0 rgba(0,0,0,.20)" }}>
                <DropdownItem header>Por orden cronológico</DropdownItem>
                <DropdownItem onClick={() => sortByUpload("asc", auth)}>
                  Más antiguas primero
                </DropdownItem>
                <DropdownItem onClick={() => sortByUpload("desc", auth)}>
                  Más nuevas primero
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem header>Por fecha de subida</DropdownItem>
                <DropdownItem>Más antiguas primero</DropdownItem>
                <DropdownItem>Más nuevas primero</DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </Col>
        </Row>
        </Container>
        </div>
        <Container fluid style={styles.galleryContainer}>
          <Gallery
            photos={mapped}
            targetRowHeight={200}
            onClick={(e, index) => this.handleOnClick(index)}
          />
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
    top: "4em"
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
    margin: "1em 1em 0 1em",
    border: "1px solid black",
    borderRadius: "0",
    padding: "10px"
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
  galleryContainer: {
    width: "100%",
    minHeight: "100vh",
    padding: "1.25em 3.1em",
    backgroundColor: "#f7f8fa"
  }
};
const mapStateToProps = state => {
  return {
    photos: state.home.photos,
    cats: state.home.all_cats,
    filters: state.search.metaIDs,
    auth: state.auth.token
  };
};

const mapActionsToProps = dispatch => {
  return {
    onLoadGetPhotos: () => {
      return dispatch(home.home());
    },
    onLoadGetCats: () => {
      return dispatch(home.categories());
    },
    setRoute: route => {
      return dispatch(misc.setCurrentRoute(route));
    },
    removeSearch: (id, value) => {
      return dispatch(search.removeSearchItem(id, value));
    },
    sortByTag: (tag, order, auth) => {
      return dispatch(home.sortByField(tag, order, auth));
    },
    sortByUpload: (order, auth) => {
      return dispatch(home.sortByUpload(order, auth));
    }
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Home);
