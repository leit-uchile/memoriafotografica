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
  Badge,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
//import Categories from "./Categories";
import { connect } from "react-redux";
import { gallery } from "../../actions";
import { bindActionCreators } from "redux";
import { selectCats,
          selectSiteMiscSearchMetaIDS}  from "../../reducers"
import "./filterPicker.css";

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
      >
        <DropdownToggle
          caret
          className={`filter-toggle ${!toggleCats ? "" : "active"}`}
        >
          Categorias
          {filterState.selectedCategories.length > 0 ? (
            <Badge style={{ marginLeft: "4px" }} color="secondary">
              {filterState.selectedCategories.length}
            </Badge>
          ) : null}
        </DropdownToggle>
        <DropdownMenu className="filter-button">
          <div className="filter-triangle"></div>
          <Container fluid className="filter-cats">
            {currentCats.length > 0 ? (
              <Row fluid>
              </Row>
            ) : (
              <Row>
                <p style={{ marginTop: "8px", color: "#6c757d" }}>
                  No hay categorías disponibles
                </p>
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
      <UncontrolledButtonDropdown>
        <DropdownToggle caret className="filter-toggle">
          Ordenar
        </DropdownToggle>
        <DropdownMenu className="filter-button">
          <div className="filter-triangle"></div>
          <DropdownItem header>Por orden cronológico</DropdownItem>
          <DropdownItem
            className={`filter-sort ${
              filterState.searchOrder.field === "upload_date" &&
              filterState.searchOrder.order === "asc"
                ? "selected"
                : ""
            }`}
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
            className={`filter-sort ${
              filterState.searchOrder.field === "upload_date" &&
              filterState.searchOrder.order === "desc"
                ? "selected"
                : ""
            }`}
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
            className={`filter-sort ${
              filterState.searchOrder.field === "created_at" &&
              filterState.searchOrder.order === "asc"
                ? "selected"
                : ""
            }`}
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
            className={`filter-sort ${
              filterState.searchOrder.field === "created_at" &&
              filterState.searchOrder.order === "desc"
                ? "selected"
                : ""
            }`}
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

const mapStateToProps = (state) => ({
  cats: selectCats(state),
  filters: selectSiteMiscSearchMetaIDS(state),
});

const mapActionstoProps = (dispatch) =>
  bindActionCreators(
    {
      getCats: gallery.category.getCategories,
      sortByField: gallery.photos.sortByField,
      recoverByCats: gallery.photos.recoverByCats,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionstoProps)(FilterPicker);
