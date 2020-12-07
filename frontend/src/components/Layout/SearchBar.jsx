import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Button, Row, Col, Input } from "reactstrap";
import { Redirect } from "react-router-dom";
import { site_misc, metadata } from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Autosuggest from "react-autosuggest";
import "./searchBar.css";
import {
  selectMetaDataAllTags,
  selectMetaDataAllIptcs,
  selectSiteMiscCurrentRoute,
} from "../../reducers";
import PropTypes from "prop-types";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swapPage: false,
      id: "",
      value: "",
      suggestions: [],
      iptc_mapping: {},
      iptc_filter: 0,
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
    this.props.search(value, this.state.limit, this.state.iptc_filter);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  onSuggestionSelected = (e, { suggestion }) => {
    this.setState({ id: suggestion.id });
  };

  onChangeIPTCFilter = (e) => {
    this.setState({ iptc_filter: Number(e.currentTarget.value) });
    this.props.search(
      this.state.value,
      this.state.limit,
      Number(e.currentTarget.value)
    );
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
        // Group by IPTC
        this.props.tags.forEach((t) => {
          // Accept All
          if (this.state.iptc_filter === 0) {
            if (groups[t.metadata] === undefined) {
              groups[t.metadata] = [t];
            } else {
              groups[t.metadata] = [...groups[t.metadata], t];
            }
            // Only look at one specific
          } else if (this.state.iptc_filter === t.metadata) {
            if (groups[t.metadata] === undefined) {
              groups[t.metadata] = [t];
            } else {
              groups[t.metadata] = [...groups[t.metadata], t];
            }
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
      this.setState({ redirectLanding: false, iptc_filter: 0 });
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      return <Redirect push to="/" />;
    }

    return (
      <Container className="home-search sticky-search" fluid>
        <Row>
          <Col>
            <Container>
              <Row>
                <Col
                  md={2}
                  className={
                    this.props.stickyClass ? "logo-fadein" : "logo-fadeout"
                  }
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
                      onChange={this.onChangeIPTCFilter}
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
                      onSuggestionsFetchRequested={
                        this.onSuggestionsFetchRequested
                      }
                      onSuggestionsClearRequested={
                        this.onSuggestionsClearRequested
                      }
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
                      alwaysRenderSuggestions={this.state.iptc_filter !== 0}
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
          </Col>
        </Row>
      </Container>
    );
  }
}

SearchBar.propTypes = {
  tags: PropTypes.array.isRequired,
  iptc: PropTypes.array.isRequired,
  currentPage: PropTypes.string.isRequired,
  onLoadGetIPTC: PropTypes.func.isRequired,
  setRoute: PropTypes.func.isRequired,
  putSearch: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tags: selectMetaDataAllTags(state),
  iptc: selectMetaDataAllIptcs(state),
  currentPage: selectSiteMiscCurrentRoute(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      onLoadGetIPTC: metadata.iptcs,
      setRoute: site_misc.setCurrentRoute,
      putSearch: site_misc.putSearchItem,
      search: metadata.searchMetadataByValueSB,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(SearchBar);
