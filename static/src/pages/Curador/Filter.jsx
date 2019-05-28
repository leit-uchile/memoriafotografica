import React, { Component } from 'react';
import Photo from '../../components/Photo';
import {Row, Col, Button, Container, ButtonGroup} from 'reactstrap';

var filtrar = [
    {
        id: 1,
        name: "img1",
        url: "https://i.blogs.es/bd5388/banter-snaps-387953-unsplash/1366_2000.jpg",
        tags: ["tag1","tag2"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc1",
    },
    {
        id: 2,
        name: "img2",
        url: "http://ingenieria.uchile.cl/u/ImageServlet?idDocumento=106702&indice=0&nocch=20150908170639.0",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc2",
    },
    {
        id: 3,
        name: "img3",
        url: "http://festivalingenieriayciencias.cl/wp-content/uploads/2014/08/Beauchef_851-5.jpg",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc3",
    },
    {
        id: 4,
        name: "img4",
        url: "https://upload.wikimedia.org/wikipedia/commons/7/79/Beauchef_851.jpg",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc4",
    },
    {
        id: 5,
        name: "img5",
        url: "http://festivalingenieriayciencias.cl/wp-content/uploads/2014/08/Beauchef_851-7.jpg",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc5",
    }
];

class Filter extends Component{
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
            list: [...filtrar]
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
        const largo = this.state.list.length
        var list = [...this.state.list.slice(1,largo)]
        console.log(list)
        this.setState({
            list: [...list]
        })
        //this.getLatestElements()
    }

    render(){
        var latest = []
        for (var i = 1; i < 6 && i < this.state.list.length; i++) {
            latest.push(
                <Photo key={this.state.list[i].id} name={this.state.list[i].name}
                url={this.state.list[i].url} tags={this.state.list[i].tags} state={this.state.list[i].state} width='150px' style={styles.latest}/>
            )
        }
        latest = latest.slice(0,3).map(el=>el);
        var actual;
        if(this.state.list.length<1) {
            actual = 'Has filtrado todas las solicitudes'
        }else{
            actual= <Photo key={this.state.list[0].id} name={this.state.list[0].name} url={this.state.list[0].url}
                        tags={this.state.list[0].tags} desc={this.state.list[0].desc} state={this.state.list[0].state} style={styles.actual} height='350px'/>
        }
        return(
        <Container>
            <Row>
                <Col>
                    <h2>Filtrar fotograf&iacute;as</h2>
                </Col>
            </Row>
            <div style={{backgroundColor: 'rgb(245,245,245)', border:'1px solid rgb(156,158,159)', borderRadius:'10px', marginTop: '2em', padding: '2em 0'}}>    
                <Row>   
                    <Col md='8'>
                        {actual}
                        {this.state.list.length===0 ? null: 
                            <Row>
                                <ButtonGroup style={{marginTop:'10px',marginLeft:'auto',marginRight:'auto'}}>
                                    <Button onClick={this.updateElementState}>Aceptar</Button>
                                    <Button color="secondary" onClick={this.removeElement}>Rechazar</Button>
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

export default Filter