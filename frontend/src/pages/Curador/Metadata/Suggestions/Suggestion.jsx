import React, { useState, useEffect } from "react";
import {
  selectTagSuggestionsRecovered,
  selectUserIsAuthenticated,
  selectTagSuggestionsLoading,
} from "../../../../reducers";
import { gallery } from "../../../../actions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import SuggestionTable from "./SuggestionTable";

import { Col, Container, Row } from "reactstrap";
import { LeitSpinner } from "../../../../components";

const Suggestions = ({
  active,
  loading,
  getTagSuggestions,
  tagSuggestions,
}) => {
  useEffect(() => {
    console.log(tagSuggestions);
  }, [tagSuggestions]);

  useEffect(() => {
    if (active) {
      getTagSuggestions();
    }
  }, [active]);

  return (
    <Container fluid>
      <h2>Sugerencias de Metadata</h2>
      <Row style={{ marginBottom: "10px" }}>Filtros</Row>

      <Row>
        <Col>
          {loading ? (
            <LeitSpinner />
          ) : (
            <SuggestionTable suggestions={tagSuggestions} />
          )}
          {tagSuggestions.count === 0 ? "No hay Sugerencias disponibles" : ""}
        </Col>
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
});

const mapActionToProps = (dispatch) =>
  bindActionCreators(
    {
      getTagSuggestions: gallery.tagsuggestions.getTagSuggestions,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionToProps)(Suggestions);
