import React, { useState } from "react";
import Item from "./Item";
import DropWrapper from "./DropWrapper";
import { tags, iptcs } from "./testdata";
import {
  Container,
  Row,
  Col,
  Popover,
  PopoverBody,
  PopoverHeader,
  Button,
} from "reactstrap";
import HighLight from "./HighlightWrapper";

const Categorize = () => {
  const [items, setItems] = useState(tags);

  const onDrop = (item, monitor, name) => {
    const mapping = iptcs.find((si) => si.name === name);

    console.log("OnDrop");
    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i.id !== item.id)
        .concat({ ...item, name, icon: mapping.icon });
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
    <Container fluid className="metadata-classifier">
      <Row>
        <Col>
          <h2>Clasificador de metadata</h2>
          <p>
            Para refinar el sistema de b&uacute;squeda es necesario clasificar
            las palabras clave en sus categorias, si es claro que pertenecen a
            una categoria particular como por ejemplo persona.{" "}
            <Button id="ClasifierHelp" type="button">
              ¿Ayuda?
            </Button>
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
              guardaran automaticamente.
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
    </Container>
  );
};

export default Categorize;
