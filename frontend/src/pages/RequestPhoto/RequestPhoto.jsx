import React, { Component } from "react";
import { Link } from "react-router-dom";
import { webadmin, site_misc } from "../../actions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faBook,
  faAddressCard,
  faTimes,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import { getPermissionLogo } from "../../utils";
import "./requestPhoto.css";

var Requested = ({ list, removeRequestPhoto }) => (
  <ListGroup>
    {list.length === 0 ? (
      <ListGroupItem disabled>No hay fotos solicitadas</ListGroupItem>
    ) : (
      list.map((el, i) => (
        <ListGroupItem key={i}>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <img
                src={el.thumbnail}
                alt={el.title}
                height={el.aspect_h * 50}
                width={el.aspect_w * 50}
                style={
                  el.aspect_w > el.aspect_h
                    ? { maxHeight: "128px", maxWidth: "225px" }
                    : { maxHeight: "128px", maxWidth: "100px" }
                }
              />
              {getPermissionLogo(el, 90, 32)}
            </Col>
            <Col>
              <Row>
                <Col md={10}>
                  <ListGroupItemHeading tag={Link} to={"/photo/" + el.id}>
                    {el.title}
                  </ListGroupItemHeading>
                </Col>
                <Col md={2}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    style={{ marginRight: "1em", cursor: "pointer" }}
                    onClick={() => removeRequestPhoto(el)}
                  />
                </Col>
              </Row>
              <ListGroupItemText className="form-subtitle">
                ID:{el.id}
              </ListGroupItemText>
              <ListGroupItemText
                className="form-subtitle"
                style={{ textAlign: "justify", textJustify: "inter-word" }}
              >
                Descripción: {el.description}
              </ListGroupItemText>
            </Col>
          </Row>
        </ListGroupItem>
      ))
    )}
  </ListGroup>
);

class RequestPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        reason: "",
        first_name: "",
        last_name: "",
        identity_document: "",
        profession: "",
        address: "",
        district: "",
        phone_number: "",
        email: "",
        institution: "",
      },
    };
    this.updateData = this.updateData.bind(this);
    this.props.setRoute("/request-photo/");
  }

  updateData = (e) =>
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: e.target.value },
    });

  onSubmit = (e) => {
    e.preventDefault();
    const photosId = this.props.requestedPhotos.map((el) => el.id);
    console.log(photosId);
    this.props.sendRequest(photosId, this.state.formData);
  };

  render() {
    const { requestedPhotos, removeRequestPhoto, requested } = this.props;
    return (
      <Container>
        <Helmet>
          <title>Pedir fotografías</title>
        </Helmet>
        <Row>
          <Col>
            <h2 className="page-title">
              Formulario para solicitud de material audiovisual
            </h2>
          </Col>
        </Row>
        <Row>
          <Col sm={8} className="white-box form-container">
            {!requested ? (
              <Form>
                <FormGroup>
                  <div className="form-title">
                    <FontAwesomeIcon icon={faImages} />
                    <Label> Material solicitado</Label>
                  </div>
                  <Requested
                    list={requestedPhotos}
                    removeRequestPhoto={removeRequestPhoto}
                  />
                </FormGroup>
                <FormGroup>
                  <div className="form-title">
                    <FontAwesomeIcon icon={faBook} />
                    <Label> Finalidad de la reproducción</Label>
                  </div>
                  <Input
                    type="textarea"
                    name="reason"
                    tabIndex="1"
                    onChange={this.updateData}
                    placeholder="Especificación"
                    required
                    disabled={requested}
                  />
                </FormGroup>

                <div className="form-title">
                  <FontAwesomeIcon icon={faAddressCard} />
                  <Label> Identificación del solicitante</Label>
                </div>
                <FormGroup row>
                  <Col>
                    <Input
                      type="text"
                      name="first_name"
                      tabIndex="2"
                      onChange={this.updateData}
                      placeholder="Nombre"
                      required
                      disabled={requested}
                    />
                    <Input
                      type="text"
                      name="identity_document"
                      tabIndex="4"
                      onChange={this.updateData}
                      placeholder="CI"
                      required
                      disabled={requested}
                    />
                    <Input
                      type="text"
                      name="address"
                      tabIndex="6"
                      onChange={this.updateData}
                      placeholder="Dirección"
                      required
                      disabled={requested}
                    />
                    <Input
                      type="text"
                      name="phone_number"
                      tabIndex="8"
                      onChange={this.updateData}
                      placeholder="Teléfono"
                      required
                      disabled={requested}
                    />
                    <Input
                      type="text"
                      name="institution"
                      tabIndex="10"
                      onChange={this.updateData}
                      placeholder="Institución"
                      required
                      disabled={requested}
                    />
                  </Col>
                  <Col>
                    <Input
                      type="text"
                      name="last_name"
                      tabIndex="3"
                      onChange={this.updateData}
                      placeholder="Apellidos"
                      required
                      disabled={requested}
                    />
                    <Input
                      type="text"
                      name="profession"
                      tabIndex="5"
                      onChange={this.updateData}
                      placeholder="Actividad/Profesión"
                      required
                      disabled={requested}
                    />
                    <Input
                      type="text"
                      name="district"
                      tabIndex="7"
                      onChange={this.updateData}
                      placeholder="Comuna"
                      required
                      disabled={requested}
                    />
                    <Input
                      type="email"
                      name="email"
                      tabIndex="9"
                      onChange={this.updateData}
                      placeholder="Email"
                      required
                      disabled={requested}
                    />
                  </Col>
                </FormGroup>
                <hr />
                <Button color="primary" tabIndex="11" onClick={this.onSubmit}>
                  Solicitar
                </Button>
              </Form>
            ) : (
              <div style={{ paddingTop: "4vh" }}>
                <FontAwesomeIcon
                  icon={faCheckSquare}
                  className="request-photo-success"
                />
                <h4 style={{ textAlign: "center" }}>
                  {" "}
                  Material solicitado con éxito. Nos contactaremos con usted a
                  la brevedad
                </h4>
              </div>
            )}
          </Col>
          <Col sm={4}>
            <p style={{ textAlign: "justify", textJustify: "inter-word" }}>
              La Biblioteca Central de la FCFM, respondiendo a su misión de
              centralizar, sistematizar y poner a disposición información de
              interés para la comunidad, ofrece al público una recopilación de
              fotografías que evocan la historia de la Escuela de InJeniería de
              la Universidad de Chile, de quienes han pasado por ella y de los
              hitos que han marcado su trayectoria desde sus comienzos hasta la
              actualidad. <br />
              <br />
              El acceso a la información de este sitio web es gratuito y no
              requiere registro previo. Sin perjuicio de ello, es necesario
              registrarse tanto para solicitar información o el uso de las
              imágenes del sitio, como para aportarla. <br />
              <br />
              Esta plataforma tiene por finalidad la consolidación de un espacio
              participativo destinado a preservar la memoria de esta Facultad,
              por lo que cualquier persona puede contribuir mediante la
              aportación de material fotográfico o de los antecedentes que
              conozca respecto de cualquiera de las imágenes expuestas. Para
              facilitar este proceso, el usuario puede crear una cuenta desde la
              cual interactuar con el sitio. <br />
              <br />
              Los contenidos de este portal están protegidos por la{" "}
              <b>Ley 17.336 sobre Propiedad Intelectual</b>, por lo que la
              Universidad sólo puede conceder licencias de uso respecto de las
              imágenes sobre las que tiene titularidad. Cuando sean solicitadas
              licencias sobre materiales ajenos a la misma, se remitirá al
              usuario la información de su respectivo titular para que este
              pueda dirigirse ante quien corresponda.
              <br />
              <br />
              La Biblioteca se reserva el derecho de administrar, crear y
              modificar los contenidos, las prestaciones y servicios que ofrece
              esta plataforma, siendo todos ellos susceptibles de cambio sin que
              exista obligación para la Biblioteca de comunicarlo a sus
              usuarios.
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  requestedPhotos: state.webadmin.requestedPhotos,
  requested: state.webadmin.requested,
});

const mapActionsToProps = (dispatch) => ({
  setRoute: (route) => dispatch(site_misc.setCurrentRoute(route)),
  removeRequestPhoto: (value) => dispatch(webadmin.removeRequestPhoto(value)),
  sendRequest: (photos, info) => dispatch(webadmin.sendRequest(photos, info)),
});

export default connect(mapStateToProps, mapActionsToProps)(RequestPhoto);
