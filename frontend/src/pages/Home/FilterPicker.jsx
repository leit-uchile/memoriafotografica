import React, { Fragment, useState, useEffect } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  Container,
  Row,
  Col,
  UncontrolledButtonDropdown,
  DropdownItem,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Categories from "./Categories";
import { connect } from "react-redux";
import { gallery } from "../../actions";

/**
 * FilterPicker
 *
 * Allows to pick between categories and sort orders
 *
 * Displays two large dropdown menus
 * @param {Number} defaultMaxAllowed
 * @param {Number} page to send to the backend
 * @param {Number} maxPerPage photos per page
 * @param {Function} resetHomePagination after a search reset page
 * @param {Function} onLoadGetCats action
 * @param {Function} sortByUpload action
 * @param {Function} recoverByCats action
 * @param {Object} cats count and categories
 * TODO: find a better way to fix the photo url
 * @param {Function} putInfo put the categories IDs on parent component
 */
const FilterPicker = ({
  defaultMaxAllowed,
  resetHomePagination,
  filters,
  page,
  maxPerPage,
  putInfo,
  // Actions
  getCats,
  sortByField,
  recoverByCats,
  // Store
  cats,
}) => {
  const [toggleCats, setToggleCats] = useState(false);
  const [filterState, setFilterState] = useState({
    selectedCategories: [],
    maxAllowed: defaultMaxAllowed,
    searchOrder: { field: "created_at", order: "desc" },
  });

  // Initial Load
  useEffect(() => {
    getCats(0, filterState.maxAllowed);
  }, [getCats, filterState.maxAllowed]);

  var allowMoreCats = () => {
    if (filterState.maxAllowed < cats.total) {
      setFilterState({
        ...filterState,
        maxAllowed: filterState.maxAllowed + 4,
      });
    }
  };

  const setSortingOrder = (order) => {
    setFilterState({ ...filterState, searchOrder: order });
    resetHomePagination();
  };

  // Add category's ID
  const pickCategory = (id) => {
    // Remove if in already
    if (filterState.selectedCategories.filter((el) => el === id).length !== 0) {
      setFilterState({
        ...filterState,
        selectedCategories: filterState.selectedCategories.filter(
          (el) => el !== id
        ),
      });
    } else {
      setFilterState({
        ...filterState,
        selectedCategories: [...filterState.selectedCategories, id],
      });
    }
    resetHomePagination();
  };

  // Reload Search Effect
  useEffect(() => {
    if (filterState.selectedCategories.length !== 0) {
      recoverByCats(
        filterState.selectedCategories,
        filterState.searchOrder,
        page,
        maxPerPage
      );
    } else {
      sortByField(
        filterState.searchOrder.field,
        filterState.searchOrder.order,
        page,
        maxPerPage
      );
    }
    // Pass this to our parent so that after clicking a Photo our preferences
    // are saved on the URL query params
    putInfo({
      cats: filterState.selectedCategories,
      sorting: `${filterState.searchOrder.field}-${filterState.searchOrder.order}`,
    });
  }, [
    filterState.searchOrder,
    filterState.selectedCategories,
    filters,
    page,
    maxPerPage,
    recoverByCats,
    sortByField,
    putInfo,
  ]);

  // If filters change reset pagination
  useEffect(() => {
    resetHomePagination();
  }, [filters, resetHomePagination]);

  // Utility Function
  var isSelected = (id, array) => {
    return array ? array.filter((el) => el === id).length !== 0 : false;
  };

  var currentCats = cats
    ? cats.categories.map((el) => ({
        ...el,
        selected: isSelected(el.id, filterState.selectedCategories),
      }))
    : [];

  return (
    <Fragment>
      <ButtonDropdown
        isOpen={toggleCats}
        toggle={() => setToggleCats(!toggleCats)}
        direction="down"
        className="home-button"
      >
        <DropdownToggle
          caret
          style={
            !toggleCats
              ? { ...styles.dropdownButton }
              : {
                  ...styles.dropdownButton,
                  backgroundColor: "#e9ecef8a",
                }
          }
        >
          Categorias
          {filterState.selectedCategories.length > 0 ? (
            <span style={styles.selectedCatsNumber}>
              {filterState.selectedCategories.length}
            </span>
          ) : null}
        </DropdownToggle>
        <DropdownMenu
          style={{
            boxShadow: "0 0 15px 0 rgba(0,0,0,.20)",
          }}
          className="home-category-filter"
        >
          <div style={styles.triangulo}></div>
          <Container fluid>
            {currentCats.length > 0 ? (
              <Row>
                <Categories
                  categorias={
                    currentCats ? currentCats.filter((e, i) => i % 2 === 0) : []
                  }
                  onClick={pickCategory}
                  size={{ md: "6" }}
                />
                <Categories
                  categorias={
                    currentCats ? currentCats.filter((e, i) => i % 2 === 1) : []
                  }
                  onClick={pickCategory}
                  size={{ md: "6" }}
                />
              </Row>
            ) : (
              <Row>
                <p style={styles.noCats}>No hay categorías disponibles</p>
              </Row>
            )}
            {filterState.maxAllowed < cats.total ? (
              <Row>
                <Col>
                  <DropdownItem
                    style={{ textAlign: "center" }}
                    onClick={allowMoreCats}
                  >
                    Cargar más categorias
                  </DropdownItem>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col></Col>
              </Row>
            )}
          </Container>
        </DropdownMenu>
      </ButtonDropdown>
      <UncontrolledButtonDropdown className="home-button">
        <DropdownToggle caret style={styles.dropdownButton}>
          Ordenar
        </DropdownToggle>
        <DropdownMenu style={{ boxShadow: "0 0 15px 0 rgba(0,0,0,.20)" }}>
          <div style={styles.triangulo}></div>
          <DropdownItem header>Por orden cronológico</DropdownItem>
          <DropdownItem
            style={
              filterState.searchOrder.field === "upload_date" &&
              filterState.searchOrder.order === "asc"
                ? styles.selectedSort
                : styles.unselectedSort
            }
            onClick={() => {
              setSortingOrder({ field: "upload_date", order: "asc" });
              console.log(filterState.searchOrder);
            }}
          >
            Más antiguas primero{" "}
            {filterState.searchOrder.field === "upload_date" &&
            filterState.searchOrder.order === "asc" ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              ""
            )}
          </DropdownItem>
          <DropdownItem
            style={
              filterState.searchOrder.field === "upload_date" &&
              filterState.searchOrder.order === "desc"
                ? styles.selectedSort
                : styles.unselectedSort
            }
            onClick={() =>
              setSortingOrder({ field: "upload_date", order: "desc" })
            }
          >
            Más nuevas primero{" "}
            {filterState.searchOrder.field === "upload_date" &&
            filterState.searchOrder.order === "desc" ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              ""
            )}
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem header>Por fecha de subida</DropdownItem>
          <DropdownItem
            style={
              filterState.searchOrder.field === "created_at" &&
              filterState.searchOrder.order === "asc"
                ? styles.selectedSort
                : styles.unselectedSort
            }
            onClick={() =>
              setSortingOrder({ field: "created_at", order: "asc" })
            }
          >
            Más antiguas primero{" "}
            {filterState.searchOrder.field === "created_at" &&
            filterState.searchOrder.order === "asc" ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              ""
            )}
          </DropdownItem>
          <DropdownItem
            style={
              filterState.searchOrder.field === "created_at" &&
              filterState.searchOrder.order === "desc"
                ? styles.selectedSort
                : styles.unselectedSort
            }
            onClick={() =>
              setSortingOrder({ field: "created_at", order: "desc" })
            }
          >
            Más nuevas primero{" "}
            {filterState.searchOrder.field === "created_at" &&
            filterState.searchOrder.order === "desc" ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              ""
            )}
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </Fragment>
  );
};

const styles = {
  dropdownButton: {
    color: "#ff5a60",
    backgroundColor: "white",
    margin: "1em 1em 0.5em 1em",
    borderRadius: "0",
    padding: "10px",
    border: "none",
  },
  noCats: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "8px",
    color: "#6c757d",
  },
  selectedCatsNumber: {
    backgroundColor: "#f2f2f2",
    color: "#ff5a60",
    padding: "0.5em",
    borderRadius: "0.5em",
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
    background: "#ffff",
  },
  unselectedSort: {
    color: "#97878f",
  },
  selectedSort: {
    color: "#97878f",
    fontWeight: "bold",
  },
};

const mapStateToProps = (state) => ({
  cats: state.categories,
  filters: state.site_misc.searchMetaIDs,
});

const mapActionstoProps = (dispatch) => ({
  getCats: (page, pageSize) =>
    dispatch(gallery.category.getCategories(page, pageSize)),
  sortByField: (tag, order, page, size) =>
    dispatch(gallery.photos.sortByField(tag, order, page, size)),
  recoverByCats: (catIds, order, page, size) =>
    dispatch(gallery.photos.recoverByCats(catIds, order, page, size)),
});

export default connect(mapStateToProps, mapActionstoProps)(FilterPicker);
