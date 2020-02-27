import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { connect } from "react-redux";
// import {image64toCanvasRef} from "./ResuableUtils"

const dimensions = { // dimensiones disponibles para el usuario
  aspect4_3: {
    unit: '%',
    aspect: 4 / 3,
    width: 100
  },
  aspect16_9: {
    unit: '%',
    aspect: 16 / 9,
    width: 100
  },
  standard:{
    unit: '%',
    x: 25,
    y: 25,
    width: 50,
    height: 50    
  }
}
const onLoadValues = { // dimensiones por default al cargar
  crop: {
    unit: '%',
    width: 50,
    height: 50,
    x : 0,
    y: 0
  },
  rotation: 0
}

class CropPhoto extends Component {
  constructor(Props) {
    super(Props);
    this.imageRef = {};
    // this.imagePreviewCanvasRef = React.createRef()
    this.state = {
      modal: this.props.isOpen, // modal de CropPhoto
      imgSrc: this.props.src, // imagen perfil,
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

  onCropLoad = (image,load) =>{
    this.imageRef = image
  }
  
  onCropChange = (crop) => { // actualiza el tamaño y posicion del crop segun el mouse
    this.setState({crop: crop})
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

  getCroppedImg(crop, fileName) {
    let image = this.imageRef; //intentar con this.state.imgSrc
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = Math.ceil(crop.width*scaleX);
    canvas.height = Math.ceil(crop.height*scaleY);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width*scaleX,
      crop.height*scaleY,
    );
    // As Base64 string
    //  const base64Image = canvas.toDataURL('image/jpeg');
    //  console.log(base64Image)
  
    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        blob.name = fileName;
        resolve(blob);
      }, 'image/jpeg',1);
    });

    // As a blob, another solution
  //   return new Promise((resolve, reject) => {
  //     resolve(canvas.toDataURL('image/png'));
  //   });
 }

  onSave = () => { // guarda el estado del crop y la rotacion de la foto en los valores de carga para una nueva edicion. Permite descartar ultimo cambio
    onLoadValues.crop = this.state.crop
    onLoadValues.rotation = this.state.rotation
    this.getCroppedImg(onLoadValues.crop, 'previewNewAvatar')
    // this.props.save(poner aqui la foto obtenida tras el corte)
    this.toggle()
  }

  onDefault = () => {
    this.setState({
      crop: {
        unit:'%',
        x:0,
        y:0,
        width:0,
        height:0
      },
      rotation: 0
    })
  }

  render() {
    const { imgSrc, rotation } =  this.state;
    var Crop = (
      <ReactCrop 
        src={this.state.imgSrc} 
        imageStyle={{transform: `rotate(${rotation}deg)`}}
        crop={this.state.crop} 
        onImageLoaded={this.onCropLoad}
        onChange={this.onCropChange}
      />
    )
    return (
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
            {/* <Row>
              <Col>
              <canvas ref={this.imagePreviewCanvasRef}></canvas>
              </Col>
            </Row> */}
            <Row>
              <Col>
                <Button color="primary" onClick={this.rotate}>
                  Rotar
                </Button>
              </Col>
              <Col>
                <h3>Dimensiones</h3>
                <Button color="primary" onClick={()=>this.setDimension(dimensions.aspect4_3)}>
                  4:3
                </Button>
                <Button color="primary" onClick={()=>this.setDimension(dimensions.aspect16_9)}>
                  16:9
                </Button>
                <Button color="primary" onClick={()=>this.setDimension(dimensions.standard)}>
                  Libre
                </Button>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <p>Deberás guardar los cambios para que la foto se actualice</p>
            <Button color="success" onClick={this.onSave}>
              Seleccionar
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Descartar
            </Button>
            <Button color="secondary" onClick={this.onDefault}>
              Original
            </Button>
          </ModalFooter>
        </Modal>
    );
  }
}

const mapStateToProps = state => ({
  
});

const mapActionsToProps = dispatch => ({
  
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CropPhoto);
