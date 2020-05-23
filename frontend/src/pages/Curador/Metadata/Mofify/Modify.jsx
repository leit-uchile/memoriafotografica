import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  Col,
  CardText,
  CardTitle,
  Button,
  Row,
  Input,
  ButtonGroup,
} from "reactstrap";
import MetadataList from "./MetadataList";
import { connect } from "react-redux";
import { metadata } from "../../../../actions";
import { Pagination } from "../../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Autosuggest from "react-autosuggest";

const Modify = ({ metadata, loadMeta, iptcs }) => {
  const [searchState, setSearchState] = useState({
    value: "",
    suggestions: [],
  });

  const inputProps = {
    placeholder: "Buscar metadata por nombre",
    value: searchState.value,
    onChange: (e, { newValue }) => setSearchState((s) => ({ value: newValue })),
  };

  const [pagination, setPagination] = useState({ page: 0, page_size: 20 });

  useEffect(() => {
    loadMeta();
  }, []);

  const [dismiss, setDismiss] = useState(false);

  return (
    <Fragment>
      <Row>
        <Col>
          <h2>Modificar Metadata</h2>
        </Col>
      </Row>
      <Row>
        <Col className="curador-metadata-search">
          <ButtonGroup>
            <Button onClick={() => setDismiss(false)}>¿Ayuda?</Button>
            <Input type="select" name="selectSingle" id="selectOperation">
              <option value="0">Seleccionar operacion</option>
              <option value="Eliminar">Eliminar</option>
              <option value="Modificar">Modificar</option>
              <option value="Unir">Unir</option>
            </Input>
            <Button>Ir</Button>
          </ButtonGroup>
        </Col>
        <Col className="curador-metadata-search">
          <ButtonGroup className="mr-auto">
            <Autosuggest
              multiSection={false}
              suggestions={searchState.suggestions}
              onSuggestionsFetchRequested={() => {}} //this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={() => {}} //this.onSuggestionsClearRequested}
              onSuggestionSelected={() => {}} //this.onSuggestionSelected}
              getSuggestionValue={(suggestion) => suggestion.value}
              renderSuggestion={(suggestion) => <span>{suggestion.value}</span>}
              renderSectionTitle={(section) => <strong>{section.title}</strong>}
              getSectionSuggestions={(section) => section.suggestions}
              inputProps={inputProps}
            />
            <Button
              type="button"
              color="primary"
              onClick={() => {}} //this.swapPage}
            >
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      {!dismiss ? (
        <Fragment>
          <Row style={{ marginTop: "1em" }}>
            <Col sm="6">
              <Card body>
                <CardTitle>Modificar contenido</CardTitle>
                <CardText>
                  Para modificar individualmente seleccione un tag. Para cambiar
                  la aprobaci&oacute;n de varios tag seleccione mas de uno y
                  aprete en modificar. Para eliminar uno o varios seleccione y
                  luego elimine.
                </CardText>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle>Consolidar tags</CardTitle>
                <CardText>
                  Seleccione dos o mas tags y aprete consolidar para que se unan
                  en uno solo. Por ejemplo: consolidar "fcfm" de 3 fotos y
                  "facultad de ingenieria" de 100 fotos resulta en "fcfm" con
                  103 fotos.
                </CardText>
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: "1em" }}>
            <Col sm={{ offset: 3, size: 6 }}>
              <Button onClick={() => setDismiss(true)} block>
                Ya entend&iacute;
              </Button>
            </Col>
          </Row>
        </Fragment>
      ) : null}
      <Row style={{ marginTop: "1em" }}>
        <Col>
          <MetadataList metadata={metadata} iptcs={iptcs ? iptcs : []} />
          <Pagination
            maxPage={4}
            page={pagination.page}
            setStatePage={setPagination}
            size="md"
            label="metadata-pagination"
            displayFirst
            displayLast
          />
        </Col>
      </Row>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  metadata: state.metadata.all_tags,
  iptcs: state.metadata.all_iptcs,
});

const mapActionsToProps = (dispatch) => ({
  loadMeta: () => dispatch(metadata.tags()),
});

export default connect(mapStateToProps, mapActionsToProps)(Modify);
