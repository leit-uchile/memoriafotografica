import React, { Fragment } from "react";
import { Col, Card, CardTitle, CardText } from "reactstrap";

const HelpMessages = () => (
  <Fragment>
    <Col sm="6">
      <Card body>
        <CardTitle>Modificar contenido</CardTitle>
        <CardText>
          Para modificar individualmente seleccione un tag. Para cambiar la
          aprobaci&oacute;n de varios tag seleccione mas de uno y aprete en
          modificar. Para eliminar uno o varios seleccione y luego elimine.
        </CardText>
      </Card>
    </Col>
    <Col sm="6">
      <Card body>
        <CardTitle>Consolidar tags</CardTitle>
        <CardText>
          Seleccione dos o mas tags y aprete consolidar para que se unan en uno
          solo. Por ejemplo: consolidar "fcfm" de 3 fotos y "facultad de
          ingenieria" de 100 fotos resulta en "fcfm" con 103 fotos.
        </CardText>
      </Card>
    </Col>
  </Fragment>
);

export default HelpMessages;
