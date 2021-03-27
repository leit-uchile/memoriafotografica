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
  selectMetaDataNewIds,
  selectTagSuggestionsCreating,
  selectTagSuggestionsNewIds,
  selectTagSuggestionsFailed,
} from "../../../reducers";

import { metadata, gallery } from "../../../actions";
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

  const [modal, setModal] = useState(false);

  const [suggestionsToCreate, setSuggestionsToCreate] = useState([]);
  const [suggestionTagSent, setSuggestionTagSent] = useState(false);
  const [suggestionTagErrors, setSuggestionTagErrors] = useState(false);
  const [suggestionTagComplete, setSuggestionTagComplete] = useState(false);

  // Reaccionar a la  creacion de nueva Id para el metada
  useEffect(() => {
    if (metadataCreation.creating) {
      setSuggestionTagSent(true);
    } else if (
      !metadataCreation.creating &&
      metadataCreation.failedCreations.length === 0 &&
      metadataCreation.newIds.length !== 0
    ) {
      console.log(metadataCreation.newIds);

      let newMetaIds = metadataCreation.newIds.map((tag) => tag.id);

      console.log(newMetaIds);

      formData.tags.forEach((tag) => {
        metadata[tag.name] = { ...tag };
      });

      // filtrar metadatas ids (ya creados)
      let meta_ids = formData.tags
        .filter((el) => el.id !== undefined)
        .map((el) => el.id);
      setSuggestionsToCreate(meta_ids.concat(newMetaIds));
    } else {
      setSuggestionTagErrors(true);
    }
  }, [metadataCreation.creating]);

  // Crear Sugerencias de Tags
  useEffect(() => {
    console.log(suggestionsToCreate);
    if (suggestionsToCreate.length !== 0) {
      createTagSuggestions(photoId, suggestionsToCreate);
    }
  }, [suggestionsToCreate]);

  // Reaccionar a sugerencias de tags creadas!
  useEffect(() => {
    if (tagsuggestionsCreating) {
      setSuggestionTagSent(true);
    } else {
      if (tagSuggestionsFailed) {
        setSuggestionTagComplete(false);
        setSuggestionTagErrors(true);
      } else if (tagSuggestionsNewIds.length !== 0) {
        setSuggestionTagComplete(true);
      }
    }
  }, [tagsuggestionsCreating, tagSuggestionsFailed, tagSuggestionsNewIds]);

  const suggestions = meta
    ? meta.map((e) => ({ name: e.value, id: e.id }))
    : [];

  const reset = () => {
    setFormData({ tags: [] });
    setSuggestionTagSent(false);
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

    // filtrar metadatas nuevos!
    let new_metas = formData.tags
      .filter((el) => el.id === undefined)
      .map((el) => el.name);

    // filtrar metadatas ids (ya creados)
    let meta_ids = formData.tags
      .filter((el) => el.id !== undefined)
      .map((el) => el.id);

    // crear metadatas nuevos
    if (new_metas.length !== 0) {
      createMultipleMetas(new_metas);
    } else {
      setSuggestionsToCreate(meta_ids);
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
            tags.map((el) => (
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
