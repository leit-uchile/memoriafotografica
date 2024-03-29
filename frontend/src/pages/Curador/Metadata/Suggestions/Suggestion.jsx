import React, { Fragment, useState, useEffect } from "react";
import {
  selectTagSuggestionsRecovered,
  selectTagSuggestionsLoading,
  selectTagSuggestionsApproving,
  selectTagSuggestionsApproved,
  selectTagSuggestionsApproveFailIds,
  selectTagSuggestionsFailed,
} from "../../../../reducers";
import { gallery } from "../../../../actions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import SuggestionTable from "./SuggestionTable";

import { Col, Container, Row, Button, ButtonGroup } from "reactstrap";
import HelpMessages from "../../HelpMessages";
import { LeitSpinner } from "../../../../components";

const messages = [
  {
    action: `Aceptar Sugerencias`,
    helpMessage: `Aceptar una sugerencia asocia una etiqueta a la imagen correspondiente y podrá ser vista por los usuarios en la lista de etiquetas de la imagen.
    La etiqueta debe ser aprobada y categorizada por si misma en la pestaña "Clasificar", una etiqueta no aprobada no se mostrará a los usuario a pesar de que la sugerencia sea aceptada.`,
  },
  {
    action: `Eliminar Sugerencias`,
    helpMessage: `Eliminar sugerencia borra la asociación etiqueta/imagen pero no borra la etiqueta misma. Si deseas borrar la etiqueta puedes hacerlo en la pestaña "Buscar y Modificar".`,
  },
];

const Suggestions = ({
  active,
  loading,
  getTagSuggestions,
  tagSuggestions,
  approveTagSuggestions,
  approving,
  approved,
  approveFailIds,
  failed,
}) => {
  const [sugSelected, setSugSelected] = useState({});

  useEffect(() => {
    if (active) {
      getTagSuggestions();
    }
  }, [active, getTagSuggestions]);

  useEffect(() => {
    if (approved || (failed && approveFailIds.length > 0)) {
      setSugSelected({});
      getTagSuggestions();
    }
  }, [approved, failed, approveFailIds, getTagSuggestions]);

  return (
    <Container fluid>
      <h2>Sugerencias de Metadata</h2>

      <Row>
        <Col>
          <ButtonGroup>
            <Button id="help">¿Ayuda?</Button>

            <Button
              color="primary"
              onClick={() => {
                approveTagSuggestions(Object.keys(sugSelected), 1);
              }}
              disabled={Object.keys(sugSelected).length === 0}
            >
              Aceptar {Object.keys(sugSelected).length} Sugerencias
            </Button>

            <Button
              color="secondary"
              onClick={() => {
                approveTagSuggestions(Object.keys(sugSelected), 0);
              }}
              disabled={Object.keys(sugSelected).length === 0}
            >
              Eliminar {Object.keys(sugSelected).length} Sugerencias
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      <Row style={{ marginTop: "1em" }}>
        <HelpMessages id={"#help"} messages={messages} />
      </Row>

      <Row>
        {loading || approving ? (
          <Col style={{ textAlign: "center" }}>
            <LeitSpinner />
          </Col>
        ) : (
          <Col>
            <SuggestionTable
              suggestions={tagSuggestions}
              sugSelected={sugSelected}
              setSugSelected={setSugSelected}
            />
          </Col>
        )}
      </Row>

      <Row>
        {tagSuggestions.count === 0 ? "No hay Sugerencias disponibles" : ""}
      </Row>
    </Container>
  );
};

Suggestions.propTypes = {
  active: PropTypes.bool.isRequired,
  getTagSuggestions: PropTypes.func.isRequired,
  approveTagSuggestions: PropTypes.func.isRequired,
  tagSuggestions: PropTypes.object,
  approveFailIds: PropTypes.array,
  approving: PropTypes.bool.isRequired,
  approved: PropTypes.bool.isRequired,
  failed: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  tagSuggestions: selectTagSuggestionsRecovered(state),
  loading: selectTagSuggestionsLoading(state),
  approving: selectTagSuggestionsApproving(state),
  approved: selectTagSuggestionsApproved(state),
  approveFailIds: selectTagSuggestionsApproveFailIds(state),
  failed: selectTagSuggestionsFailed(state),
});

const mapActionToProps = (dispatch) =>
  bindActionCreators(
    {
      getTagSuggestions: gallery.tagsuggestions.getTagSuggestions,
      approveTagSuggestions: gallery.tagsuggestions.approveTagSuggestions,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionToProps)(Suggestions);
