import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Col,
  Row,
  Container,
  UncontrolledPopover,
  PopoverBody,
  PopoverHeader,
  Button,
  ButtonGroup,
  FormText,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faChevronCircleLeft,
  faChevronCircleRight,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { faCreativeCommons } from "@fortawesome/free-brands-svg-icons";
import ReactTags from "react-tag-autocomplete";
import PropTypes from "prop-types"
import "./css/uploadAlbum.css";
import { useSelector } from 'react-redux'


const toMaxDate = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

/**
 * Upload Album
 *
 * Saves general information about the pictures and allows to
 * create an album with an optional prompt
 *
 * @param isAuth changes behavior to include previou step (add contact information)
 * @param saveAll function that saves the info on the parent component
 * @param nextStep StepWizard function
 * @param meta metadata info
 * @param sendAlert
 * @param searchMeta by name
 */
const UploadAlbum = ({
  isAuth,
  saveAll,
  nextStep,
  previousStep,
  meta,
  sendAlert,
  searchMeta,
}) => {
  const [formData, setFormData] = useState({
    date: "",
    tags: [],
    cc: "",
  });

  const CC_INFO = useSelector((state) => state.licenses)

  const suggestions = meta
    ? meta.map((e) => ({ name: e.value, id: e.id }))
    : [];

  const updateCC = (selected) => {
    setFormData({ ...formData, cc: selected });
  };

  const handleInputChange = (query) => {
    if (query.length >= 2) {
      searchMeta(query, 1, 10);
    }
  };

  const deleteTag = (i) => {
    const tags = formData.tags.slice(0);
    tags.splice(i, 1);
    setFormData({ ...formData, tags });
  };

  const additionTag = (tag) => {
    const tags = [].concat(formData.tags, tag);
    setFormData({ ...formData, tags: tags });
  };

  const updateDate = (e) => {
    setFormData({ ...formData, date: e.target.value });
  };

  const onSubmitD = (e) => {
    e.preventDefault();
    if (formData.date === "") {
      sendAlert("Debe rellenar la fecha", "warning");
    } else if (formData.cc === "") {
      sendAlert("Debe seleccionar una licencia", "warning");
    } else {
      // Map to value: el.name
      let mapped_tags = formData.tags.map((tag) => ({
        // We need to trim the values so that the mapping
        // done by value after metadata creation doesnt fails.
        // Ex: value saved without trim -> "Hola   "
        //  value returned after creation onback -> "Hola"
        //  Mapping by name using old name -> "Hola   " over backendInfo={"Hola": {...tag1}, "Chao": {...tag2}}
        // The mapping backendInfo["Hola    "] results in undefined
        value: tag.name.trim(),
        id: tag.id,
      }));
      saveAll({ ...formData, tags: mapped_tags });
      nextStep();
    }
  };

  const today = new Date();

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="page-title">
            Subir Fotograf&iacute;a / Informacion general de las
            fotograf&iacute;as
          </h2>
        </Col>
      </Row>
      <Row style={{ marginTop: "2em" }}>
        <Col md={{ size: 6, offset: 1 }}>
          <div className="upload-album-section">
            <Label>Información General</Label>
          </div>
          <Form className="white-box form-container upload-album-section-content">
            <div className="form-title">
              <FontAwesomeIcon icon={faBook} />
              <Label> Metadatos</Label>
            </div>
            <FormGroup>
              <Label className="form-subtitle">Fecha de las fotos:</Label>
              <Input
                type="date"
                onChange={updateDate}
                required
                max={toMaxDate(today)}
              />
            </FormGroup>{" "}
            <FormGroup>
              <Label className="form-subtitle">Etiquetas:</Label>
              <ReactTags
                placeholder={"Añadir etiquetas"}
                autoresize={false}
                allowNew={true}
                tags={formData.tags}
                suggestions={suggestions}
                handleDelete={deleteTag}
                handleAddition={additionTag}
                handleInputChange={handleInputChange}
              />
              <FormText color="muted">
                Para ingresar una nueva etiqueta debe presionar la tecla
                "Entrar" o "Tabulación"
              </FormText>
            </FormGroup>
            <FormGroup>
              <div className="form-title">
                <FontAwesomeIcon icon={faCreativeCommons} />
                <Label> Licencias: Permisos de acceso e intercambio</Label>
              </div>
              <div style={{ marginTop: "10px" }}>
                <FormGroup tag="fieldset">
                  {CC_INFO.map((el, k) => (
                    <FormGroup check key={k} style={{ marginTop: "5px" }}>
                      <Label check>
                        <Input
                          type="radio"
                          name="CC"
                          id={"CreativeCommonsCheckbox" + (k + 1)}
                          onClick={() => updateCC(el.id)}
                        />{" "}
                        <span className="CCName">{el.code + " "}</span>
                        <FontAwesomeIcon
                          icon={faQuestionCircle}
                          id={"PopoverFocus" + (k + 1)}
                        />
                        <UncontrolledPopover
                          trigger="legacy"
                          placement="top"
                          target={"PopoverFocus" + (k + 1)}
                          style={{
                            maxWidth: '70vh'
                          }}
                        >
                          <PopoverHeader
                            style={{
                              display: 'flex',
                              flex: 1,
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}

                          >
                            {el.short_description}
                            <img
                              alt="Uploaded content"
                              src={el.image}
                              style={{ width: "15%" }}
                            />
                          </PopoverHeader>
                          <PopoverBody>{el.description}</PopoverBody>
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
              }
            >
              {!isAuth ? (
                <Button onClick={previousStep}>
                  <FontAwesomeIcon icon={faChevronCircleLeft} /> Volver
                </Button>
              ) : null}
              <Button color="primary" type="submit" onClick={onSubmitD}>
                Continuar <FontAwesomeIcon icon={faChevronCircleRight} />
              </Button>
            </ButtonGroup>
          </Form>
        </Col>
        <Col md={4} className="white-box upload-rules">
          <h4>Subida de contenido</h4>
          <ul>
            <li>
              Las fotos pueden agruparse en un <b>&aacute;lbum</b>
            </li>
            <li>Es necesario seleccionar una licencia de Creative Commons</li>
          </ul>
          <h4>Creaci&oacute;n de metadata</h4>
          <ul>
            <li>
              Los metadatos permiten realizar b&uacute;squedas y ordenar el
              contenido
            </li>
            <li>
              Estas etiquedas quedar&aacute;n sujetas a aprobaci&oacute;n del
              equipo de LEIT
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

UploadAlbum.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  saveAll: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  meta: PropTypes.array.isRequired,
  sendAlert: PropTypes.func.isRequired,
  searchMeta: PropTypes.func.isRequired,
}

export default UploadAlbum;
