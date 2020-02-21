import React, { Component, Fragment } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  DropdownItem
} from "reactstrap";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCropAlt} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

const dimensions = { // dimensiones disponibles para el usuario
  standard:{
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25
  },
  full:{
    x:0,
    y:0,
    unit:'%',
    width:100,
    height:100
  }
}
const onLoadValues = { // dimensiones por default al cargar
  crop: {
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25
  },
  rotation: 0
}

class CropPhoto extends Component {
  constructor(Props) {
    super(Props);
    this.state = {
      modal: this.props.modal, // modal de CropPhoto
      crop: onLoadValues.crop, // selector de linea discontinua
      rotation: onLoadValues.rotation // rotacion de la imagen
    };
    this.toggle = this.toggle.bind(this);
    this.rotate = this.rotate.bind(this);
    this.setDimension = this.setDimension.bind(this);
  }

  toggle(){
    this.setState({
      modal: !this.state.modal // cierra el modal
    });
    this.props.handleToggle() // abre y cierra el modal independiente de DropdownButton
  }

  rotate(){
    let newRotation = this.state.rotation - 90;
    if(newRotation <= -360){
      newRotation = 360;
    }
    this.setState({
      rotation: newRotation,
    })
  }
  setDimension = (dimension) =>{ // cambia el tamaño del crop a una dimension especifica
    this.setState({crop: dimension})
  }

  handleOnCrop = (crop) => { // actualiza el tamaño y posicion del crop segun el mouse
    this.setState({crop: crop})
  }

  onSave = () => { // guarda el estado del crop y la rotacion de la foto en los valores de carga para una nueva edicion posible
    onLoadValues.crop = this.state.crop
    onLoadValues.rotation = this.state.rotation
    this.toggle()
  }

  render() {
    const { rotation } =  this.state;
    var Crop = (
      <ReactCrop 
        src={this.props.src} 
        imageStyle={{transform: `rotate(${rotation}deg)`}}
        crop={this.state.crop} 
        onChange={this.handleOnCrop}
      />
    )
    return (
      // <Fragment>
      //   <Button
      //   onClick={this.toggle}
      //   className="dropdown-item">
      //     Editar foto
      //   </Button>
        <Modal isOpen={this.state.modal} size={'lg'}>
          <ModalHeader>
            <h4 style={{fontWeight:'bold'}}>
              Recortando foto
            </h4>
          </ModalHeader>
          <ModalBody style={{textAlign:'center'}}>
            <Row>
              <Col>
                {Crop}
              </Col>
            </Row>
            <Row>
              <Col>
                <Button color="primary" onClick={this.rotate}>
                  Rotar
                </Button>
              </Col>
              <Col>
                <Button color="primary" onClick={()=>this.setDimension(dimensions.full)}>
                  Tamaño completo
                </Button>
                <Button color="primary" onClick={()=>this.setDimension(dimensions.standard)}>
                  Volver al centro
                </Button>
              </Col>
              
            </Row>
          </ModalBody>
          <ModalFooter>
            <p>Importante: Una vez guardado los cambios no se respaldará la foto original.</p>
            <Button color="success" onClick={this.onSave}>
              Conservar
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Descartar
            </Button>
          </ModalFooter>
        </Modal>
      
    );
  }
}

const styles = {
  dropzone: {
    backgroundColor: "#f7f7f7",
    textAlign: "center",
    padding: "15px",
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    border: "1px dashed rgb(156,158,159)",
    boxShadow: "2px 2px 4px rgb(156,158,159)"
  }
};

const mapStateToProps = state => ({
  
});

const mapActionsToProps = dispatch => ({
  
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CropPhoto);
