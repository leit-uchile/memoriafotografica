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

const Modify = ({ metadata, iptcs, searchMeta }) => {
  const [searchState, setSearchState] = useState("");
  const [pagination, setPagination] = useState({ page: 0, page_size: 12 });
  const [dismiss, setDismiss] = useState(false);

  useEffect(() => {
    searchMeta(searchState, pagination.page + 1, pagination.page_size);
  }, [pagination, searchState]);

  const maxPage = Math.floor(metadata.count / pagination.page_size);
  const setPage = (p) => {
    setPagination((pag) => ({ ...pag, page: p }));
  };

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
              <option value="Del">Eliminar</option>
              <option value="Mod">Modificar</option>
              <option value="Join">Unir/Consolidar</option>
            </Input>
            <Button>Ir</Button>
          </ButtonGroup>
        </Col>
        <Col className="curador-metadata-search">
          <ButtonGroup className="mr-auto">
            <Input
              type="select"
              className="leftSelect"
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
          <MetadataList
            metadata={metadata.results}
            iptcs={iptcs ? iptcs : []}
            getSelection={(v) => {
              console.log(Object.keys(v).filter((el) => el.includes("nb-")));
            }}
          />
          {metadata.count === 0 ? (
            "No hay resultados disponibles"
          ) : (
            <Pagination
              maxPage={maxPage}
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
  metadata: state.metadata.general_tags,
  iptcs: state.metadata.all_iptcs,
});

const mapActionsToProps = (dispatch) => ({
  loadMeta: () => dispatch(metadata.tags()),
  searchMeta: (search, page, page_size) =>
    dispatch(metadata.searchMetadataByValueGeneral(search, page, page_size)),
});

export default connect(mapStateToProps, mapActionsToProps)(Modify);
