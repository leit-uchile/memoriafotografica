import React, { Component } from 'react';
import Photo from '../../components/Photo';
import {Button, ButtonGroup, Row, Col, Container} from 'reactstrap';

var list = [
    {
    name: "img1",
    url: "http://festivalingenieriayciencias.cl/wp-content/uploads/2014/08/Beauchef_851-5.jpg",
    tags: ["tag1","tag2"],
    // Lorem ipsum Dolor Sit Amet
    desc: "desc1",
    reason: "Foto inapropiada",
    state: "marked"
},
{
    name: "img2",
    url: "http://festivalingenieriayciencias.cl/wp-content/uploads/2014/08/Beauchef_851-5.jpg",
    tags: ["tag2","tag3"],
    // Lorem ipsum Dolor Sit Amet
    desc: "desc2",
    reason: "Foto duplicada",
    state: "marked"
},
{
    name: "img3",
    url: "http://festivalingenieriayciencias.cl/wp-content/uploads/2014/08/Beauchef_851-5.jpg",
    tags: ["tag2","tag3"],
    // Lorem ipsum Dolor Sit Amet
    desc: "desc3",
    reason: "Ninguna",
    state: "marked"
},
{
    name: "img4",
    url: "http://festivalingenieriayciencias.cl/wp-content/uploads/2014/08/Beauchef_851-5.jpg",
    tags: ["tag2","tag3"],
    // Lorem ipsum Dolor Sit Amet
    desc: "desc4",
    reason: "Foto inapropiada",
    state: "marked"
}
];

class Publish_Photos extends Component{

    constructor(props){
        super(props)
        this.getLatestElements = this.getLatestElements.bind(this)
        this.removeElement = this.removeElement.bind(this)
        this.updateElementState = this.updateElementState.bind(this)
    }

    componentWillMount(){
        this.getLatestElements()
    }

    getLatestElements(){
        // Call API
        this.setState({
            elements: list
        })
    }

    updateElementState(){
        // Send update to API

        // Update
        // remove
        this.removeElement()
        // getLatestElements

    }

    removeElement(){
        // Fake call to API
        list = list.slice(1,list.length)
        this.getLatestElements()
    }

    render(){

        var latest = []
        for (var i = 1; i < 4 && i < list.length; i++) {
            latest.push(
                <Photo name={this.state.elements[i].name} url={this.state.elements[i].url} tags={this.state.elements[i].tags} state={this.state.elements[i].state} width='150px' style={styles.latest}/>
            )
        }
        var actually = ''
        var reason = ''
        if(list.length<1) {
            actually = 'Has revisado todas las solicitudes'
        }
        else{
            actually= <Photo name={this.state.elements[0].name} url={this.state.elements[0].url} tags={this.state.elements[0].tags}
                             desc={this.state.elements[0].desc} state={this.state.elements[0].state}  style={styles.actual} height='350px'/>
            reason = <p style={{textAlign:'center'}}>Motivo del reporte: {this.state.elements[0].reason}</p>
        }
        return(
            <Container>
            <Row>
                <Col>
                    <h2>Fotografias marcadas</h2>
                </Col>
            </Row>
            <div style={{backgroundColor: 'rgb(245,245,245)', border:'1px solid rgb(156,158,159)', borderRadius:'10px', marginTop: '2em', padding: '2em 0'}}>    
                <Row>   
                    <Col md='8'>
                        {actually}
                        {reason}
                        {list.length===0 ? null: 
                            <Row>
                                <ButtonGroup style={{marginTop:'10px',marginLeft:'auto',marginRight:'auto'}}>
                                    <Button color="danger" onClick={this.updateElementState}>Eliminar</Button>
                                    <Button color="secondary" onClick={this.removeElement}>Descartar reporte</Button>
                                </ButtonGroup>
                            </Row>
                        }
                    </Col>
                    <Col md='4'>
                        {latest}
                    </Col>
                </Row>
            </div>
        </Container>
        );
    }
}
const styles={
    latest:{
        width:'150px',
        marginBottom: '20px',
        boxShadow: '5px 5px 5px #3c4145',
    },
    actual:{
        height:'350px',
        textAlign:'center'
    }
}
Publish_Photos.props = {
    gallery: list
}

export default Publish_Photos