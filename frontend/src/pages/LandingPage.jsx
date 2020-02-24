import React, { useState, useEffect } from "react";
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
    pauseOnFocus: true
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

  return (
    <Container style={{ marginTop: "2em" }}>
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
      {redirect ? <Redirect to={redirect} /> : null}
      <Row style={{ marginTop: "2em" }}>
        <Col>
          <Slider {...settings}>
            {props.caroussel.map((it, key) => (
              <div key={key}>
                <Container fluid>
                  <Row>
                    <Col
                      className="LandingPhoto"
                      style={{
                        background: `url(${it.image}), #e9ecef`,
                        backgroundRepeat: " no-repeat ",
                        backgroundSize: "cover",
                        backgroundPositionX: "center",
                        backgroundPositionY: "center",
                        backgroundBlendMode: "multiply",
                        height: "60vh"
                      }}
                    >
                      <h3>{it.title}</h3>
                      <p>{it.content}</p>
                    </Col>
                  </Row>
                </Container>
              </div>
            ))}
          </Slider>
        </Col>
      </Row>
      <Row>
        <Col className="colTitle">
          <h2>Nuestra misi&oacute;n</h2>
        </Col>
      </Row>
      <Row style={{ marginTop: "2em" }} className="missionDiv">
        <Col sm={4}>
          <h3>Recuperar</h3>
          <img
            src="/assets/photoSave.svg"
            width="100px"
            height="100px"
            alt=""
          />
        </Col>
        <Col sm={4}>
          <h3>Preservar</h3>
          <img src="/assets/server.svg" width="100px" height="100px" alt="" />
        </Col>
        <Col sm={4}>
          <h3>Compartir</h3>
          <img
            src="/assets/speech-bubble.svg"
            width="100px"
            height="100px"
            alt=""
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="detailText">
            Nuestra misi&oacute;n consiste en recuperar la historia y memoria
            fotogr&aacute;fica de la Facultad de Ciencias f&iacute;sicas y
            matem&aacute;ticas de forma transparente y colaborativa.
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="colTitle">
          <h2>Fotograf&iacute;as recientes</h2>
        </Col>
      </Row>
      <Row style={{ marginTop: "2em" }}>
        <Col>
          <Gallery
            photos={mapped}
            targetRowHeight={100}
            onClick={(e, index) => onClickPhoto(index)}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <div style={{ textAlign: "right", padding: "1em" }}>
            <Link to="/gallery" style={{ fontSize: "1.5em" }}>
              Ver galeria
            </Link>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "2em" }}>
        <Col className="colTitle">
          <h2>¿Quieres participar?</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="detailText">
            Estamos en b&uacute;squeda de contenido hist&oacute;rico tales como
            fotograf&iacute;as de eventos, lugares, personajes, actividades,
            entre otros. Si tienes material puedes subirlo{" "}
            <Link to="/upload">aqu&iacute;</Link>.
          </p>
        </Col>
      </Row>
    </Container>
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
