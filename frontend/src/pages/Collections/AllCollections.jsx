import React, { useState, useEffect } from "react";
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
import { gallery } from "../../actions";
import uuid4 from "uuid";
import "./collection.css";
import { Redirect } from "react-router";

const AllCollections = ({ albums, loadCollections }) => {
  const [params, setParams] = useState({
    name: "",
    redirectUrl: false,
  });

  const [rows, setRows] = useState([]);

  const [page, setPage] = useState({
    page: 0,
    page_size: 9,
  });

  const setDaPage = (p) => setPage((d) => ({ ...d, page: p }));

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  // Set user info and load the albums accordingly
  useEffect(() => {
    let par = "&collections=1";
    par = params.name !== "" ? par + "&name=" + params.name : par;
    loadCollections(page.page, page.page_size, par);
    // eslint-disable-next-line
  }, [loadCollections, page]);

  useEffect(() => {
    let list = [];
    const albumslist = albums.results;
    for (let index = 0; index < albumslist.length; index = index + 3) {
      let cols = [];
      if (albumslist[index]) cols.push(albumslist[index]);
      if (albumslist[index + 1]) cols.push(albumslist[index + 1]);
      if (albumslist[index + 2]) cols.push(albumslist[index + 2]);
      cols.theKey = uuid4();
      list.push(cols);
    }
    setRows(list);
  }, [albums.results]);

  const formatDate = (d) => {
    var date = new Date(d);
    return date.toLocaleString();
  };

  const setRedirect = (id) => {
    setParams({
      ...params,
      redirectUrl: `/user/public/collections/${id}`,
    });
  };

  const onSearch = () => {
    setDaPage(0);
  };

  if (params.redirectUrl) {
    return <Redirect push to={params.redirectUrl} />;
  }

  return (
    <Container fluid style={{ marginBottom: "1em" }}>
      <Helmet>
        <title>Colecciones</title>
      </Helmet>
      <Row className="album-title-row">
        <Col>
          <h2>Colecciones</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={3}>
          <h4>¿Que est&aacute;s buscando?</h4>
          <InputGroup>
            <Input
              placeholder="Nombre de la collecion"
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
              curadores de la biblioteca central.
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
                <Row key={r.key} style={k === 0 ? {} : { marginTop: "1em" }}>
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

const mapStateToProps = (state) => ({
  albums: state.albumcollection.albums,
});

const mapActionsToProps = (dispatch) => ({
  loadCollections: (page, size, params = "") =>
    dispatch(gallery.album.getAlbums(page, size, params)),
});

export default connect(mapStateToProps, mapActionsToProps)(AllCollections);
