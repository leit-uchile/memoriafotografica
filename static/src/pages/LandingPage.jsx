import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { misc } from "../actions";
import { connect } from "react-redux";
import { home } from "../actions";
import { Helmet } from "react-helmet";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardDeck,
  CardBody
} from "reactstrap";
import Slider from "react-slick";

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

  const [redirect, setRedirect] = useState(false);

  const photos = props.photos.slice(0, 5).map(el => {
    return (
      <Card>
        <CardImg
          top
          src={el.thumbnail}
          alt="Card image cap"
          onClick={() => setRedirect(`/photo/${el.id}`)}
        />
        <CardBody style={{ backgroundColor: "#ebeeef" }}>
          <CardText>{el.description}</CardText>
        </CardBody>
      </Card>
    );
  });

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
                    <Col md={6}>
                      <h3>{it.head}</h3>
                      <p>{it.caption}</p>
                    </Col>
                    <Col md={6}>
                      <img
                        src={it.src}
                        width="100%"
                        altText={it.altText}
                        style={{ maxHeight: "60vh", minHeight: "250px" }}
                      />
                    </Col>
                  </Row>
                </Container>
              </div>
            ))}
          </Slider>
        </Col>
      </Row>
      <Row style={{ marginTop: "2em" }}>
        <Col>
          <h2>
            Fotograf&iacute;as recientes
          </h2>
        </Col>
      </Row>
      <Row style={{ marginTop: "2em" }}>
        <Col>
          <CardDeck>{photos}</CardDeck>
        </Col>
      </Row>
      <Row style={{ marginTop: "2em", textAlign: "center" }}>
        <Col>
          <h3>¿ Quieres participar ?</h3>
          <p>
            Estamos en b&uacute;squeda de contenido hist&oacute;rico tales como
            fotograf&iacute;as de eventos, lugares, personajes, actividades,
            entre otros. Si tienes material puedes subirlo{" "}
            <Link to="/upload">aqu&iacute;</Link>.
          </p>
        </Col>
        <Col>
          <Link to="/gallery">Ver galeria</Link>
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
