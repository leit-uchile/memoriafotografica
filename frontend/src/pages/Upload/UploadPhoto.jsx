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
  ModalFooter
} from "reactstrap";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faCloudUploadAlt
} from "@fortawesome/free-solid-svg-icons";
import "../../css/search.css";
import { connect } from "react-redux";
import { upload, alert } from "../../actions";

const imageMaxSize = 5000000; // KB

const DisclosureModal = ({ onClick, isnotSet }) => (
  <Modal isOpen={isnotSet}>
    <ModalHeader>Terminos de uso y licencias</ModalHeader>
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

class UploadPhoto extends Component {
  constructor(Props) {
    super(Props);
    this.state = {
      photosList: [],
      length: 0
    };
    this.handleErase = this.handleErase.bind(this);
  }

  handleOnDrop = files => {
    var images = [];
    if (files && files.length > 0) {
      for (var i = 0, f; (f = files[i]); i++) {
        if (!f.type.match("image.*") || f.size > imageMaxSize) {
          this.props.sendAlert("Error: Extension no valida o archivo muy pesado", "warning");
        } else {
          images.push(f);
        }
      }
      this.handleUpload(images);
    }
  };

  handleUpload(file) {
    var f = file.map(el => {
      const uuidv4 = require("uuid/v4");
      return {
        id: uuidv4(),
        photo: el,
        meta: {
          description: "",
          tags: [],
          cc: null,
          previewCalled: false,
          collapse: false
        }
      };
    });
    this.setState({
      photosList: [...this.state.photosList, ...f],
      length: this.state.photosList.length + 1
    });
  }

  saveMeta(info, key) {
    var newPhotosList = [];
    for (var i = 0; i < this.state.photosList.length; i++) {
      var el;
      if (i === key) {
        el = {
          id: this.state.photosList[key].id,
          photo: this.state.photosList[key].photo,
          meta: info
        };
        newPhotosList = newPhotosList.concat(el);
      } else {
        newPhotosList = newPhotosList.concat(this.state.photosList[i]);
      }
    }
    this.setState({ photosList: newPhotosList, length: newPhotosList.length });
  }

  handleErase(key) {
    var newPhotosList = [];
    for (var i = 0; i < this.state.photosList.length; i++) {
      if (i !== key) {
        newPhotosList = newPhotosList.concat(this.state.photosList[i]);
      }
    }
    this.setState({ photosList: newPhotosList, length: newPhotosList.length });
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.state.photosList.length === 0) {
      this.props.sendAlert("Debe enviar al menos una foto", "warning");
    } else if (this.state.photosList.some(el => el.meta.description === "")) {
      this.props.sendAlert(
        "Debe rellenar la descripción de todas las fotos",
        "warning"
      );
    } else {
      this.props.saveAll(this.state);
      this.props.nextStep();
    }
  };

  render() {
    const { meta } = this.props;
    var suggestions = meta
      ? meta.map(el => {
          return { id: el.id, name: el.value };
        })
      : [];

    var details = this.state.photosList.map((el, key) => (
      <UploadDetails
        key={el.id}
        id={el.id}
        photo={el.photo}
        save={info => this.saveMeta(info, key)}
        delete={() => this.handleErase(key)}
        meta={el.meta}
        suggestions={suggestions}
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
            <h2 className="upload-title">Subir Fotograf&iacute;a / Agregar fotograf&iacute;as</h2>
          </Col>
        </Row>
        <Row style={{ marginTop: "2em" }}>
          <Col>
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
        </Row>
        <Row>
          <Col style={{ textAlign: "center" }}>
            {this.state.photosList.length !== 0 ? (
              <ButtonGroup style={{ marginTop: "20px", width: "20em" }}>
                <Button onClick={this.props.previousStep}>
                  <FontAwesomeIcon icon={faChevronCircleLeft} />
                </Button>
                <Button color="success" onClick={this.onSubmit}>
                  <FontAwesomeIcon icon={faChevronCircleRight} />
                </Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup style={{ marginTop: "20px", width: "10em" }}>
                <Button onClick={this.props.previousStep}>
                  <FontAwesomeIcon icon={faChevronCircleLeft} />
                </Button>
              </ButtonGroup>
            )}
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
    borderRadius: "10px",
    border: "1px dashed rgb(156,158,159)",
    boxShadow: "2px 2px 4px rgb(156,158,159)"
  }
};

const mapStateToProps = state => ({
  disclosed: state.upload.disclosureSet
});

const mapActionsToProps = dispatch => ({
  readDisclosure: () => dispatch(upload.readDisclosure()),
  sendAlert: (message, color) => dispatch(alert.setAlert(message, color))
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(UploadPhoto);
