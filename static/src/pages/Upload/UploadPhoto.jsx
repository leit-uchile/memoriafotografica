import React, { Component } from "react";
import ReactTags from "react-tag-autocomplete";
import UploadDetails from "./UploadDetails";
import UploadAlbum from "./UploadAlbum";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Label,
  Input,
  Collapse,
  UncontrolledPopover,
  PopoverBody,
  PopoverHeader,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import Dropzone from "react-dropzone";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import "../../css/search.css";
import { connect } from "react-redux";
import { upload } from "../../actions";

const imageMaxSize = 5000000; // KB

const CC_INFO = [
  {
    name: "CC BY",
    text: "Atribución",
    desc:
      "Esta licencia permite a otras distribuir, remezclar, retocar, y crear a partir de su obra, incluso con fines comerciales, siempre y cuando den crédito por la creación original. Esta es la más flexible de las licencias ofrecidas. Se recomienda para la máxima difusión y utilización de los materiales licenciados. ",
    img: "/assets/CCBY.svg"
  },
  {
    name: "CC BY-SA",
    text: "Atribución, Compartir Igual",
    desc:
      "Esta licencia permite a otras remezclar, retocar, y crear a partir de su obra, incluso con fines comerciales, siempre y cuando den crédito y licencien sus nuevas creaciones bajo los mismos términos. Esta licencia suele ser comparada con las licencias «copyleft» de software libre y de código abierto. Todas las nuevas obras basadas en la suya portarán la misma licencia, así que cualesquiera obras derivadas permitirán también uso comercial. Esta es la licencia que usa Wikipedia, y se recomienda para materiales que se beneficiarían de incorporar contenido de Wikipedia y proyectos con licencias similares. ",
    img: "/assets/CCBYSA.svg"
  },
  {
    name: "CC BY-ND",
    text: "Atribución, Sin Derivadas",
    desc:
      "Esta licencia permite a otras sólo descargar sus obras y compartirlas con otras siempre y cuando den crédito, incluso con fines comerciales, pero no pueden cambiarlas de forma alguna.",
    img: "/assets/CCBYND.svg"
  },
  {
    name: "CC BY-NC",
    text: "Atribución, No Comercial",
    desc:
      "Esta licencia permite a otras distribuir, remezclar, retocar, y crear a partir de su obra de forma no comercial y, a pesar de que sus nuevas obras deben siempre mencionarle y ser no comerciales, no están obligadas a licenciar sus obras derivadas bajo los mismos términos.",
    img: "/assets/CCBYNC.svg"
  },
  {
    name: "CC BY-NC-SA",
    text: "Atribución, No Comercial, Compartir Igual",
    desc:
      "Esta licencia permite a otras remezclar, retocar, y crear a partir de su obra de forma no comercial, siempre y cuando den crédito y licencien sus nuevas creaciones bajo los mismos términos. ",
    img: "/assets/CCBYNCSA.svg"
  },
  {
    name: "CC BY-NC-ND",
    text: "Atribución, No Comercial, Sin Derivadas",
    desc:
      "Esta licencia es la más restrictiva, permitiendo a otras sólo descargar sus obras y compartirlas con otras siempre y cuando den crédito, pero no pueden cambiarlas de forma alguna ni usarlas de forma comercial.",
    img: "/assets/CCBYNCND.svg"
  }
];

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
      date: "",
      tags: [],
      cc: "",
      onAlbum: false,
      albumName: "",
      albumDesc: "",
      photosList: [],
      length: 0
    };
    this.handleErase = this.handleErase.bind(this);
  }

  isAlbum = () => this.setState(prevState => ({ onAlbum: !prevState.onAlbum }));

  saveAlbum(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  updateDate = e => {
    this.setState({ date: e.target.value });
  };

  additionTag(tag) {
    const tags = [].concat(this.state.tags, tag);
    this.setState({ tags: tags });
  }

  deleteTag(i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  }

  updateCC(selected) {
    this.setState({ cc: selected });
  }

  handleOnDrop = files => {
    var images = [];
    if (files && files.length > 0) {
      for (var i = 0, f; (f = files[i]); i++) {
        if (!f.type.match("image.*") || f.size > imageMaxSize) {
          alert("Error: Extension no valida o archivo muy pesado");
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
          collapse: false,
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
      alert("Debe enviar al menos una foto");
    } else if (this.state.onAlbum && this.state.albumName === "") {
      alert("Debe rellenar el nombre del Album");
    } else if (this.state.photosList.some(el => el.meta.description === "")) {
      alert("Debe rellenar la descripcion de todas las fotos");
    } else {
      this.props.saveAll(this.state);
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
      <Container style={{ marginTop: "20px" }}>
        <DisclosureModal
          onClick={this.props.readDisclosure}
          isnotSet={!this.props.disclosed}
        />
        <Row>
          <Col md="3">
            <div style={styles.albumBox}>
              <Label style={{ fontSize: "18px" }}>Crear Album</Label>
              <Button
                style={styles.plusButton}
                color="primary"
                onClick={() => this.isAlbum()}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </div>
            <Form onSubmit={this.onSubmit} style={styles.generalInformation}>
              <FormGroup>
                <Collapse isOpen={this.state.onAlbum}>
                  <UploadAlbum save={info => this.saveAlbum(info)} />
                </Collapse>
              </FormGroup>
              <FormGroup>
                <Label style={styles.hr}>Informacion general</Label>
              </FormGroup>
              <FormGroup>
                <Label style={{ color: "#848687" }}>Fecha de las fotos:</Label>
                <Input type="date" onChange={this.updateDate} required />
              </FormGroup>
              <FormGroup>
                <Label style={{ color: "#848687" }}>Etiquetas:</Label>
                <ReactTags
                  style={{ width: "auto" }}
                  autoresize={false}
                  allowNew={true}
                  tags={this.state.tags}
                  suggestions={suggestions}
                  handleDelete={this.deleteTag.bind(this)}
                  handleAddition={this.additionTag.bind(this)}
                />
              </FormGroup>
              <FormGroup>
                <Label style={styles.hr}>
                  Permisos de acceso e intercambio
                </Label>
                <div style={{ marginTop: "10px" }}>
                  <FormGroup tag="fieldset">
                    {CC_INFO.map((el, k) => (
                      <FormGroup check key={k} style={{ marginTop: "5px" }}>
                        <Label check>
                          <Input
                            type="radio"
                            name="CC"
                            id={"CreativeCommonsCheckbox" + (k + 1)}
                            onClick={() => this.updateCC(el.name)}
                          />{" "}
                          {el.name + " "}
                          <FontAwesomeIcon
                            icon={faQuestionCircle}
                            id={"PopoverFocus" + (k + 1)}
                          />
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="top"
                            target={"PopoverFocus" + (k + 1)}>
                            <PopoverHeader>
                              <img
                                src={el.img}
                                style={{ width: "50%", float: "right" }}
                              />
                              {el.name}
                            </PopoverHeader>
                            <PopoverBody>{el.desc}</PopoverBody>
                          </UncontrolledPopover>
                        </Label>
                      </FormGroup>
                    ))}
                  </FormGroup>
                </div>
              </FormGroup>
              <ButtonGroup style={{ marginTop: "20px" }}>
                <Button onClick={this.props.goBack}>Atras</Button>
                <Button type="submit">Continuar</Button>
              </ButtonGroup>
            </Form>
          </Col>
          <Col md="9">
            <Dropzone onDrop={this.handleOnDrop}>
              {({ getRootProps, getInputProps }) => (
                <div style={styles.dropzone} {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Arrastra y suelta una imagen o haz click aqui</p>
                  <img
                    style={{ width: "100px" }}
                    src={"/assets/cloud-computing.png"}
                  />
                </div> // <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
              )}
            </Dropzone>
            {details}
          </Col>
        </Row>
      </Container>
    );
  }
}

const styles = {
  albumBox: {
    display: "flex",
    width: "94%",
    height: "auto",
    padding: "2px 10px 0px 10px",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "-5px",
    justifyContent: "space-between",
    backgroundColor: "#dceaf7",
    borderRadius: "10px 10px 0px 0px",
    borderTop: "1px solid rgb(156,158,159)",
    borderRight: "1px solid rgb(156,158,159)",
    borderLeft: "1px solid rgb(156,158,159)",
    boxShadow: "2px 2px 3px rgb(156,158,159)"
  },
  plusButton: {
    fontSize: "12px",
    padding: "2px",
    borderRadius: "50%",
    height: "25px",
    width: "25px"
  },
  generalInformation: {
    backgroundColor: "white",
    border: "1px solid rgb(156,158,159)",
    padding: "15px",
    borderRadius: "0px 0px 10px 10px"
  },
  hr: {
    borderBottom: "1px solid rgb(156,158,159)"
  },
  dropzone: {
    backgroundColor: "#dceaf7",
    textAlign: "center",
    padding: "15px",
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    border: "1px dashed rgb(156,158,159)",
    boxShadow: "2px 2px 4px rgb(156,158,159)"
  }
};

const mapStateToProps = state => {
  return {
    disclosed: state.upload.disclosureSet
  };
};

const mapActionsToProps = dispatch => {
  return {
    readDisclosure: () => dispatch(upload.readDisclosure())
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(UploadPhoto);
