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
        <div>
            {message}
            <form enctype="multipart/form-data" method="POST" onSubmit={this.onSubmit}>
                    <input type="file"  name="photo" onChange={this.updateimage} accept='.jpg, .png, .jpeg' required />
                <label>
                    Título
                    <input type="text" onChange={this.updatename} name="name"required/>
                </label>

                <label>
                    Descripción
                     <textarea name="description" onChange={this.updatedescription}> </textarea>
                </label>    
                
                <label>
                    Envia
                    <input type="submit" value="SEND" className="submit" /> 
                </label>
            </form>  
            <button onClick={this.anError.bind(this)}>Error</button>
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