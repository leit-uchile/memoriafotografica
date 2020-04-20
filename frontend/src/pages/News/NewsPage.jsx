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
  DropdownItem
} from "reactstrap";
import "./news.css";

const NewsPage = props => {
  const { setRoute, loadNews } = props;

  useEffect(() => {
    setRoute("/news");
    loadNews();
  }, [loadNews]);

  return (
    <Container>
      <Row>
        <Col md={3} style={styles.leftcol}>
          <h3>Filtrar por fecha</h3>
        </Col>
        <Col md={9}>
          <UncontrolledButtonDropdown className="home-button">
            <DropdownToggle caret style={styles.dropdownButton}>
              Ordenar
            </DropdownToggle>
            <DropdownMenu style={{ boxShadow: "0 0 15px 0 rgba(0,0,0,.20)" }}>
              <div style={styles.triangulo}></div>
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

const styles = {
  leftcol: {
    position: "sticky",
    zIndex: "4",
    height: "fit-content",
    top: "1em",
    marginTop: "2em"
  },
  dropdownButton: {
    color: "var(--leit-pink)",
    backgroundColor: "white",
    margin: "1em 1em 0.5em 1em",
    borderRadius: "0",
    padding: "10px",
    border: "none"
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
  news: state.webadmin.news
});

const mapActionsToProps = dispatch => ({
  loadNews: () => dispatch(webadmin.getNews()),
  setRoute: route => dispatch(site_misc.setCurrentRoute(route))
});

export default connect(mapStateToProps, mapActionsToProps)(NewsPage);
