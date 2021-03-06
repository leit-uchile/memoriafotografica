import React, { Component } from "react";
import UploadDetails from "./UploadDetails";
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
} from "reactstrap";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faCloudUploadAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../../css/search.css";
import { connect } from "react-redux";
import { site_misc } from "../../actions";
import { selectSiteMiscUploadDisclosureSet } from "../../reducers";

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
      const uuidv4 = require("uuid/v4");
      return {
        id: uuidv4(),
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
    for (var i = 0; i < this.state.photos.length; i++) {
      var el;
      if (i === key) {
        el = {
          id: this.state.photos[key].id,
          photo: this.state.photos[key].photo,
          meta: { ...info },
        };
        newphotos = newphotos.concat(el);
      } else {
        newphotos = newphotos.concat(this.state.photos[i]);
      }
    }
    this.setState({ photos: newphotos, length: newphotos.length });
  }

  handleErase(key) {
    var newphotos = [];
    for (var i = 0; i < this.state.photos.length; i++) {
      if (i !== key) {
        newphotos = newphotos.concat(this.state.photos[i]);
      }
    }
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

    var details = this.state.photos.map((el, key) => (
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

    return (
      <Container>
        <DisclosureModal
          onClick={this.props.readDisclosure}
          isnotSet={!this.props.disclosed}
        />
        <Row>
          <Col>
            <h2 className="upload-title">
              Subir Fotograf&iacute;a / Agregar fotograf&iacute;as
            </h2>
          </Col>
        </Row>
        <Row style={{ marginTop: "2em" }}>
          <Col md={8}>
            <Dropzone onDrop={this.handleOnDrop}>
              {({ getRootProps, getInputProps }) => (
                <div style={styles.dropzone} {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Arrastra y suelta una imagen o haz click aqui</p>
                  <FontAwesomeIcon icon={faCloudUploadAlt} size="3x" />
                </div> // <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
              )}
            </Dropzone>
            {details}
          </Col>
          <Col md={4} className="white-box upload-rules">
            <h4 style={{ fontWeight: "600" }}>Metadatos</h4>
            <ul>
              <li>
                Cada foto <b>requiere</b> una descripci&oacute;n o breve
                historia asociada.
              </li>
            </ul>
            <h4 style={{ fontWeight: "600" }}>
              Informaci&oacute;n por fotograf&iacute;a
            </h4>
            <ul>
              <li>
                Se puede asignar informaci&oacute;n separada como t&iacute;tulo,
                licencias, etiquetas.
              </li>
              <li>
                En caso de no asignar nada se considera la informaci&oacute;n
                general ya ingresada.
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <ButtonGroup style={{ marginTop: "20px", width: "20em" }}>
              <Button onClick={this.props.previousStep}>
                <FontAwesomeIcon icon={faChevronCircleLeft} /> Volver
              </Button>
              {this.state.photos.length !== 0 ? (
                <Button color="success" onClick={this.onSubmit}>
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

const styles = {
  dropzone: {
    backgroundColor: "#f7f7f7",
    textAlign: "center",
    padding: "15px",
    width: "100%",
    height: "auto",
    border: "1px dashed rgb(156,158,159)",
    boxShadow: "#ddd 3px 5px 10px",
  },
};

const mapStateToProps = (state) => ({
  disclosed: selectSiteMiscUploadDisclosureSet(state),
});

const mapActionsToProps = (dispatch) => ({
  readDisclosure: () => dispatch(site_misc.readDisclosure()),
  sendAlert: (message, color) => dispatch(site_misc.setAlert(message, color)),
});

export default connect(mapStateToProps, mapActionsToProps)(UploadPhoto);
