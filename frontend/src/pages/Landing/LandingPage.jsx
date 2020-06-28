import React, { useState, useEffect, Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { gallery, site_misc } from "../../actions";
import { Helmet } from "react-helmet";
import {
  Container,
  Row,
  Col,
  CardDeck,
  Card,
  CardTitle,
  CardBody,
} from "reactstrap";
import NewsSlider from "../News/NewsSlider";
import "./landing.css";
import Gallery from "react-photo-gallery";

const LandingPage = (props) => {
  const { setRoute, loadPhotos, loadCollections } = props;

  useEffect(() => {
    setRoute("/Inicio");
    loadPhotos();
    loadCollections();
  }, [loadPhotos, loadCollections, setRoute]);

  var mapped = props.photos.map((el) => ({
    src: el.thumbnail,
    height: el.aspect_h,
    width: el.aspect_w,
    id: el.id,
  }));

  var onClickPhoto = (o) => {
    setRedirect(`/photo/${mapped[o.index].id}/?sort=created_at-desc`);
  };

  const [redirect, setRedirect] = useState(false);

  if (redirect) return <Redirect to={redirect} />;

  return (
    <Fragment>
      <Helmet>
        <meta property="og:title" content="Memoria fotográfica FCFM" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content=" http://memoriafotografica.ing.fcfm.cl/"
        />
        <meta property="og:image" content=" http://example.com/image.jpg" />
        <meta property="og:description" content="Descripcion" />
        <title>Memoria fotogr&aacute;fica FCFM</title>
      </Helmet>
      <div className="landing-background-1 parallax">
        <div className="landing-presentation">
          <Container>
            <Row>
              <Col md={{ size: "6", offset: "3" }} data-aos="fade-up">
                <span className="landing-presentation-text">
                  Rescatando nuestra <b>Historia</b>
                </span>
                <span className="landing-presentation-text">
                  junto a sus <b>Protagonistas</b>
                </span>
                <span className="landing-presentation-text">
                  Recuperando la <b>Memoria Fotogr&aacute;fica</b>
                </span>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Container className="landing-container">
        <Row className="missionDiv">
          <Col sm={3}>
            <h2 className="colTitle">Nuestra misi&oacute;n</h2>
            <p className="detailText">
              Nuestra misi&oacute;n consiste en recuperar la historia y memoria
              fotogr&aacute;fica de la Facultad de Ciencias f&iacute;sicas y
              matem&aacute;ticas de forma transparente y colaborativa.
            </p>
          </Col>
          <Col xs={4} sm={3}>
            <img
              src="/assets/photoSave.svg"
              width="100px"
              height="100px"
              alt=""
            />
            <h3>Recuperar</h3>
          </Col>
          <Col xs={4} sm={3}>
            <img src="/assets/server.svg" width="100px" height="100px" alt="" />
            <h3>Preservar</h3>
          </Col>
          <Col xs={4} sm={3}>
            <img
              src="/assets/speech-bubble.svg"
              width="100px"
              height="100px"
              alt=""
            />
            <h3>Compartir</h3>
          </Col>
        </Row>
      </Container>
      <div
        style={{
          backgroundColor: "var(--leit-bg-gray)",
          paddingTop: "2em",
          paddingBottom: "2em",
        }}
      >
        <Container>
          <Row>
            <Col>
              <h2 className="colTitle">Noticias recientes</h2>
            </Col>
            <Col>
              <div style={{ textAlign: "right", padding: "1em" }}>
                <Link to="/news" style={{ fontSize: "1.5em" }}>
                  Ver todas
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <NewsSlider />
      <Container className="landing-container">
        <Row>
          <Col>
            <h2 className="colTitle">&Uacute;ltimas Fotograf&iacute;as</h2>
          </Col>
          <Col>
            <div style={{ textAlign: "right", padding: "1em" }}>
              <Link to="/gallery" style={{ fontSize: "1.5em" }}>
                Ver galeria
              </Link>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Gallery
              photos={mapped}
              targetRowHeight={150}
              onClick={(e, index) => onClickPhoto(index)}
            />
          </Col>
        </Row>
      </Container>
      <div className="landing-background-2 parallax">
        <Container>
          <Row>
            <Col sm={{ size: "4", offset: "2" }}>
              <h2 className="colTitle" data-aos="fade-up">
                ¿Quieres participar?
              </h2>
            </Col>
            <Col sm={{ size: "4" }}>
              <p className="detailText">
                Estamos en b&uacute;squeda de contenido hist&oacute;rico tales
                como fotograf&iacute;as de eventos, lugares, personajes,
                actividades, entre otros. Si tienes material puedes subirlo{" "}
                <Link to="/upload" className="btn btn-primary btn-lg">
                  aqu&iacute;
                </Link>
                .
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      {props.collections.length !== 0 ? (
        <Container className="landing-container">
          <Row>
            <Col>
              <h2 className="colTitle">Explora Nuestras Colleciones</h2>
            </Col>
            <Col>
              <div style={{ textAlign: "right", padding: "1em" }}>
                <Link to="/collections" style={{ fontSize: "1.5em" }}>
                  Ver colecciones
                </Link>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <p className="detailText">
                Nuestros editores suben colecciones de fotos oficiales con
                contenido hist&oacute;rico particular.
              </p>

              <p className="detailText">
                Tambi&eacute;n recibimos donaciones de contenido y las
                publicamos en nuestras aqu&iacute;.
              </p>
            </Col>
            <Col sm={9}>
              <CardDeck>
                {props.collections.slice(0, 3).map((c) => (
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
                    ></CardBody>
                  </Card>
                ))}
              </CardDeck>
            </Col>
          </Row>
        </Container>
      ) : null}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  photos: state.photos.photos,
  collections: state.albumcollection.albums.results,
});

const mapActionsToProps = (dispatch) => ({
  loadPhotos: () => dispatch(gallery.photos.home(0, 10)),
  loadCollections: () =>
    dispatch(gallery.album.getAlbums(0, 3, "&collections=1")),
  setRoute: (route) => dispatch(site_misc.setCurrentRoute(route)),
});

export default connect(mapStateToProps, mapActionsToProps)(LandingPage);
