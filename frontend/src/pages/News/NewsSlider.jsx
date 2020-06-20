import React, { useEffect } from "react";
import { connect } from "react-redux";
import { webadmin } from "../../actions";
import { Container, Row, Col } from "reactstrap";
import Slider from "react-slick";
import "../Landing/landing.css";

const NewsSlider = (props) => {
  const { loadCaroussel, loadNews } = props;
  useEffect(() => {
    loadCaroussel();
    loadNews();
  }, [loadCaroussel, loadNews]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "inner",
    autoplay: true,
    pauseOnFocus: true,
    arrows: false,
  };

  return (
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
                  height: "80vh",
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
  );
};

const mapStateToProps = (state) => ({
  caroussel: state.webadmin.caroussel,
  news: state.webadmin.news.results,
});

const mapActionsToProps = (dispatch) => ({
  loadCaroussel: () => dispatch(webadmin.getCaroussel()),
  loadNews: () => dispatch(webadmin.getNews()),
});

export default connect(mapStateToProps, mapActionsToProps)(NewsSlider);
