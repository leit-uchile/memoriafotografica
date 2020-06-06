import React, {useState} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
            Form, FormGroup, Label, Input, Row, Col} from "reactstrap";

const ResolveModal = (props) => {
    const {
      buttonLabel,
      className,
      report,      
    } = props;
  
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [newreport, setNewreport] = useState({...report});
    const toggle = () => {setNewreport(report); setLoading(false); setModal(!modal)};
    console.log(newreport)
    return (
        <div>
          <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
          <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Resolver Reporte</ModalHeader>
            <ModalBody>    
              <Row>
                <Col xs-12 md-6>
                  <Button color="danger">Censurar Contenido</Button>
                </Col>
                <Col xs-12 md-6>
                  <Button color="success">Descartar Reporte</Button>
                </Col>
              </Row>
              {/* Si corresponde, editar contenido */}
              {newreport.type < 3 ? (
                <Col xs-12>
                  <Row>
                    Editar {newreport.type == 1 ? "Foto" : "Usuario" } :
                  </Row>
                  <Row>
                      Formulario de edición
                  </Row>
                </Col>
              ) : "" }
            </ModalBody>
            <ModalFooter>
              <Button color="primary">{!loading ? "Guardar Cambios" : "enviando..."}</Button>{' '}           
              <Button color="secondary" onClick={toggle}>Cancelar</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }


    export default ResolveModal;