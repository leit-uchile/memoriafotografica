import React, { Component } from "react";
import UploadDetails from "./UploadDetailsv2";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardDeck,
  Card,
  CardColumns,
  CardBody,
} from "reactstrap";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faCloudUploadAlt,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { site_misc } from "../../actions";
import uuid from "uuid";
import "./styles.css";
import "./uploadPhoto.css";

const imageMaxSize = 8000000; // Bytes ~ 8MB

const DisclosureModal = ({ onClick, isnotSet }) => (
  <Modal isOpen={isnotSet}>
    <ModalHeader>Términos de uso y licencias</ModalHeader>
    <ModalBody>
      La plataforma de <b>Memoria Fotogr&aacute;fica</b>
      permite a sus usuarios escoger como se usar&aacute;n y compartir&aacute;n
      sus fotograf&iacute;as. Los usuarios pueden elegir entre las licencias de{" "}
      <a href="https://creativecommons.org/licenses/?lang=es">
        Creative Commons
      </a>
    </ModalBody>
    <ModalFooter>
      <Button onClick={onClick}>Acepto las condiciones de subida</Button>
    </ModalFooter>
  </Modal>
);

/**
 * UploadPhoto
 *
 * Manage Local Photo Upload and delegate specific info to UploadDetails
 */
class UploadPhoto extends Component {
  constructor(Props) {
    super(Props);
    this.state = {
      photos: [],
      length: 0,
    };
    this.handleErase = this.handleErase.bind(this);
  }

  handleOnDrop = (files) => {
    var images = [];
    if (files && files.length > 0) {
      for (var i = 0, f; (f = files[i]); i++) {
        if (!f.type.match("image.*") || f.size > imageMaxSize) {
          this.props.sendAlert(
            "Error: Extension no valida o archivo muy pesado",
            "warning"
          );
        } else {
          images.push(f);
        }
      }
      this.handleUpload(images);
    }
  };

  handleUpload(file) {
    var f = file.map((el) => {
      return {
        id: uuid.v4(),
        photo: el,
        meta: {
          description: "",
          tags: [],
          cc: null,
          previewCalled: false,
          collapse: false,
        },
      };
    });
    this.setState({
      photos: [...this.state.photos, ...f],
      length: this.state.photos.length + 1,
    });
  }

  saveMeta(info, key) {
    var newphotos = [];
    // Update info at key
    this.state.photos.forEach((element, i) => {
      if (i === key) {
        var el;
        el = {
          id: element.id,
          photo: element.photo,
          meta: { ...info },
        };
        newphotos = newphotos.concat(el);
      } else {
        newphotos = newphotos.concat(element);
      }
    });
    this.setState({ photos: newphotos, length: newphotos.length });
  }

  handleErase(key) {
    var newphotos = this.state.photos.filter((el, i) => i !== key);
    this.setState({ photos: newphotos, length: newphotos.length });
  }

  handleInputChange = (query) => {
    if (query.length >= 2) {
      this.props.searchMeta(query, 1, 10);
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.photos.length === 0) {
      this.props.sendAlert("Debe enviar al menos una foto", "warning");
    } else if (this.state.photos.some((el) => el.meta.description === "")) {
      this.props.sendAlert(
        "Debe rellenar la descripción de todas las fotos",
        "warning"
      );
    } else {
      // Create additional meta from photos
      // Using a dictionnary
      let additional_metadata = {};
      this.state.photos.forEach((current_photo) => {
        current_photo.meta.tags.forEach((tag) => {
          additional_metadata[tag.name] = { ...tag };
        });
      });

      // Call for Upload photos
      this.props.saveAll(this.state, Object.values(additional_metadata));
      // Go forward for progress display
      this.props.nextStep();
    }
  };

