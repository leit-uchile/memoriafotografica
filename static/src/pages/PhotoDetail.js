import React, { Component } from 'react';
import Photo from '../components/Photo';
import {connect} from "react-redux";
import {home} from "../actions";

class PhotoDetail extends Component{
    render() {
        return <div> {this.props.imageDetails} </div>
       // return <Photo name={this.props.imageDetails.name} desc={this.props.imageDetails.desc} tags={this.props.imageDetails.tags}/>
    };
}


const mapStateToProps = state => {
    return {
        imageDetails: state.home.imageDetails
    }
}
export default connect(mapStateToProps,null)(PhotoDetail);