import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Col,
  Row,
  Container,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Input,
  Collapse,
  Form,
  FormGroup,
  Label,
  Spinner,
} from "reactstrap";
import { connect } from "react-redux";
import { gallery } from "../../../actions";
import { LeitSpinner, Pagination } from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import CategoryTable from "./CategoryTable";
import { bindActionCreators } from "redux";
import {
  selectCategories,
  selectCategoriesTotal,
  selectCategoriesError,
  selectCategoriesCatUpdate,
} from "../../../reducers";
import DeleteModal from "./DeleteModal";

const Categories = ({
  cats,
  getCategories,
  total,
  setOps,
  createCategory,
  deleteCategories,
  updatedCat,
  catError,
  resetErrors,
}) => {
  const [pagination, setPagination] = useState({
    page: 0,
    page_size: 12,
    loading: true,
  });
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [sending, setSending] = useState(false);
  const [toDelete, setToDelete] = useState([]);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [params, setParams] = useState({
    redirect: false,
    url: "",
  });

  useEffect(() => {
    setPagination((pag) => ({ ...pag, loading: true }));
    getCategories(
      pagination.page + 0,
      pagination.page_size,
      "&sort=updated_at-desc"
    ).then((r) => {
      setPagination((pag) => ({ ...pag, loading: false }));
    });
  }, [pagination.page, pagination.page_size, updatedCat, getCategories]);

  const setPage = (p) => {
    setPagination((pag) => ({ ...pag, page: p }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    createCategory({
      pictures: [],
      title: title,
    }).then((r) => {
      setSending(false);
      setCreating(false);
      setTitle("");
    });
  };

  const updateToDelete = (i, isCheck) => {
    // Send update to API
    if (isCheck) {
      setToDelete([...toDelete, i]);
    } else {
      setToDelete(toDelete.filter((el) => el !== i));
    }
  };

  return params.redirect ? (
    <Redirect push to={params.url} />
  ) : (
    <Container fluid>
      <h2>Administrar Categorías</h2>
      <Row style={{ marginBottom: "10px" }}>
        <Col>
          <ButtonGroup>
            <Button color="primary" onClick={() => setCreating(!creating)}>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
            <Button
              onClick={() => setToggleDelete(!toggleDelete)}
              color={toDelete.length !== 0 ? "danger" : "secondary"}
              disabled={toDelete.length === 0}
            >
              <FontAwesomeIcon icon={faTrash} />
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
          <DeleteModal
            toggle={toggleDelete}
            setToggle={setToggleDelete}
            toDelete={toDelete}
            removeCategories={deleteCategories}
            setToDelete={setToDelete}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Collapse isOpen={creating}>
            <Card>
              <CardBody>
                <Form inline>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Label for="catName" className="mr-sm-2">
                      Nombre
                    </Label>
                    <Input
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      type="text"
                      placeholder="Categoria Nueva"
                      name="title"
                      maxLength="30"
                    />
                  </FormGroup>
                  <Button color="primary" onClick={onSubmit}>
                    {sending ? (
                      <Spinner style={{ width: "1rem", height: "1rem" }} />
                    ) : (
                      ""
                    )}{" "}
                    Crear
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Collapse>
        </Col>
      </Row>
      <div>
        {!pagination.loading ? (
          cats.length !== 0 ? (
            <Row>
              <Col>
                <CategoryTable
                  cats={cats}
                  updateToDelete={updateToDelete}
                  toDelete={toDelete}
                  redirect={(url) => setParams({ redirect: true, url: url })}
                />
              </Col>
            </Row>
          ) : (
            "No hay categorías disponibles"
          )
        ) : (
          <Row>
            <Col style={{ textAlign: "center" }}>
              <LeitSpinner />
            </Col>
          </Row>
        )}
        {total !== 0 ? (
          <Pagination
            count={total}
            page_size={pagination.page_size}
            page={pagination.page}
            setStatePage={setPage}
            size="md"
            label="metadata-pagination"
            displayFirst
            displayLast
          />
        ) : null}
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  cats: selectCategories(state),
  total: selectCategoriesTotal(state),
  catError: selectCategoriesError(state),
  updatedCat: selectCategoriesCatUpdate(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      setOps: gallery.category.setNBOps,
      getCategories: gallery.category.getCategories,
      deleteCategories: gallery.category.deleteCategories,
      createCategory: gallery.category.createCategory,
      resetErrors: gallery.category.resetErrors,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(Categories);
