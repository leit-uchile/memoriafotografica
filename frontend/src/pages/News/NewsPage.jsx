import React, { useEffect } from "react";
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
} from "reactstrap";
import "./news.css";

const NewsPage = (props) => {
  const { setRoute, loadNews } = props;

  useEffect(() => {
    setRoute("/news");
    loadNews();
  }, [loadNews]);

  return (
    <Container className="news-page">
      <Row>
        <Col md={3} className="news-menu">
          <h3>Filtrar por fecha</h3>
        </Col>
        <Col md={9}>
          <UncontrolledButtonDropdown className="home-button">
            <DropdownToggle caret>Ordenar</DropdownToggle>
            <DropdownMenu style={{ boxShadow: "0 0 15px 0 rgba(0,0,0,.20)" }}>
              <div className="dropdown-triangle"></div>
              <DropdownItem header>Por fecha de subida</DropdownItem>
              <DropdownItem>Más antiguas primero</DropdownItem>
              <DropdownItem>Más nuevas primero</DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          {props.news.map((it, key) => (
            <div className="color-box">
              <Row>
                <Col>
                  <img src={it.image} width="80%" />
                </Col>
                <Col>
                  <h3>{it.title}</h3>
                  <p>{it.content}</p>
                </Col>
              </Row>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  news: state.webadmin.news,
});

const mapActionsToProps = (dispatch) => ({
  loadNews: () => dispatch(webadmin.getNews()),
  setRoute: (route) => dispatch(site_misc.setCurrentRoute(route)),
});

export default connect(mapStateToProps, mapActionsToProps)(NewsPage);
