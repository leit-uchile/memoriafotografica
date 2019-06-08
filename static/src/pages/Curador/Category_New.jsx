import React, { Component } from 'react'; 
import {Button, Form, FormGroup, Row, Col, Input, Label} from 'reactstrap';
import Category_Photos from './Category_Photos'

var cates = [
    {
        name: "DCC",
        url: "https://pbs.twimg.com/profile_images/3410185634/3b7db5e3effe3286920338b1c8b2cfab_400x400.jpeg",
        tags: ["tag1","tag2"],
    }]

class Category_New extends Component{
    constructor(){
        super()
        this.setState({
            categories: cates
        })
    }
    createCategory(name,tags){
        this.cates.push([name,tags])
        console.log(this.cates)
    }
    render(){
        return(
            <div>
                <h2>Crear Categoria</h2>
                <Form>
                    <FormGroup>
                        <Label for='catName'>Nombre</Label>
                        <Input id="catName" type="text" placeholder="Categoria Nueva" name="categoryName"></Input>
                    </FormGroup>
                    <Button color="success">Crear</Button>
                </Form>
                <Category_Photos />
            </div>
        )
    }
}

Category_New.props = {
    categories: cates
}

export default Category_New