  render() {
    const { meta } = this.props;
    const suggestions = meta
      ? meta.map((el) => ({ id: el.id, name: el.value }))
      : [];

    var first = this.state.photos
      .slice(0, 2)
      .map((el, key) => (
        <UploadDetails
          key={el.id}
          id={el.id}
          photo={el.photo}
          save={(info) => this.saveMeta(info, key)}
          delete={() => this.handleErase(key)}
          meta={el.meta}
          suggestions={suggestions}
          search={this.handleInputChange}
        />
      ));
    var rows = [];
    for (var i = 2; i < this.state.photos.length; i = i + 3) {
      var row = [];
      for (let j = 0; j < 3 && i + j < this.state.photos.length; j++) {
        const el = this.state.photos[j + i];
        const key = i + j;
        row.push(
          <UploadDetails
            key={el.id}
            id={el.id}
            photo={el.photo}
            save={(info) => this.saveMeta(info, key)}
            delete={() => this.handleErase(key)}
            meta={el.meta}
            suggestions={suggestions}
            search={this.handleInputChange}
          />
        );
      }
      if (this.props.doColumns) {
        rows.push(row);
      } else {
        rows.push(
          <Row style={{ marginTop: "1em" }}>
            <Col>
              <CardDeck>{row}</CardDeck>
            </Col>
          </Row>
        );
      }
    }

    return (
      <Container fluid>
        <DisclosureModal
          onClick={this.props.readDisclosure}
          isnotSet={!this.props.disclosed}
        />
        <Row>
          <Col>
            <h2 className="page-title">
              Subir Fotograf&iacute;a / Agregar fotograf&iacute;as
            </h2>
          </Col>
        </Row>
        <Row>
          <Col sm={9}>
            <Container fluid>
              <Row>
                <Col>
                  {this.props.doColumns ? (
                    <CardColumns>
                      <Card className="upload-photo-dropzone">
                        <CardBody>
                          <Dropzone onDrop={this.handleOnDrop}>
                            {({ getRootProps, getInputProps }) => (
                              <div
                                {...getRootProps()}
                              >
                                <input {...getInputProps()} />
                                <p>
                                  Arrastra y suelta una imagen o haz click aqui
                                </p>
                                <FontAwesomeIcon
                                  icon={faCloudUploadAlt}
                                  size="3x"
                                />
                              </div>
                            )}
                          </Dropzone>
                        </CardBody>
                      </Card>
                      {first}
                      {rows}
                    </CardColumns>
                  ) : (
                    <CardDeck>
                      <Card className="upload-photo-dropzone">
                        <CardBody>
                          <Dropzone onDrop={this.handleOnDrop}>
                            {({ getRootProps, getInputProps }) => (
                              <div
                                {...getRootProps()}
                              >
                                <input {...getInputProps()} />
                                <p>
                                  Arrastra y suelta una imagen o haz click aqui
                                </p>
                                <FontAwesomeIcon
                                  icon={faCloudUploadAlt}
                                  size="3x"
                                />
                              </div>
                            )}
                          </Dropzone>
                        </CardBody>
                      </Card>
                      {first}
                    </CardDeck>
                  )}
                </Col>
              </Row>
              {this.props.doColumns ? null : rows}
            </Container>
          </Col>
          <Col sm={3}>
            <div className="white-box upload-rules">
              <h4>Metadatos</h4>
              <ul>
                <li>
                  Cada foto <b>requiere</b> una descripci&oacute;n o breve
                  historia asociada.
                </li>
              </ul>
              <h4>
                Informaci&oacute;n por fotograf&iacute;a
              </h4>
              <ul>
                <li>
                  Se puede asignar informaci&oacute;n separada como
                  t&iacute;tulo, licencias, etiquetas.
                </li>
                <li>
                  En caso de no asignar nada se considera la informaci&oacute;n
                  general ya ingresada.
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: "2em" }}>
          <Col md={8}></Col>
          <Col md={4}></Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <ButtonGroup style={{ marginTop: "20px", width: "20em" }}>
              <Button onClick={this.props.previousStep}>
                <FontAwesomeIcon icon={faChevronCircleLeft} /> Volver
              </Button>
              {this.state.photos.length !== 0 ? (
                <Button color="primary" onClick={this.onSubmit}>
                  Finalizar <FontAwesomeIcon icon={faChevronCircleRight} />
                </Button>
              ) : null}
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  disclosed: state.site_misc.uploadDisclosureSet,
});

const mapActionsToProps = (dispatch) => ({
  readDisclosure: () => dispatch(site_misc.readDisclosure()),
  sendAlert: (message, color) => dispatch(site_misc.setAlert(message, color)),
});

export default connect(mapStateToProps, mapActionsToProps)(UploadPhoto);
