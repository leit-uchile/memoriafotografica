import React, {Component} from 'react';
import {upload} from '../../actions';
import {connect} from 'react-redux';

class UploadPhoto extends Component{
    constructor(Props){
        super();
        this.props = Props
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

    render() {
        return(
        <div className='container'>
            
        </div>
         )
    }
}