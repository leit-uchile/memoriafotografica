import React, { useState, useEffect, Fragment } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { home, landing, misc } from "../actions";
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "reactstrap";
import Slider from "react-slick";
import "../css/landing.css";
import Gallery from "react-photo-gallery";

const LandingPage = props => {
  const { setRoute, loadPhotos, loadCaroussel, loadNews } = props;

  useEffect(() => {
    setRoute("/Inicio");
    loadPhotos();
    loadCaroussel();
    loadNews();
  }, [loadPhotos, setRoute, loadCaroussel, loadNews]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "inner",
    autoplay: true,
    pauseOnFocus: true,
    arrows: false
  };

  var mapped = props.photos.slice(0, 10).map(el => ({
    src: el.thumbnail,
    height: el.aspect_h,
    width: el.aspect_w,
    id: el.id
  }));

  var onClickPhoto = o => {
    setRedirect(`/photo/${mapped[o.index].id}`);
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
              <Col md={{ size: "6", offset: "3" }}>
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
          backgroundColor: "#e9ecef",
          paddingTop: "2em",
          paddingBottom: "2em"
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
      <div style={{ marginBottom: "2em" }}>
        <Slider {...settings}>
          {props.caroussel.map((it, key) => {
            return (
              <div key={key}>
                <div
                  className="LandingPhoto parallax"
                  style={{
                    backgroundImage: `url(${it.image})`,
                    backgroundPositionY: "top",
                    backgroundAttachment: "local",
                    height: "80vh"
                  }}
                >
                  <Container>
                    <Row>
                      <Col>
                        <h3>{it.title}</h3>
                        <p>{it.content}</p>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
      <Container className="landing-container">
        <Row>
          <Col>
            <h2 className="colTitle">Fotograf&iacute;as destacadas</h2>
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
              <h2 className="colTitle">¿Quieres participar?</h2>
            </Col>
            <Col sm={{ size: "4" }}>
              <p className="detailText">
                Estamos en b&uacute;squeda de contenido hist&oacute;rico tales
                como fotograf&iacute;as de eventos, lugares, personajes,
                actividades, entre otros. Si tienes material puedes subirlo{" "}
                <Link to="/upload" className="btn btn-primary btn-lg">aqu&iacute;</Link>.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  photos: state.home.photos,
  caroussel: state.landing.caroussel,
  news: state.landing.news
});

const mapActionsToProps = dispatch => ({
  loadPhotos: () => dispatch(home.home()),
  setRoute: route => dispatch(misc.setCurrentRoute(route)),
  loadCaroussel: () => dispatch(landing.getCaroussel()),
  loadNews: () => dispatch(landing.getNews())
});

export default connect(mapStateToProps, mapActionsToProps)(LandingPage);
