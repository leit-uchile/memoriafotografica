import React, { useState, Fragment, useEffect } from 'react';
import Item from './Item';
import DropWrapper from './DropWrapper';
import {
  Row,
  Col,
  Card,
  CardText,
  CardTitle,
  Button,
  ButtonGroup,
  Alert,
} from 'reactstrap';
import HighLight from './HighlightWrapper';
import { connect } from 'react-redux';
import { metadata } from '../../../../actions';
import { LeitSpinner } from '../../../../components';
import { bindActionCreators } from 'redux';
import {selectMetaDataAllIptcs,
        selectMetaDataBatch} from "../../../../reducers"
import '../styles.css';

/**
 * Categorize unapproved metadata
 *
 * It will load a batch of metadata and all iptcs (categories)
 * and change by one the state of a metadata.
 * @param {*} param0
 */
const Categorize = ({
  iptcs,
  batch,
  loadIptcs,
  loadBatch,
  putMeta,
  active,
}) => {
  // Item copies
  const [items, setItems] = useState([]);
  // Ready count
  const [doneCount, setDoneCount] = useState(0);

  useEffect(() => {
    if (active) {
      loadBatch(10);
    }
  }, [loadBatch, active]);

  useEffect(() => {
    setItems(batch.results);
    setDoneCount(0);
  }, [batch]);

  // Load if none
  useEffect(() => {
    if (iptcs.length === 0) {
      loadIptcs();
    }
  }, [iptcs, loadIptcs]);

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  const getMore = () => {
    loadBatch(10);
  };

  // Drag & Drop Behavior methods
  const onDrop = (item, monitor, name, iptc_id) => {
    console.log('OnDrop', item);
    const itemCopy = { ...item, approved: true, metadata: iptc_id };
    putMeta(itemCopy);
    // Only add if the original wasnt classfied already
    if (item.approved === false) {
      setDoneCount(doneCount + 1);
    }
    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i.id !== item.id)
        .concat({ ...itemCopy, name });
      return [...newItems];
    });
  };

  // Move Item to category
  const moveItem = (dragIndex, hoverIndex) => {
    console.log('MoveItems');
    const item = items[dragIndex];
    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  var loadMoreCondition = batch.count > 10 && doneCount === items.length;

  return (
    <Fragment>
      <Row>
        <Col>
          <h2>Clasificador de metadata</h2>
          <p>
            Para refinar el sistema de b&uacute;squeda es necesario clasificar
            las palabras clave en sus categorias, si es claro que pertenecen a
            una categoria particular como por ejemplo persona.
          </p>
          <ButtonGroup>
            <Button type="button" onClick={toggle}>
              ¿Ayuda?
            </Button>
            <Button
              color={loadMoreCondition ? 'success' : 'secondary'}
              disabled={!loadMoreCondition}
              onClick={getMore}
            >
              {loadMoreCondition
                ? 'Cargar más'
                : batch.count > 10
                ? 'Para cargar mas termine de clasificar'
                : 'No hay mas datos para cargar'}
            </Button>
          </ButtonGroup>
          <br></br>
          <p>
            Al cargar mas se cargar&aacute; nueva informaci&oacute;n que
            necesite clasificaci&oacute;n.
          </p>
          {popoverOpen ? (
            <Card body>
              <CardTitle>Instrucciones</CardTitle>
              <CardText>
                Arrastra una etiqueta a su categoria y sueltala. Los resultados
                se guardaran automaticamente. Por defecto se cargar&aacute;n
                hasta 10 tags sin aprobar. Para cargar mas tags que no esten
                aprobados puede apretar sobre "cargar m&aacute;s" y continuar
                clasificando.
              </CardText>
            </Card>
          ) : null}
        </Col>
      </Row>
      {iptcs.length === 0 ? (
        <Row>
          <Col>
            <LeitSpinner />
          </Col>
        </Row>
      ) : batch.count !== 0 ? (
        <Fragment>
          <Row>
            <div key={'nochanges'} className="col-sm-6 col-md-3">
              <div className="col-wrapper no-category">
                <h2 className={'col-header'}>
                  {'Sin Categoria'.toUpperCase()} <span>(Vaciar)</span>
                </h2>
                <DropWrapper onDrop={onDrop} name={'Sin Categoria'}>
                  <HighLight>
                    {items
                      .filter((i) => !i.approved)
                      .map((i, idx) => (
                        <Item
                          key={i.id}
                          item={i}
                          index={idx}
                          moveItem={moveItem}
                          name={null}
                        />
                      ))}
                  </HighLight>
                </DropWrapper>
              </div>
            </div>
            {iptcs.slice(0, 3).map((s) => {
              return (
                <div key={s.name} className="col-sm-6 col-md-3">
                  <div className="col-wrapper">
                    <h2 className={'col-header'}>{s.name.toUpperCase()}</h2>
                    <DropWrapper onDrop={onDrop} name={s.name} iptc_id={s.id}>
                      <HighLight>
                        {items
                          .filter((i) => i.approved)
                          .filter((i) => i.name === s.name)
                          .map((i, idx) => (
                            <Item
                              key={i.id}
                              item={i}
                              index={idx}
                              moveItem={moveItem}
                              name={s}
                            />
                          ))}
                      </HighLight>
                    </DropWrapper>
                  </div>
                </div>
              );
            })}
          </Row>
          <Row>
            {iptcs.slice(4).map((s) => {
              return (
                <div key={s.name} className="col-sm-6 col-md-3">
                  <div className="col-wrapper">
                    <h2 className={'col-header'}>{s.name.toUpperCase()}</h2>
                    <DropWrapper onDrop={onDrop} name={s.name} iptc_id={s.id}>
                      <HighLight>
                        {items
                          .filter((i) => i.approved)
                          .filter((i) => i.name === s.name)
                          .map((i, idx) => (
                            <Item
                              key={i.id}
                              item={i}
                              index={idx}
                              moveItem={moveItem}
                              name={s}
                            />
                          ))}
                      </HighLight>
                    </DropWrapper>
                  </div>
                </div>
              );
            })}
          </Row>
        </Fragment>
      ) : (
        <Row>
          <Col>
            <Alert color="success">
              No hay metadata por clasificar, prueba m&aacute;s tarde.
            </Alert>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  iptcs: selectMetaDataAllIptcs(state),
  batch: selectMetaDataBatch(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      loadIptcs: metadata.iptcs,
      loadBatch: metadata.getUnapprovedMetadataBatch,
      putMeta: metadata.putMetadata,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(Categorize);
