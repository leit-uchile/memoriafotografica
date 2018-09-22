import React, {Component} from 'react';
import {upload} from '../actions';
import {connect} from 'react-redux';

class Upload extends Component{
    constructor(Props){
        super(Props);
        this.state = {
            errors: null,
            name: "",
            description: "",
            image: ""
        };
    }

   updatename = a => {this.setState({name : a.target.value})}
   updatedescription = a =>{this.setState({description : a.target.value})}
   updateimage = a =>
    {
       console.log(a.target.files[0])
       var im = a.target.files[0];
       this.setState({image: im})
    }

    onSubmit = a => {
        a.preventDefault();
        this.props.upload(this.state.name,this.state.description,this.state.image);
    }
    
    anError(){
        console.log("Llame error");
        this.setState({errors: "Un error"});
    }

    render() {
        var message;
        if (this.state.errors != null){
            message = <div>{this.state.errors}</div>
        } else {
            message = null;
        }

        return(
        <div className='container'>
            {message}
            <form enctype="multipart/form-data" method="POST" onSubmit={this.onSubmit}>

                <h1 className='my-4'>
                    Título
                    <small><input type="text" onChange={this.updatename} name="name"required placeholder="Ingrese el título de su imagen"/></small>
                </h1>
                <div className='row'>
                    <div className='col-md-8'>
                        <img className='img-fluid' style={{height: '500px', width: 'auto'}} src='http://www.lebenshilfe-sz.de/wp-content/uploads/2017/01/noimg.jpg'/>
                        <input type="file"  name="photo" onChange={this.updateimage} accept='.jpg, .png, .jpeg' required />
                    </div>
                    <div className='col-md-4'>
                        <h3 className='my-3'>Descripción</h3>
                            <textarea name="description" onChange={this.updatedescription} placeholder='Ingrese la descripcion de su imagen'> </textarea>
                        <h3 className='my-3'>Etiquetas</h3>
                        <input type="submit" value="SEND" className="submit" />
                        <button onClick={this.anError.bind(this)}>Error</button>



                    </div>
                </div>
            </form>  

        </div>
         )
    }
}

const mapStateToProps = state => {
    return {
        errors : null
    };
}

const mapActionsToProps = dispatch => {
    return {
        upload : (name,desc,im) => {
            return dispatch(upload.uploadImage(name,desc,im));
        }
    }
}

export default connect(mapStateToProps,mapActionsToProps)(Upload);