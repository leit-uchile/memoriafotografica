import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  CardDeck,
  CardBody,
  Input,
  InputGroup,
  Button,
  InputGroupAddon,
} from "reactstrap";
import { Pagination } from "../../components";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { site_misc, gallery } from "../../actions";
import "./collection.css";
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import { selectAlbums } from "../../reducers";
import PropTypes from "prop-types";
import useAlbumList from "./hooks/useAlbumList";

const AllCollections = ({ setRoute, albums, loadCollections }) => {
  const [
    params,
    setParams,
    rows,
    page,
    setDaPage,
    formatDate,
    setRedirect,
    onSearch,
  ] = useAlbumList(setRoute, albums, loadCollections);

  if (params.redirectUrl) {
    return <Redirect push to={params.redirectUrl} />;
  }

  return (
    <Container style={{ marginBottom: "1em" }}>
      <Helmet>
        <title>Colecciones</title>
      </Helmet>
      <Row className="album-title-row" style={{ borderBottom: "none" }}>
        <Col>
          <h2>Colecciones</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={3}>
          <h4>¿Que est&aacute;s buscando?</h4>
          <InputGroup>
            <Input
              placeholder="Nombre de la coleccion"
              onChange={(e) => {
                e.persist();
                setParams((d) => ({ ...d, name: e.target.value }));
              }}
            />
            <InputGroupAddon addonType="append">
              <Button onClick={onSearch}>Buscar</Button>
            </InputGroupAddon>
          </InputGroup>
          <div className="white-box collections-help">
            <p>
              Las colecciones son albumes seleccionados por nuestro equipo de
              curadores de la Biblioteca Central.
            </p>
            <p>También contamos con colecciones propias de la biblioteca</p>
          </div>
        </Col>
        <Col sm={9}>
          <Container className="collection-container">
            {rows.length === 0 ? (
              <Row>
                <Col>Sin colecciones</Col>
              </Row>
            ) : (
              rows.map((r, k) => (
                <Row key={k} style={k === 0 ? {} : { marginTop: "1em" }}>
                  <Col>
                    <CardDeck>
                      {r.map((c) => (
                        <Card
                          key={c.name}
                          onClick={() => {
                            setRedirect(c.id);
                          }}
                          className="white-box"
                        >
                          <CardTitle>{c.name}</CardTitle>
                          <CardBody
                            style={{ backgroundImage: `url("${c.thumbnail}")` }}
                          >
                            <CardText>{c.description}</CardText>
                            <CardText className="card-date">
                              Actualizado el {formatDate(c.updated_at)}
                            </CardText>
                          </CardBody>
                        </Card>
                      ))}
                    </CardDeck>
                  </Col>
                </Row>
              ))
            )}
            <Row style={{ margin: "1em 0" }}>
              <Col>
                {albums.count !== 0 ? (
                  <Pagination
                    count={albums.count}
                    page_size={page.page_size}
                    page={page.page}
                    setStatePage={setDaPage}
                    size="lg"
                  />
                ) : null}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

AllCollections.propTypes = {
  albums: PropTypes.shape({
    results: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
  setRoute: PropTypes.func.isRequired,
  loadCollections: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  albums: selectAlbums(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      setRoute: site_misc.setCurrentRoute,
      loadCollections: gallery.album.getAlbums,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(AllCollections);
