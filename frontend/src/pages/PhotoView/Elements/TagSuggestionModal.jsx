import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

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
  FormFeedback,
  Badge,
} from "reactstrap";

import { Link } from "react-router-dom";
import { LeitSpinner } from "../../../components/index";
import ReactTags from "react-tag-autocomplete";

import {
  selectUserIsAuthenticated,
  selectMetaDataGeneralTagsResult,
  selectMetaData,
  selectTagSuggestionsCreating,
  selectTagSuggestionsNewIds,
  selectTagSuggestionsFailed,
} from "../../../reducers";

import { metadata, gallery } from "../../../actions";

const TagSuggestionModal = ({
  photoId,
  tags,
  isAuth,
  meta,
  searchMeta,
  createMultipleMetas,
  createTagSuggestions,
  metadataCreation,
  tagsuggestionsCreating,
  tagSuggestionsFailed,
  tagSuggestionsNewIds,
}) => {
  const [formData, setFormData] = useState({
    tags: [],
  });

  const [isOpen, setIsOpen] = useState(false);
  const [tagDuplicated, setTagDuplicated] = useState({
    tags: [],
    isDup: false,
  });

  const [suggestionRequest, setSuggestionRequest] = useState({
    sent: false,
    errors: false,
    complete: false,
  });

  const suggestions = meta
    ? meta
        .map((e) => ({ name: e.value, id: e.id }))
        .filter((t) => {
          for (const tag of tags) {
            if (t.id === tag.id) {
              return false;
            }
          }
          return true;
        })
    : [];

  const reset = () => {
    setFormData({ tags: [] });
    setSuggestionRequest({ sent: false, errors: false, complete: false });
    setTagDuplicated({ tags: [], isDup: false });
  };

  const deleteTag = (i) => {
    const tagRemoved = formData.tags[i];
    const tags = formData.tags.slice(0);
    tags.splice(i, 1);
    setFormData({ ...formData, tags });

    if (tagDuplicated.isDup) {
      let dupIndex = tagDuplicated.tags.indexOf(tagRemoved.name);
      if (dupIndex !== -1) {
        const newDupTags = tagDuplicated.tags.slice(0);
        newDupTags.splice(dupIndex, 1);
        setTagDuplicated({ tags: newDupTags, isDup: newDupTags.length !== 0 });
      }
    }
  };

  const additionTag = (newTag) => {
    const newTags = [].concat(formData.tags, newTag);
    setFormData({ ...formData, tags: newTags });

    for (const tag of tags) {
      if (newTag.name === tag.value) {
        setTagDuplicated({
          tags: tagDuplicated.tags.concat([newTag.name]),
          isDup: true,
        });
      }
    }
  };

  const toggle = () => {
    setIsOpen(!isOpen);
    setTimeout(reset, 1000);
  };

  const handleInputChange = (query) => {
    if (query.length >= 2) {
      searchMeta(query);
    }
  };

  // Comenzar creación de metadata
  const upLoadMetadata = () => {
    let metadata = {};

    formData.tags.forEach((tag) => {
      metadata[tag.name] = { ...tag };
    });

    // filtrar metadatas nuevos!
    let newMetas = formData.tags
      .filter((el) => el.id === undefined)
      .map((el) => el.name);

    // filtrar metadatas ids (ya creados)
    let metaIds = formData.tags
      .filter((el) => el.id !== undefined)
      .map((el) => el.id);

    // crear metadatas nuevos
    if (newMetas.length !== 0) {
      createMultipleMetas(newMetas);
    } else if (metaIds.length !== 0) {
      createTagSuggestions(photoId, metaIds);
    }
  };

  // Reaccionar a la  creacion de nueva Id para el metada
  useEffect(() => {
    if (metadataCreation.creating) {
      setSuggestionRequest({ ...suggestionRequest, sent: true });
    } else if (
      !metadataCreation.creating &&
      metadataCreation.failedCreations.length === 0 &&
      metadataCreation.newIds.length !== 0
    ) {
      let newMetaIds = metadataCreation.newIds.map((tag) => tag.id);
      formData.tags.forEach((tag) => {
        metadata[tag.name] = { ...tag };
      });

      // filtrar metadatas ids (ya creados)
      let metaIds = formData.tags
        .filter((el) => el.id !== undefined)
        .map((el) => el.id);
      createTagSuggestions(photoId, metaIds.concat(newMetaIds));
    } else {
      setSuggestionRequest({
        ...suggestionRequest,
        errors: true,
        complete: false,
      });
    }
  }, [metadataCreation.creating]);

  // Reaccionar a sugerencias de tags creadas!
  useEffect(() => {
    if (tagsuggestionsCreating) {
      setSuggestionRequest({ ...suggestionRequest, sent: true });
    } else {
      if (tagSuggestionsFailed) {
        setSuggestionRequest({
          ...suggestionRequest,
          errors: true,
          complete: false,
        });
      } else if (tagSuggestionsNewIds.length !== 0) {
        setSuggestionRequest({
          ...suggestionRequest,
          errors: false,
          complete: true,
        });
      }
    }
  }, [tagsuggestionsCreating, tagSuggestionsFailed, tagSuggestionsNewIds]);

  const suggestTagForm = (
    <Fragment>
      <p>
        {
          "Puedes sugerir etiquetas que consideres adecuada para esta foto. Tus sugerencias serán revisadas por un Curador o el Dueño de la Foto."
        }
      </p>

      <Form
        className="white-box form-container upload-album-section-content"
        role="form"
      >
        <FormGroup>
          <h5 style={{ textAlign: "left" }}>Etiquetas</h5>
          {tags.length === 0 ? (
            <span style={{ fontStyle: "italic" }}>No hay tags asociados</span>
          ) : (
            tags.map((el) => (
              <Badge className="tags" key={el.id} pill>
                #{el.value}
              </Badge>
            ))
          )}
        </FormGroup>

        <FormGroup>
          <h5 style={{ textAlign: "left" }}>Sugerir</h5>
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

          {tagDuplicated.isDup && (
            <div style={{ color: "red", size: "1.5em" }}>
              <span>
                Tu sugerencia <b> {tagDuplicated.tags[0]} </b> ya se encuentra
                dentro de los tags de esta foto. Debes borrarla para continuar.
              </span>
            </div>
          )}
        </FormGroup>
      </Form>
    </Fragment>
  );

  return (
    <Fragment>
      <Button onClick={toggle}>Sugerir</Button>

      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>{"Sugerir Etiquetas"}</ModalHeader>
        <ModalBody>
          {isAuth ? (
            suggestionRequest.sent ? (
              suggestionRequest.complete ? (
                <div className="report-modal-content">
                  <h5>¡Sugerencias enviadas!</h5>
                </div>
              ) : suggestionRequest.errors ? (
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
            {!suggestionRequest.sent ? (
              <Fragment>
                <Button
                  color="primary"
                  onClick={upLoadMetadata}
                  disabled={tagDuplicated.isDup}
                >
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
  photoId: PropTypes.number.isRequired,
  tags: PropTypes.array.isRequired,
  isAuth: PropTypes.bool.isRequired,
  meta: PropTypes.array.isRequired,
  metadataCreation: PropTypes.object,
  tagSuggestionsNewIds: PropTypes.array,
  tagsuggestionsCreating: PropTypes.bool,
  tagSuggestionsFailed: PropTypes.bool,
  searchMeta: PropTypes.func.isRequired,
  createMultipleMetas: PropTypes.func.isRequired,
  createTagSuggestions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: selectUserIsAuthenticated(state),
  meta: selectMetaDataGeneralTagsResult(state),
  metadataCreation: selectMetaData(state),
  tagsuggestionsCreating: selectTagSuggestionsCreating(state),
  tagSuggestionsFailed: selectTagSuggestionsFailed(state),
  tagSuggestionsNewIds: selectTagSuggestionsNewIds(state),
});

const mapActionToProps = (dispatch) =>
  bindActionCreators(
    {
      createMultipleMetas: metadata.createMultipleMetas,
      createTagSuggestions: gallery.tagsuggestions.createTagSuggestions,
      searchMeta: (query) =>
        metadata.searchMetadataByValueGeneral(query, 1, 10),
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionToProps)(TagSuggestionModal);
