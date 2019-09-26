import React, { Fragment, useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Col,
  Row,
  Container,
  Collapse,
  UncontrolledPopover,
  PopoverBody,
  PopoverHeader,
  Button,
  ButtonGroup
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faQuestionCircle,
  faChevronCircleLeft,
  faChevronCircleRight
} from "@fortawesome/free-solid-svg-icons";
import ReactTags from "react-tag-autocomplete";

const UploadAlbum = ({
  isAuth,
  saveAll,
  nextStep,
  previousStep,
  meta,
  sendAlert
}) => {
  const [formData, setFormData] = useState({
    date: "",
    tags: [],
    cc: "",
    onAlbum: false,
    albumName: "",
    albumDesc: ""
  });

  const suggestions = meta
      ? meta.map(el => {
          return { id: el.id, name: el.value };
        })
      : [];

  const updateCC = selected => {
    setFormData({ ...formData, cc: selected });
  };

  const deleteTag = i => {
    const tags = formData.tags.slice(0);
    tags.splice(i, 1);
    setFormData({ ...formData, tags });
  };

  const additionTag = tag => {
    const tags = [].concat(formData.tags, tag);
    setFormData({ ...formData, tags: tags });
  };

  const updateDate = e => {
    setFormData({ ...formData, date: e.target.value });
  };

  const saveAlbum = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isAlbum = () =>
    setFormData({ ...formData, onAlbum: !formData.onAlbum });

  const onSubmitD = e => {
    e.preventDefault();
    console.log("SQDQS", formData)
    if (formData.onAlbum && formData.albumName === "") {
      sendAlert("Debe rellenar el nombre del Album","warning");
    } else if(formData.date === ""){
      sendAlert("Debe rellenar la fecha","warning");
    } else if(formData.cc === ""){
      sendAlert("Debe seleccionar una licencia","warning");
    }else {
      console.log("SQDQS", formData)
      saveAll(formData);
      nextStep();
    }
  };

  return (
    <Container>
      <Row>
        <Col style={{ textAlign: "center", color: "#ff5a60" }}>
          <h2>Subir Fotograf&iacute;a / Informacion general de las fotograf&iacute;as</h2>
        </Col>
      </Row>
      <Row style={{ marginTop: "2em" }}>
        <Col md={8}>
          <div style={styles.albumBox}>
            <Label style={{ fontSize: "18px" }}>Crear Album</Label>
            <Button
              style={styles.plusButton}
              color="primary"
              onClick={() => isAlbum()}>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </div>
          <Form style={styles.generalInformation}>
            <FormGroup>
              <Collapse isOpen={formData.onAlbum}>
                <Fragment>
                  <Input
                    name="albumName"
                    type="text"
                    placeholder="Nombre del album"
                    onChange={info => saveAlbum(info)}
                    required
                  />
                  <Input
                    name="albumDesc"
                    type="textarea"
                    placeholder="Descripcion (Opcional)"
                    onKeyUp={info => saveAlbum(info)}
                  />
                </Fragment>
              </Collapse>
            </FormGroup>
            <FormGroup>
              <Label style={styles.hr}>Informacion general</Label>
            </FormGroup>
            <FormGroup>
              <Label style={{ color: "#848687" }}>Fecha de las fotos:</Label>
              <Input type="date" onChange={updateDate} required />
            </FormGroup>
            <FormGroup>
              <Label style={{ color: "#848687" }}>Etiquetas:</Label>
              <ReactTags
                style={{ width: "auto" }}
                placeholder={"Añadir etiquetas"}
                autoresize={false}
                allowNew={true}
                tags={formData.tags}
                suggestions={suggestions}
                handleDelete={deleteTag}
                handleAddition={additionTag}
              />
            </FormGroup>
            <FormGroup>
              <Label style={styles.hr}>Permisos de acceso e intercambio</Label>
              <div style={{ marginTop: "10px" }}>
                <FormGroup tag="fieldset">
                  {CC_INFO.map((el, k) => (
                    <FormGroup check key={k} style={{ marginTop: "5px" }}>
                      <Label check>
                        <Input
                          type="radio"
                          name="CC"
                          id={"CreativeCommonsCheckbox" + (k + 1)}
                          onClick={() => updateCC(el.name)}
                        />{" "}
                        <span className="CCName">{el.name + " "}</span>
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
              <ButtonGroup
                style={
                  !isAuth
                    ? { marginTop: "20px", width: "10em" }
                    : { marginTop: "20px", width: "20em" }
                }>
                {!isAuth ? (
                  <Button onClick={previousStep}>
                    <FontAwesomeIcon icon={faChevronCircleLeft} />
                  </Button>
                ) : null}
                <Button color="primary" type="submit" onClick={onSubmitD}>
                  <FontAwesomeIcon icon={faChevronCircleRight} />
                </Button>
              </ButtonGroup>
          </Form>
        </Col>
        <Col md={4}>
          <h4 style={{fontWeight: "600"}}>
            Subida de contenido
          </h4>
          <ul>
            <li>Las fotos pueden agruparse en un &aacute;lbum</li>
            <li>Es necesario seleccionar una licencia de Creative Commons</li>
          </ul>
          <h4 style={{fontWeight: "600"}}>
            Creaci&oacute;n de metadata
          </h4>
          <ul>
            <li>Los metadatos permiten realizar b&uacute;squedas y ordenar el contenido</li>
            <li>Estas etiquedas quedar&aacute;n sujetas a aprobaci&oacute;n del equipo de LEIT</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

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
    backgroundColor: "#f7f7f7",
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
    border: "1px solid rgb(210,214,218)",
    padding: "15px",
    borderRadius: "0px 0px 10px 10px"
  },
  hr: {
    borderBottom: "1px solid rgb(156,158,159)"
  },
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

export default UploadAlbum;
