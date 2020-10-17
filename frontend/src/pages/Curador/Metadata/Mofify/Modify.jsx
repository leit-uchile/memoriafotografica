import React, { Fragment, useEffect, useState } from "react";
import { Col, Button, Row, Input, ButtonGroup } from "reactstrap";
import MetadataList from "./MetadataList";
import HelpMessages from "./HelpMessages";
import ModifyModal from "./ModifyModal";
import { connect } from "react-redux";
import { metadata, site_misc } from "../../../../actions";
import { Pagination } from "../../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { bindActionCreators } from "redux";
import {selectMetaDataAllIptcs,
        selectMetaDataGeneralTags,
        selectSiteMiscMetaDataHelpDiscloure} from "../../../../reducers"
import "../styles.css";

/**
 * Modify metadata
 *
 * Search metadata and narrow the list
 * Select elements and make modifications
 */
const Modify = ({
  metadata,
  iptcs,
  searchMeta,
  metadataHelp,
  setHelpDisclosure,
  active,
}) => {
  const [searchState, setSearchState] = useState("");
  const [pagination, setPagination] = useState({ page: 0, page_size: 12 });
  const [dismiss, setDismiss] = useState(metadataHelp);
  const [operation, setOperation] = useState({ op: "0", open: false });
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
  }, [pagination, searchState, searchMeta, active]);

  const setPage = (p) => {
    setPagination((pag) => ({ ...pag, page: p }));
  };

  const toggleModal = () => {
    if (operation.op !== "0") {
      setOperation((o) => ({ ...o, open: !o.open }));
    }
  };

  // Force effect reload by updating the pagination state
  const doReload = (randomValue) => {
    setPagination((p) => ({ ...p, r: randomValue }));
  };

  // Check that the selected elements are on the list
  // otherwise remove the selection
  useEffect(() => {
    if (metadata && selected.length > 0) {
      let newSelected = [];
      // If they are still here keep them
      selected.forEach((element) => {
        if (metadata.results.filter((e) => e.id === element.id).length !== 0) {
          newSelected.push(element);
        }
      });
      setSelected(newSelected);
    }
    // eslint-disable-next-line
  }, [metadata]);

  return (
    <Fragment>
      <Row>
        <Col>
          <h2>Modificar Metadata</h2>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <ButtonGroup>
            <Button onClick={() => setDismiss(false)}>¿Ayuda?</Button>
            <Input
              type="select"
              name="selectOp"
              id="selectOperation"
              onChange={(e) => {
                // TODO: it crashes unexpectedly
                // when target or currentTarget is null (for some reason)
                let copy = e.currentTarget.value;
                setOperation((o) => ({ ...o, op: copy }));
              }}
            >
              <option value="0">Seleccionar operacion</option>
              <option value="Eliminar">Eliminar</option>
              <option value="Modificar Selección">Modificar</option>
              <option value="Unir/Consolidar">Unir/Consolidar</option>
            </Input>
            <Button onClick={toggleModal} disabled={operation.op === "0"}>
              Ir
            </Button>
            <ModifyModal
              op={operation.op}
              selected={selected}
              iptcs={iptcs}
              open={operation.open}
              toggle={toggleModal}
              doReload={doReload}
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
            <HelpMessages />
          </Row>
          <Row style={{ marginTop: "1em" }}>
            <Col sm={{ offset: 3, size: 6 }}>
              <Button
                onClick={() => {
                  setHelpDisclosure(true);
                  setDismiss(true);
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
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  metadata: selectMetaDataGeneralTags(state),
  iptcs: selectMetaDataAllIptcs(state),
  metadataHelp: selectSiteMiscMetaDataHelpDiscloure(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      searchMeta: metadata.searchMetadataByValueGeneral,
      setHelpDisclosure: site_misc.setMetadataHelp,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(Modify);
