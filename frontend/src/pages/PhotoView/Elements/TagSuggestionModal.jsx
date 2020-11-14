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
  Badge,
} from "reactstrap";

import { Link } from "react-router-dom";

import {
  selectUserIsAuthenticated,
  selectMetaDataGeneralTagsResult,
  selectMetaData,
} from "../../../reducers";

import { metadata } from "../../../actions";
import ReactTags from "react-tag-autocomplete";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useEffect } from "react";

const TagSuggestionModal = ({
  // style,
  // className,
  // suggestionTagSent,
  // suggestionTagComplete,
  tags,
  isAuth,
  meta,
  searchMeta,
  createMultipleMetas,
  metadataCreation,
}) => {
  const [formData, setFormData] = useState({
    tags: [],
  });

  const [modal, setModal] = useState(false);
  const [suggestionTagSent, setSuggestionTagSent] = useState(false);
  const [suggestionTagErrors, setSuggestionTagErrors] = useState(false);
  const [suggestionTagComplete, setSuggestionTagComplete] = useState(false);

  useEffect(() => {
    console.log(metadataCreation);

    if (metadataCreation.creating) {
      setSuggestionTagSent(true);
    } else if (
      !metadataCreation.creating &&
      metadataCreation.failedCreations.length === 0
    ) {
      setSuggestionTagComplete(true);
    } else {
      setSuggestionTagErrors(true);
    }
  }, [metadataCreation.creating]);

  const suggestions = meta
    ? meta.map((e) => ({ name: e.value, id: e.id }))
    : [];

  // const sendSuggest = () => {};

  const reset = () => {
    setFormData({ tags: [] });
    setSuggestionTagSent(false);
    setSuggestionTagErrors(false);
    setSuggestionTagComplete(false);
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

  const toggle = () => {
    setSuggestionTagSent(false);
    setModal(!modal);
    setTimeout(reset, 1000);
  };

  const handleInputChange = (query) => {
    if (query.length >= 2) {
      searchMeta(query);
    }
  };

  const upLoadMetadata = () => {
    let metadata = {};

    formData.tags.forEach((tag) => {
      metadata[tag.name] = { ...tag };
    });

    let new_metas = formData.tags
      .filter((el) => el.id === undefined)
      .map((el) => el.name);

    if (new_metas.length !== 0) {
      setSuggestionTagSent(true);
      createMultipleMetas(new_metas);
    }
  };

  const suggestTagForm = (
    <Fragment>
      <p>
        {
          "Puedes sugerir etiquetas que consideres adecuada para esta foto. Tus sugerencias serán revisadas por un Curador o el Dueño de la Foto."
        }
      </p>

      <Form className="white-box form-container upload-album-section-content">
        <FormGroup>
          <h5 style={{ textAlign: "left" }}>Etiquetas</h5>
          {tags.length === 0 ? (
            <span style={{ fontStyle: "italic" }}>No hay tags asociados</span>
          ) : (
            tags.map((el, index) => (
              <Badge
                className="tags"
                key={el.id}
                pill
                // onClick={(e) => onRedirect(el.id, el.value)}
              >
                #{el.value}
              </Badge>
            ))
          )}
        </FormGroup>

        <FormGroup>
          <h5 style={{ textAlign: "left" }}>Sugerir</h5>
          {/* <Label className="form-subtitle">Sugerir:</Label> */}
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
        onClick={toggle}
        // className={className}
        // style={style}
        // color="danger"
      >
        {/* <FontAwesomeIcon icon={faFlag} /> */}
        Sugerir
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{"Sugerir Etiquetas"}</ModalHeader>
        <ModalBody>
          {isAuth ? (
            suggestionTagSent ? (
              suggestionTagComplete ? (
                <div className="report-modal-content">
                  <h5>¡Sugerencias enviadas!</h5>
                </div>
              ) : suggestionTagErrors ? (
                <div className="report-modal-content">
                  <h5>Hubo un problema al subir algunas de tus sugerencias</h5>
                  <p>Intentalo nuevamente</p>
                  <Button onClick={reset}>Reiniciar</Button>
                </div>
              ) : (
                <div className="report-modal-content">
                  <h5>Enviando Sugerencias</h5>
                  <LeitSpinner />
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
                Debes ingresar a la plataforma para poder sugerir etiquetas
              </h4>
              <Link to="/login" className="btn bnt-block btn-primary">
                Ingresar
              </Link>
            </div>
          )}
        </ModalBody>
        {isAuth ? (
          <ModalFooter>
            {!suggestionTagSent ? (
              <Fragment>
                <Button color="primary" onClick={upLoadMetadata}>
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

TagSuggestionModal.propTypes = {
  tags: PropTypes.array.isRequired,
  isAuth: PropTypes.bool.isRequired,
  meta: PropTypes.array.isRequired,
  searchMeta: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: selectUserIsAuthenticated(state),
  meta: selectMetaDataGeneralTagsResult(state),
  metadataCreation: selectMetaData(state),
});

const mapActionToProps = (dispatch) =>
  bindActionCreators(
    {
      createMultipleMetas: metadata.createMultipleMetas,
      searchMeta: (query) =>
        metadata.searchMetadataByValueGeneral(query, 1, 10),
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionToProps)(TagSuggestionModal);
