import React, { useState, Fragment } from "react";
import { LeitSpinner } from "../../../components/index";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from "reactstrap";

import { connect } from "react-redux";

// import { connect } from "react-redux";
// import { gallery } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
// import "../../../components/ReportModal.css";
// import PropTypes from "prop-types";
import {
  // selectReportComplete,
  // selectReportPhotoReportSent,
  selectUserIsAuthenticated,
  selectMetaDataGeneralTagsResult
} from "../../../reducers";

import { metadata } from "../../../actions";
import ReactTags from "react-tag-autocomplete";

const TagSuggestionModal = ({
  // style,
  // className,
  // suggestionTagSent,
  // suggestionTagComplete,
  isAuth,
  meta,
  searchMeta}
) => {
  const [formData, setFormData] = useState({
    tags: [],
  });

  const [sent, setSent] = useState(false);
  const [modal, setModal] = useState(false);

  const suggestionTagSent = false;
  const suggestionTagComplete = false;
  // console.log(meta);
  // console.log(searchMeta);
  // console.log(isAuth);

  const suggestions = meta
    ? meta.map((e) => ({ name: e.value, id: e.id }))
    : [];

  // const suggestions = [];
  // console.log(meta);

  const sendSuggest = () => {};

  const deleteTag = (i) => {
    const tags = formData.tags.slice(0);
    tags.splice(i, 1);
    setFormData({ ...formData, tags });
  };

  const additionTag = (tag) => {
    const tags = [].concat(formData.tags, tag);
    setFormData({ ...formData, tags: tags });
  };

  const toggle = () => {
    setSent(false);
    setModal(!modal);
    // setTimeout(this.props.resetReport, 1000);
  };

  const handleInputChange = (query) => {
    if (query.length >= 2) {
      searchMeta(query);
    }
  };

  const suggestTagForm = (
    <Fragment>
      <p>
        {"Puedes sugerir etiquetas que consideres adecuada para esta foto. Tus sugerencias serán revisadas por un Curador o el Dueño de la Foto."}
      </p>

      <Form className="white-box form-container upload-album-section-content">
        <div className="form-title">
          {/* <FontAwesomeIcon icon={faBook} /> */}
          <Label> Sugerir Etiquetas</Label>
        </div>
        
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
            Para ingresar una nueva etiqueta debe presionar la tecla "Entrar" o
            "Tabulación"
          </FormText>
        </FormGroup>
      </Form>
    </Fragment>
  );

  return (
    <Fragment>
      <Button
        // className={className}
        onClick={toggle}
        // style={style}
        // color="danger"
      >
        {/* <FontAwesomeIcon icon={faFlag} /> */}
        Sugerir
      </Button>

      {/* <Link style={{ marginLeft: "0.2em" }} to="#">
        Sugerir
      </Link> */}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {"Sugerir Etiqueta"}
        </ModalHeader>
        <ModalBody>
          { isAuth ? (
            sent ? (
              !suggestionTagSent ? (
                <div className="report-modal-content">
                  <h5>Enviando Sugerencias</h5>
                  <LeitSpinner />
                </div>
              ) : suggestionTagComplete ? (
                <div className="report-modal-content">
                  <h5>¡Sugerencias enviadas!</h5>
                </div>
              ) : (
                <div className="report-modal-content">
                  <h5>Hubo un problema al subir tus sugerencias</h5>
                  <p>Intentalo nuevamente</p>
                  <Button>Reiniciar</Button>
                </div>
              )
            ) : (
              suggestTagForm
            )
          ) : (
            <div
              className="report-modal-content"
              style={{ padding: "100px 0" }}
            >
              <h4>
                Debes ingresar a la plataforma para poder realizar sugerencias
                de etiquetas
              </h4>
              <Link to="/login" className="btn bnt-block btn-primary">
                Ingresar
              </Link>
            </div>
          )}
        </ModalBody>
        {isAuth ? (
          <ModalFooter>
            {!sent && !suggestionTagSent ? (
              <Fragment>
                <Button color="primary" onClick={sendSuggest}>
                  Enviar Sugerencia
                </Button>
                <Button color="secondary" onClick={toggle}>
                  Cancelar
                </Button>
              </Fragment>
            ) : (
              <Button color="secondary" onClick={toggle}>
                Cerrar
              </Button>
            )}
          </ModalFooter>
        ) : null}
      </Modal>
    </Fragment>
  );
};


const mapStateToProps = (state) => ({
  // photoReportSent: selectReportPhotoReportSent(state),
  // reportComplete: selectReportComplete(state),
  isAuth: selectUserIsAuthenticated(state),
  meta: selectMetaDataGeneralTagsResult(state),

});

const mapActionToProps = (dispatch) => ({
  // reportPhoto: (data) => dispatch(gallery.reports.reportPhoto(data)),
  // resetReport: () => dispatch(gallery.reports.reportPhotoReset()),
  searchMeta: (query) => dispatch(metadata.searchMetadataByValueGeneral(query, 1, 10)),

});

export default connect(mapStateToProps, mapActionToProps)(TagSuggestionModal);
