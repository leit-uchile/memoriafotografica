import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { misc } from "../actions";
import { connect } from "react-redux";
import { home } from "../actions";
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "reactstrap";
import Slider from "react-slick";
import "../css/landing.css";
import Gallery from "react-photo-gallery";

const items = [
  {
    head: "Proyecto Memoria fotografica",
    src:
      "http://postulante.fcfm.uchile.cl/wordpress/wp-content/uploads/2015/12/31.jpg",
    altText: "Slide 1",
    caption:
      "Les susanda ecusdae odit inctia dolore, ea conseque expliti ossuntorem rae peris et volland erferei untur, tem am num quos secatio. Um hit et is si offictemqui rem numqui non prae sim que antemporia pra velent."
  },
  {
    head: "InJeniería desde 1800...",
    src: "http://fundacionmellado.cl/wp-content/uploads/2014/09/DSC_0001.jpg",
    altText: "Slide 2",
    caption:
      "Apis ad quatum et, odis doluptature, ut aliquamustia dolupta comnis et remquo opta andam fugitati ab ipsanient Les susanda ecusdae odit inctia dolore, ea conseque expliti ossuntorem rae peris et volland erferei untur, tem am num quos secatio. Um hit et is si offictemqui rem numqui non prae sim que antemporia pra velent."
  },
  {
    head: "Innovación",
    src:
      "http://postulante.fcfm.uchile.cl/wordpress/wp-content/uploads/2015/12/IMG_3190.jpg",
    altText: "Slide 3",
    caption:
      "Apis ad quatum et, odis doluptature, ut aliquamustia dolupta comnis et remquo opta andam fugitati ab ipsanient."
  }
];

const LandingPage = props => {
  useEffect(() => {
    props.setRoute("/Inicio");
    props.onLoad();
  }, [props.onLoad]);

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

  var onClickPhoto = (o) => {
    console.log(o, mapped)
    setRedirect(`/photo/${mapped[o.index].id}`);
  }

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
            {items.map(it => (
              <div>
                <Container fluid>
                  <Row>
                    <Col
                      className="LandingPhoto"
                      style={{
                        background: `url(${it.src}), #e9ecef`,
                        backgroundRepeat: " no-repeat ",
                        backgroundSize: "cover",
                        backgroundPositionX: "center",
                        backgroundPositionY: "center",
                        backgroundBlendMode: "multiply",
                        height: "60vh"
                      }}>
                      {/* <img
                        src={it.src}
                        width="100%"
                        altText={it.altText}
                        style={{ maxHeight: "60vh", minHeight: "250px" }}
                      /> */}
                      <h3>{it.head}</h3>
                      <p>{it.caption}</p>
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
          <img src="/assets/photoSave.svg" width="100px" height="100px" />
        </Col>
        <Col sm={4}>
          <h3>Preservar</h3>
          <img src="/assets/server.svg" width="100px" height="100px" />
        </Col>
        <Col sm={4}>
          <h3>Compartir</h3>
          <img src="/assets/speech-bubble.svg" width="100px" height="100px" />
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
            targetRowHeight={200}
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

const mapStateToProps = state => {
  return {
    photos: state.home.photos
  };
};

const mapActionsToProps = dispatch => {
  return {
    onLoad: () => {
      return dispatch(home.home());
    },
    setRoute: route => {
      return dispatch(misc.setCurrentRoute(route));
    }
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LandingPage);
