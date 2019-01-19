import React, {Component} from 'react';
import {Upload,Button,Dialog} from 'element-react'
import "element-theme-default"

class UploadPhoto extends Component{
  constructor(props) {
    super(props);
  
    this.state = {
      dialogImageUrl: '',
      dialogVisible: false,
    };
  }
  
  render() {
    const { dialogImageUrl, dialogVisible } = this.state;
    return (
      <div class="container" style={{backgroundColor: "rgb(245,245,245)", borderRadius: "1em", marginTop: "2em", padding: "2em"}}>
        <h1>
          Sube tus fotos
        </h1>
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          onPreview={file => this.handlePictureCardPreview(file)}
          onRemove={(file, fileList) => this.handleRemove(file, fileList)}
        >
          <i className="el-icon-plus"></i>
        </Upload>
        <Dialog
          visible={dialogVisible}
          size="tiny"
          onCancel={() => this.setState({ dialogVisible: false })}
        >
          <img width="100%" src={dialogImageUrl} alt="" />
        </Dialog>
        <Button style={{ marginLeft: '10px'}} size="small" type="primary" onClick={this.props.goBack}>Volver</Button>
        <Button style={{ marginLeft: '10px'}} size="medium" type="success" onClick={() => this.submitUpload()}>Continuar</Button>
      </div>
    )
  }
  
  handleRemove(file, fileList) {
    console.log(file, fileList);
  }
  
  handlePictureCardPreview(file) {
    this.setState({
      dialogImageUrl: file.url,
      dialogVisible: true,
    })
  }
}

export default UploadPhoto