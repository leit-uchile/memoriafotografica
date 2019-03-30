import React, {Component} from 'react';
import {Upload,Button,Dialog} from 'element-react'
import "element-theme-default"

class UploadPhoto extends Component{
  constructor(Props) {
    super();
    this.props = Props
    this.state = {
      photosList: Array(
      )
    }
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.savePhotos(this.state.photosList)
}
  
  render() {
    return (
      <Upload
        className="upload-demo"
        action="//jsonplaceholder.typicode.com/posts/"
        drag = "true"
        onPreview={file => this.handlePreview(file)}
        onRemove={(file, fileList) => this.handleRemove(file, fileList)}
        onSuccess={(file,fileList)=> this.handleUpload(file,fileList)}
        listType="picture"
        tip={<div className="el-upload__tip">solo archivos jpg/png con peso menor a 500kb</div>}
      >
        <Button size="small" type="primary">Examinar</Button>
        <Button size="small" type="success" onClick={this.onSubmit}>Continuar y editar fotos</Button>
      </Upload>
    )
  }

  handleRemove(file, fileList) {
    console.log(file, fileList);
  }

  handlePreview(file) {
    console.log(file);
  }

  handleUpload(file,fileList){
    this.setState({photosList: [...this.state.photosList , fileList ]}) ;
    console.log(this.state.photosList);
  }

}

export default UploadPhoto