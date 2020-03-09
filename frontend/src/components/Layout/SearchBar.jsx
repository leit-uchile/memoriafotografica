import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Button, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import { search, home, misc, metadata } from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Autosuggest from "react-autosuggest";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swapPage: false,
      id: "",
      value: "",
      suggestions: [],
      iptc_mapping: {},
      limit: 10
    };
    if (props.iptc.length === 0) {
      this.props.onLoadGetIPTC();
    }
  }

  swapPage = () => {
    if (this.props.currentPage !== "/gallery/") {
      this.setState({ swapPage: true });
    }
    if (this.state.id !== undefined && this.state.id !== "") {
      this.props.putSearch(this.state.id, this.state.value);
    }
  };

  onChange = (e, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.search(value, this.state.limit);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (e, { suggestion }) => {
    this.setState({ id: suggestion.id });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.iptc.length === 0 && this.props.iptc.length !== 0) {
      let mapping = {};
      this.props.iptc.forEach(el => {
        mapping[el.id] = el.name;
      });
      this.setState({ iptc_mapping: mapping });
    }
    // Group results by IPTC if any
    if (prevProps.tags !== this.props.tags) {
      // Mapping is ready then group
      if (Object.keys(this.state.iptc_mapping).length !== 0) {
        let groups = {};
        this.props.tags.forEach(t => {
          if (groups[t.metadata] === undefined) {
            groups[t.metadata] = [t];
          } else {
            groups[t.metadata] = [...groups[t.metadata], t];
          }
        });
        let suggestions = [];
        Object.keys(groups).forEach(g => {
          suggestions.push({
            title: this.state.iptc_mapping[g],
            suggestions: groups[g]
          });
        });
        this.setState({ suggestions });
      }
    }
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Buscar por metadata",
      value,
      onChange: this.onChange
    };

    if (this.state.swapPage) {
      this.setState({ swapPage: false });
      return <Redirect push to="/gallery" />;
    }

    return (
      <Container className="home-search">
        <Row>
          <Col>
            <Autosuggest
              multiSection={true}
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              onSuggestionSelected={this.onSuggestionSelected}
              getSuggestionValue={suggestion => suggestion.value}
              renderSuggestion={suggestion => <span>{suggestion.value}</span>}
              renderSectionTitle={section => <strong>{section.title}</strong>}
              getSectionSuggestions={section => section.suggestions}
              inputProps={inputProps}
            />
            <Button
              type="button"
              style={{
                display: "inline-block",
                width: "10%"
              }}
              color="primary"
              onClick={this.swapPage}
              block
            >
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  tags: state.home.all_tags,
  iptc: state.home.all_iptcs,
  currentPage: state.misc.currentRoute
});

const mapActionsToProps = dispatch => ({
  onLoadGetIPTC: () => dispatch(home.iptcs()),
  setRoute: route => dispatch(misc.setCurrentRoute(route)),
  putSearch: (id, value) => dispatch(search.putSearchItem(id, value)),
  search: (query, limit) =>
    dispatch(metadata.searchMetadataByValue(query, limit))
});

export default connect(mapStateToProps, mapActionsToProps)(SearchBar);
