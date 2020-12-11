import React, { Fragment, useEffect, useState } from "react";
import { Container, Col, Button, Row, Input, ButtonGroup } from "reactstrap";
import MetadataList from "./MetadataList";
import HelpMessages from "../../HelpMessages";
import ModifyModal from "./ModifyModal";
import { connect } from "react-redux";
import { metadata } from "../../../../actions";
import { Pagination } from "../../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { bindActionCreators } from "redux";
import {
  selectMetaDataAllIptcs,
  selectMetaDataGeneralTags,
  selectMetaDataUpdated,
} from "../../../../reducers";
import "../styles.css";

const messages = [
  {
    action: `Modificar contenido`,
    helpMessage: `Para modificar individualmente seleccione un tag. Para cambiar la aprobación de varios tag seleccione más de uno y aprete en modificar. Para eliminar uno o varios seleccione y luego elimine.`,
  },
  {
    action: `Consolidar tags`,
    helpMessage: `Seleccione dos o más tags y aprete consolidar para que se unan en uno solo. Por ejemplo: consolidar "fcfm" de 3 fotos y "facultad de ingenieria" de 100 fotos resulta en "fcfm" con 103 fotos.`,
  },
];
/**
 * Modify metadata
 *
 * Search metadata and narrow the list
 * Select elements and make modifications
 */
const Modify = ({ metadata, iptcs, searchMeta, active, updated }) => {
  const [searchState, setSearchState] = useState("");
  const [pagination, setPagination] = useState({ page: 0, page_size: 12 });
  const [showHelp, setShowHelp] = useState(false);
  const [operation, setOperation] = useState("0");
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (active) {
      searchMeta(
        searchState,
        pagination.page + 1,
        pagination.page_size,
        "&sort=updated_at-desc"
      );
    }
  }, [pagination, searchState, searchMeta, active, updated]);

  const setPage = (p) => {
    setPagination((pag) => ({ ...pag, page: p }));
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2>Modificar Metadata</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <ButtonGroup>
            <Button onClick={() => setShowHelp(true)}>¿Ayuda?</Button>
            <Input
              type="select"
              name="selectOp"
              id="selectOperation"
              onChange={(e) => {
                setOperation(e.currentTarget.value);
              }}
            >
              <option value="0">Seleccionar operacion</option>
              <option value="Eliminar">Eliminar</option>
              <option value="Modificar Selección">Modificar</option>
              <option value="Unir/Consolidar">Unir/Consolidar</option>
            </Input>
            <Button
              onClick={() => setModal(!modal)}
              disabled={operation === "0" || selected.length === 0}
            >
              Ir
            </Button>
            <ModifyModal
              op={operation}
              selected={selected}
              iptcs={iptcs}
              open={modal}
              toggle={() => setModal(!modal)}
            />
          </ButtonGroup>
        </Col>
        <Col sm={6}>
          <ButtonGroup className="mr-auto">
            <Input
              type="select"
              className="btn-secondary leftSelect"
              onChange={(e) =>
                setPagination({ page: 0, page_size: Number(e.target.value) })
              }
            >
              <option value="12">12 por p&aacute;gina</option>
              <option value="25">25 por p&aacute;gina</option>
              <option value="50">50 por p&aacute;gina</option>
            </Input>
            <Input
              type="text"
              name="search-curador"
              placeholder="Filtrar por nombre"
              value={searchState}
              onChange={(e) => {
                setPagination((p) => ({ ...p, page: 0 }));
                setSearchState(e.target.value);
              }}
            />
            <Button color="primary">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
      {showHelp ? (
        <Fragment>
          <Row style={{ marginTop: "1em" }}>
            <HelpMessages messages={messages} />
          </Row>
          <Row style={{ marginTop: "1em" }}>
            <Col sm={{ offset: 3, size: 6 }}>
              <Button
                onClick={() => {
                  setShowHelp(false);
                }}
                block
              >
                Ya entend&iacute;
              </Button>
            </Col>
          </Row>
        </Fragment>
      ) : null}
      <Row style={{ marginTop: "1em" }}>
        <Col>
          <MetadataList
            metadata={metadata.results}
            iptcs={iptcs ? iptcs : []}
            getSelection={(v) => {
              var keys = Object.keys(v)
                .filter((el) => el.includes("nb-"))
                .map((el) => el.substr(3));
              setSelected(keys.map((el) => metadata.results[Number(el)]));
            }}
            update={updated}
          />
          {metadata.count === 0 ? (
            "No hay resultados disponibles"
          ) : (
            <Pagination
              count={metadata.count}
              page_size={pagination.page_size}
              page={pagination.page}
              setStatePage={setPage}
              size="md"
              label="metadata-pagination"
              displayFirst
              displayLast
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  metadata: selectMetaDataGeneralTags(state),
  iptcs: selectMetaDataAllIptcs(state),
  updated: selectMetaDataUpdated(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      searchMeta: metadata.searchMetadataByValueGeneral,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(Modify);
