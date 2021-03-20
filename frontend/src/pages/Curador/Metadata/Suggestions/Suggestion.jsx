import React, { useState, useEffect } from "react";
import {
  selectTagSuggestionsRecovered,
  selectUserIsAuthenticated,
  selectTagSuggestionsLoading,
  selectTagSuggestionsApproving,
  selectTagSuggestionsApproved,
  selectTagSuggestionsApproveFailIds,
  selectTagSuggestionsFailed
} from "../../../../reducers";
import { gallery } from "../../../../actions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import SuggestionTable from "./SuggestionTable";

import { Col, Container, Row, Button, ButtonGroup } from "reactstrap";
import { LeitSpinner } from "../../../../components";

const Suggestions = ({
  active,
  loading,
  getTagSuggestions,
  tagSuggestions,
  approveTagSuggestions,
  approving,
  approved,
  approveFailIds,
  failed
}) => {
  
  useEffect(() => {
    if (active) {
      getTagSuggestions();
    }
  }, [active]);

  useEffect(() => {
    if (approved || (failed && approveFailIds.length > 0)) {
      setSugSelected({})
      getTagSuggestions();
    }
  }, [approved, failed, approveFailIds]);

  const [sugSelected, setSugSelected] = useState({});

  return (
    <Container fluid>
      <h2>Sugerencias de Metadata</h2>

      <Row>
        <Col>
          <ButtonGroup>
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
        {tagSuggestions.length === 0 ? "No hay Sugerencias disponibles" : ""}
      </Row>
    </Container>
  );
};

Suggestions.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: selectUserIsAuthenticated(state),
  tagSuggestions: selectTagSuggestionsRecovered(state),
  loading: selectTagSuggestionsLoading(state),
  approving: selectTagSuggestionsApproving(state),
  approved: selectTagSuggestionsApproved(state),
  approveFailIds: selectTagSuggestionsApproveFailIds(state),
  failed: selectTagSuggestionsFailed(state)
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
