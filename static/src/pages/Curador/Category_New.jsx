import React, { Component } from 'react';
import {connect} from 'react-redux';
import {auth, home, curador} from '../../actions';
import {Button, Form, FormGroup, Row, Col, Input, Label} from 'reactstrap';
import Category_Photos from './Category_Photos'



class Category_New extends Component{
    constructor(){
        super()
        this.state = {
            categories: [],
            category_name: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
      this.setState({category_name: event.target.value})
    }

    handleSubmit(e){
        e.preventDefault()
        this.props.createCategory(this.props.token, this.state.category_name)

    }
    render(){
        return(
            <div>
                <h2>Crear Categoria</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for='catName'>Nombre</Label>
                        <Input onChange={this.handleChange} id="catName" type="text" placeholder="Categoria Nueva" name="categoryName"></Input>
                    </FormGroup>
                    <Button color="success" type="submit">Crear</Button>
                </Form>
                <Category_Photos />
            </div>
        )
    }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
        return {field, message: state.auth.errors[field]};
    });
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
    meta: state.home.all_tags,
    cats: state.curador.categories,
  }
}
const mapActionsToProps = dispatch => {
  return {
    createCategory: (auth, data) => {
      return dispatch(curador.createCategory(auth, data));
    }
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Category_New)
