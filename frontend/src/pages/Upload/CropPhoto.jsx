import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCropAlt} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { upload, alert } from "../../actions";

const dimensions = {
  standar:{
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
const onLoadValues = {
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
      modal: false,
      rotation: onLoadValues.rotation,
      crop: onLoadValues.crop
    };
    this.toggle = this.toggle.bind(this);
    this.rotate = this.rotate.bind(this);
    this.setDimension = this.setDimension.bind(this);
  }

  toggle(){
    this.setState({
      modal: !this.state.modal,
      rotation: onLoadValues.rotation,
      crop: onLoadValues.crop
    });
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
  setDimension = (dimension) =>{
    this.setState({crop: dimension})
  }

  handleOnCrop = (crop) => {
    this.setState({crop: crop})
  }

  onSave = () => {
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
      <Container>
        <Button
          onClick={this.toggle}
          style={{marginTop:'1em'}}>
          <FontAwesomeIcon icon={faCropAlt} style={{marginRight: '1em'}} />
          Recortar
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} size={'lg'}>
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
                <Button color="primary" onClick={()=>this.setDimension(dimensions.standar)}>
                  Volver al centro
                </Button>
              </Col>
              
            </Row>
          </ModalBody>
          <ModalFooter>
            <p>Importante: La foto se subirá con el tamaño indicado, no se respaldará la foto original.</p>
            <Button color="success" onClick={this.onSave}>
              Guardar edición
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Descartar
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
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
