import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup,
  FormText
} from "reactstrap";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { base64StringtoFile, extractImageFileExtensionFromBase64 } from './ResuableUtils'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVectorSquare } from "@fortawesome/free-solid-svg-icons";

const dimensions = {
  aspect4_3: {
    aspect: 4 / 3
  },
  aspect16_9: {
    aspect: 16 / 9
  },
  default:{
    crop: {
      aspect: 1/1
    },
    rotation: 0
  }
}

class CropPhoto extends Component {
  constructor(Props) {
    super(Props);
    this.state = {
      modal: this.props.isOpen, // modal de CropPhoto
      imgSrc: this.props.src, // imagen perfil, objeto
      crop: dimensions.default.crop, // selector de linea discontinua
      rotation: dimensions.default.rotation // rotacion de la imagen
    };
    this.toggle = this.toggle.bind(this);
    this.rotate = this.rotate.bind(this);
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

  handleOnCropChange = (crop) => {
    this.setState({crop: crop})
  }

  /**
 * @param {HTMLImageElement} image - Image File Object
 * @param {Object} crop - crop Object
 * @param {String} fileName - Name of the returned file in Promise
 */

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );  
    // As Base64 string
    const base64Image = canvas.toDataURL();
    let finalName = fileName + '.' + extractImageFileExtensionFromBase64(base64Image)
    return base64StringtoFile(base64Image, finalName)
  }

  onSave = () => {
    let image = new Image()
    image.src = this.state.imgSrc
    let newAvatar = this.getCroppedImg(image, this.state.crop, 'avatarCropped')
    this.props.save(newAvatar)
    this.toggle()
  }

  render() {
    const { imgSrc, rotation } =  this.state;
    var Crop = (
      <ReactCrop 
        src={imgSrc} 
        imageStyle={{transform: `rotate(${rotation}deg)`}}
        crop={this.state.crop} 
        onChange={this.handleOnCropChange}
      />
    )
    return (
        <Modal isOpen={this.state.modal} size={'lg'} className='user-modal'>
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
                <h4> <FontAwesomeIcon icon={faVectorSquare}/> {" "} Dimensiones</h4>
                  <ButtonGroup>
                  <Button 
                  color={this.state.crop.aspect===dimensions.default.crop.aspect ?"primary" :"secondary"}  
                  onClick={()=>this.handleOnCropChange(dimensions.default.crop)}
                  >
                    Default
                  </Button>
                  <Button 
                  color={this.state.crop.aspect===dimensions.aspect4_3.aspect ?"primary" :"secondary"} 
                  onClick={()=>this.handleOnCropChange(dimensions.aspect4_3)}
                  >
                    4:3
                  </Button>
                  <Button 
                  color={this.state.crop.aspect===dimensions.aspect16_9.aspect ?"primary" :"secondary"} 
                  onClick={()=>this.handleOnCropChange(dimensions.aspect16_9)}
                  >
                    16:9
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <FormText color="muted">
              Este cambio es irreversible
            </FormText>
            <ButtonGroup>
              <Button color="secondary" onClick={this.toggle}>
                Descartar
              </Button>
              <Button color="success" onClick={this.onSave}>
                Cortar
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </Modal>
    );
  }
}

export default CropPhoto;
