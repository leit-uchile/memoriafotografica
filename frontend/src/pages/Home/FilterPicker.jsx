import React, { Fragment, useState, useEffect } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  Container,
  Row,
  Col,
  UncontrolledButtonDropdown,
  DropdownItem
} from "reactstrap";
import Categories from "./Categories";
import { connect } from "react-redux";
import { home } from "../../actions";

/**
 * FilterPicker
 *
 * Allows to pick between categories and sort orders
 *
 * Displays two large dropdown menus
 * @param {Number} defaultMaxAllowed
 * @param {Function} resetHomePagination after a search reset page
 * @param {Function} onLoadGetCats action
 * @param {Function} sortByUpload action
 * @param {Function} recoverByCats action
 * @param {Array} cats categories from store
 */
const FilterPicker = ({
  defaultMaxAllowed,
  resetHomePagination,
  filters,
  // Actions
  onLoadGetCats,
  sortByField,
  recoverByCats,
  // Store
  cats,
}) => {
  const [toggleCats, setToggleCats] = useState(false);
  const [filterState, setFilterState] = useState({
    selectedCategories: [],
    maxAllowed: defaultMaxAllowed,
    searchOrder: {field: "created_at", order: "desc"}
  });

  // Initial Load
  useEffect(() => {
    onLoadGetCats();
  }, []);

  const allowMoreCats = () => {
    setFilterState({
      ...filterState,
      maxAllowed: filterState.maxAllowed + 4
    });
  };

  const setSortingOrder = order => {
    setFilterState({ ...filterState, searchOrder: order });
  };

  const reloadOnChange = () => {
    if (filterState.selectedCategories.length !== 0) {
      recoverByCats(filterState.selectedCategories, filterState.searchOrder);
    } else {
      sortByField(filterState.searchOrder.field, filterState.searchOrder.order);
    }
    resetHomePagination();
  };

  // Add category's ID
  const pickCategory = id => {
    // Remove if in already
    if (filterState.selectedCategories.filter(el => el === id).length !== 0) {
      setFilterState({
        ...filterState,
        selectedCategories: filterState.selectedCategories.filter(
          el => el !== id
        )
      });
    } else {
      setFilterState({
        ...filterState,
        selectedCategories: [...filterState.selectedCategories, id]
      });
    }
  };

  // Reload Search Effect
  useEffect(() => {
    reloadOnChange();
  }, [filterState.searchOrder, filterState.selectedCategories, filters]);

  // Utility Function
  var isSelected = (id, array) => {
    return array ? array.filter(el => el === id).length !== 0 : false;
  };

  var currentCats = cats
    ? cats
        .slice(0, filterState.maxAllowedCategories)
        .map(el => ({
          ...el,
          selected: isSelected(el.id, filterState.selectedCategories)
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
                  backgroundColor: "#e9ecef8a"
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
            width: "38em",
            boxShadow: "0 0 15px 0 rgba(0,0,0,.20)"
          }}
        >
          <div style={styles.triangulo}></div>
          <Container fluid>
            <Row>
              <Categories
                categorias={
                  currentCats ? currentCats.filter((e, i) => i % 2 === 0) : []
                }
                onClick={pickCategory}
                size={{md: "6"}}
              />
              <Categories
                categorias={
                  currentCats ? currentCats.filter((e, i) => i % 2 === 1) : []
                }
                onClick={pickCategory}
                size={{md: "6"}}
              />
            </Row>
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
          <DropdownItem onClick={() => setSortingOrder({field: "upload_date", order: "asc"})}>Más antiguas primero</DropdownItem>
          <DropdownItem onClick={() => setSortingOrder({field: "upload_date", order: "desc"})}>Más nuevas primero</DropdownItem>
          <DropdownItem divider />
          <DropdownItem header>Por fecha de subida</DropdownItem>
          <DropdownItem onClick={() => setSortingOrder({field: "created_at", order: "asc"})}>
            Más antiguas primero
          </DropdownItem>
          <DropdownItem onClick={() => setSortingOrder({field: "created_at", order: "desc"})}>
            Más nuevas primero
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
    border: "none"
  },
  selectedCatsNumber: {
    backgroundColor: "#f2f2f2",
    color: "#ff5a60",
    padding: "0.5em",
    borderRadius: "0.5em"
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

const mapStateToProps = state => ({
  cats: state.home.all_cats,
  filters: state.search.metaIDs,
});

const mapActionstoProps = dispatch => ({
  onLoadGetCats: () => dispatch(home.categories()),
  sortByField: (tag, order) => dispatch(home.sortByField(tag, order)),
  recoverByCats: (catIds, order) => dispatch(home.recoverByCats(catIds, order))
});

export default connect(mapStateToProps, mapActionstoProps)(FilterPicker);
