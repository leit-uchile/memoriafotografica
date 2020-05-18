import React, { useState, Fragment } from "react";
import Item from "./Item";
import DropWrapper from "./DropWrapper";
import {
  Container,
  Row,
  Col,
  Popover,
  PopoverBody,
  PopoverHeader,
  Button,
  ButtonGroup,
} from "reactstrap";
import HighLight from "./HighlightWrapper";
import { tags, iptcs } from "./testdata";

const Categorize = ({ meta, iptcs }) => {
  const [items, setItems] = useState(meta);

  const onDrop = (item, monitor, name) => {
    const mapping = iptcs.find((si) => si.name === name);

    console.log("OnDrop", item);
    const itemCopy = { ...item, approved: true };
    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i.id !== item.id)
        .concat({ ...itemCopy, name, icon: mapping.icon });
      return [...newItems];
    });
  };

  const moveItem = (dragIndex, hoverIndex) => {
    console.log("MoveItems");
    const item = items[dragIndex];
    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <Fragment>
      <Row>
        <Col>
          <h2>Clasificador de metadata</h2>
          <p>
            Para refinar el sistema de b&uacute;squeda es necesario clasificar
            las palabras clave en sus categorias, si es claro que pertenecen a
            una categoria particular como por ejemplo persona. <br></br>
            <ButtonGroup>
              <Button id="ClasifierHelp" type="button">
                ¿Ayuda?
              </Button>
              <Button color="success">Cargar m&aacute;s</Button>
            </ButtonGroup>
            <br></br>
            Al cargar mas se cargar&aacute; nueva informaci&oacute;n que
            necesite clasificaci&oacute;n.
          </p>
          <Popover
            placement="auto-end"
            isOpen={popoverOpen}
            target="ClasifierHelp"
            toggle={toggle}
          >
            <PopoverHeader>Instrucciones</PopoverHeader>
            <PopoverBody>
              Arrastra una etiqueta a su categoria y sueltala. Los resultados se
              guardaran automaticamente. Por defecto se cargar&aacute;n hasta 10
              tags sin aprobar. Para cargar mas tags que no esten aprobados
              puede apretar sobre "cargar m&aacute;s" y continuar clasificando.
            </PopoverBody>
          </Popover>
        </Col>
      </Row>
      <Row>
        {iptcs.slice(0, 4).map((s) => {
          return (
            <div key={s.name} className="col-md-3">
              <div className="col-wrapper">
                <h2 className={"col-header"}>{s.name.toUpperCase()}</h2>
                <DropWrapper onDrop={onDrop} name={s.name}>
                  <HighLight>
                    {items
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
        {iptcs.slice(5).map((s) => {
          return (
            <div key={s.name} className="col-md-3">
              <div className="col-wrapper">
                <h2 className={"col-header"}>{s.name.toUpperCase()}</h2>
                <DropWrapper onDrop={onDrop} name={s.name}>
                  <HighLight>
                    {items
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
  );
};

Categorize.defaultProps = {
  meta: tags,
  iptcs: iptcs,
};

export default Categorize;
