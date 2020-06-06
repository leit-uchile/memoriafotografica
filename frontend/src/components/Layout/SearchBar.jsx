import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Button, Row, Col, Input } from "reactstrap";
import { Redirect } from "react-router-dom";
import { site_misc, metadata } from "../../actions";
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
      limit: 10,
      redirectLanding: false,
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
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.search(value, this.state.limit);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  onSuggestionSelected = (e, { suggestion }) => {
    this.setState({ id: suggestion.id });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.iptc.length === 0 && this.props.iptc.length !== 0) {
      let mapping = {};
      this.props.iptc.forEach((el) => {
        mapping[el.id] = el.name;
      });
      this.setState({ iptc_mapping: mapping });
    }
    // Group results by IPTC if any
    if (prevProps.tags !== this.props.tags) {
      // Mapping is ready then group
      if (Object.keys(this.state.iptc_mapping).length !== 0) {
        let groups = {};
        this.props.tags.forEach((t) => {
          if (groups[t.metadata] === undefined) {
            groups[t.metadata] = [t];
          } else {
            groups[t.metadata] = [...groups[t.metadata], t];
          }
        });
        let suggestions = [];
        Object.keys(groups).forEach((g) => {
          suggestions.push({
            title: this.state.iptc_mapping[g],
            suggestions: groups[g],
          });
        });
        this.setState({ suggestions });
      }
    }
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Buscar ...",
      value,
      onChange: this.onChange,
    };

    if (this.state.swapPage) {
      this.setState({ swapPage: false });
      return <Redirect push to="/gallery" />;
    }

    if (this.state.redirectLanding) {
      this.setState({ redirectLanding: false });
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      return <Redirect push to="/" />;
    }

    return (
      <Container className={"home-search sticky-search"} fluid>
        <Row>
          <Col
            md={2}
            className={this.props.stickyClass ? "logo-fadein" : "logo-fadeout"}
            onClick={() => this.setState({ redirectLanding: true })}
          ></Col>
          <Col
            md={{ size: 10 }}
            className={
              this.props.stickyClass ? "col-fadein stretch" : "col-fadein"
            }
          >
            <div style={{ margin: "0 auto" }} className="searchFitter">
              <Input
                type="select"
                name="selectMulti"
                id="exampleSelectMulti"
                className="search-iptc-selector"
              >
                <option value="0">Todo el sitio</option>
                {this.props.iptc.map((iptc, k) => (
                  <option key={k} value={iptc.id}>
                    {iptc.name}
                  </option>
                ))}
              </Input>
              <Autosuggest
                multiSection={true}
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                onSuggestionSelected={this.onSuggestionSelected}
                getSuggestionValue={(suggestion) => suggestion.value}
                renderSuggestion={(suggestion) => (
                  <span>{suggestion.value}</span>
                )}
                renderSectionTitle={(section) => (
                  <strong>{section.title}</strong>
                )}
                getSectionSuggestions={(section) => section.suggestions}
                inputProps={inputProps}
              />
              <Button
                type="button"
                color="primary"
                onClick={this.swapPage}
                block
                className="search-button"
              >
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  tags: state.metadata.all_tags,
  iptc: state.metadata.all_iptcs,
  currentPage: state.site_misc.currentRoute,
});

const mapActionsToProps = (dispatch) => ({
  onLoadGetIPTC: () => dispatch(metadata.iptcs()),
  setRoute: (route) => dispatch(site_misc.setCurrentRoute(route)),
  putSearch: (id, value) => dispatch(site_misc.putSearchItem(id, value)),
  search: (query, limit) =>
    dispatch(metadata.searchMetadataByValueSB(query, limit)),
});

export default connect(mapStateToProps, mapActionsToProps)(SearchBar);
