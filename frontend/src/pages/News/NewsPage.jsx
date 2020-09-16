import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { site_misc, webadmin } from "../../actions";
import {
  Container,
  Row,
  Col,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Form,
  Input,
  Label,
  Button,
} from "reactstrap";
import { Pagination, LeitSpinner } from "../../components";
import { Helmet } from "react-helmet";
import "./news.css";
import { bindActionCreators } from "redux";

const NewsPage = (props) => {
  const { setRoute, loadNews } = props;

  const [page, setPage] = useState({
    page: 0,
    page_size: 2,
    loading: true,
  });

  useEffect(() => {
    setRoute("/news");
    loadNews(page.page, page.page_size);
    // eslint-disable-next-line
  }, [loadNews]);

  useEffect(() => {
    if (props.news.length !== 0) {
      setPage((d) => ({ ...d, loading: false }));
    }
  }, [props.news]);
  const recoverUrl = () => {
    const { created_at, created_at_until, sort } = page;
    let url = "";
    if (created_at && created_at !== "") {
      url = url + `&created_at=${created_at}`;
    }
    if (created_at_until && created_at_until !== "") {
      url = url + `&created_at_until=${created_at_until}`;
    }
    if (sort && sort !== "") {
      url = url + `&sort=${sort}`;
    }
    return url;
  };

  const setDaPage = (p) => {
    setPage((s) => ({ ...s, page: p, loading: true }));
    let url = recoverUrl();
    setTimeout(() => loadNews(p, page.page_size, url), 300);
  };

  const handleChange = (event) => {
    event.persist(); // Fix Syntetic Event failure
    setPage((d) => ({
      ...d,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setDaPage(0);
  };

  return (
    <Container className="news-page">
      <Helmet>
        <title>Noticias</title>
      </Helmet>
      <Row
        className="album-title-row"
        style={{ borderBottom: "none", marginBottom: 0 }}
      >
        <Col>
          <h2>Noticias</h2>
        </Col>
      </Row>
      <Row>
        <Col md={3} className="news-menu">
          <h3>Filtrar por fecha</h3>
          <Form onSubmit={handleSearch}>
            <FormGroup>
              <Label for="startdate">Desde</Label>
              <Input
                name="created_at"
                id="startdate"
                type="date"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="enddate">Hasta</Label>
              <Input
                name="created_at_until"
                id="enddate"
                type="date"
                onChange={handleChange}
              />
            </FormGroup>
            <Button type="submit" color="primary" block>
              Filtrar
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <Container fluid>
            <Row>
              <Col>
                <UncontrolledButtonDropdown style={{ marginTop: "1em" }}>
                  <DropdownToggle caret>Ordenar</DropdownToggle>
                  <DropdownMenu
                    style={{ boxShadow: "0 0 15px 0 rgba(0,0,0,.20)" }}
                  >
                    <div className="dropdown-triangle"></div>
                    <DropdownItem header>Por fecha de subida</DropdownItem>
                    <DropdownItem
                      onClick={() =>
                        handleChange({
                          target: { name: "sort", value: "created_at-asc" },
                          persist: () => {},
                        })
                      }
                    >
                      Más antiguas primero
                    </DropdownItem>
                    <DropdownItem
                      onClick={() =>
                        handleChange({
                          target: { name: "sort", value: "created_at-desc" },
                          persist: () => {},
                        })
                      }
                    >
                      Más nuevas primero
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </Col>
            </Row>
            {page.loading ? (
              <Row>
                <Col style={{ textAlign: "center", height: "400px" }}>
                  <LeitSpinner />
                </Col>
              </Row>
            ) : (
              props.news.slice(0, page.page_size).map((it, key) => (
                <div className="color-box" key={key}>
                  <Row>
                    <Col>
                      <img src={it.image} width="80%" alt={it.title} />
                    </Col>
                    <Col>
                      <h3>{it.title}</h3>
                      <p>{it.content}</p>
                    </Col>
                  </Row>
                </div>
              ))
            )}
          </Container>
          <Pagination
            count={props.count}
            page_size={page.page_size}
            page={page.page}
            setStatePage={setDaPage}
            size="lg"
            label="news-pagination"
            displayFirst
            displayLast
          />
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  news: state.webadmin.news.results,
  count: state.webadmin.news.count,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      loadNews: webadmin.getNews,
      setRoute: site_misc.setCurrentRoute,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(NewsPage);
