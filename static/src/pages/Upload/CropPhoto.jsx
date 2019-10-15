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
import {} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { upload, alert } from "../../actions";

const dimensions = {
  default:{
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
class CropPhoto extends Component {
  constructor(Props) {
    super(Props);
    this.state = {
      modal: false,
      crop:{
        unit: '%',
        width: 50,
        height: 50,
        x: 25,
        y: 25
      }
    };
    this.toggle = this.toggle.bind(this);
    this.setDimension = this.setDimension.bind(this);
  }

  toggle(){
    this.setState({
      modal: !this.state.modal
    });
  }

  setDimension = (dimension) =>{
    this.setState({crop: dimension})
  }

  handleOnCrop = (crop) => {
    this.setState({crop: crop})
  }

  handleOnCropComplete = (crop,percentCrop) => {
    console.log(crop,percentCrop)
  }

  render() {
    var Crop = (
      <ReactCrop 
        src={this.props.src} 
        crop={this.state.crop} 
        onChange={this.handleOnCrop}
        onComplete = {this.handleOnCropComplete}
      />
    )
    return (
      <Container>
        <Button
          onClick={this.toggle}>
          Cortar foto
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} size={'lg'}>
          <ModalHeader>
            <h4 style={{fontWeight:'bold'}}>
              Cortando foto
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
                <Button color="primary" onClick={()=>this.setDimension(dimensions.full)}>
                  Tamaño completo
                </Button>
                <Button color="primary" onClick={()=>this.setDimension(dimensions.default)}>
                  Volver al centro
                </Button>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <p>La foto con su tamaño original quedará respaldada en nuestros servidores.</p>
            <Button color="success" onClick={this.toggle}>
              Guardar edición
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
