import React, { Component } from 'react';
import Photo from '../../components/Photo';
import {Row, Col, Button, Container, ButtonGroup} from 'reactstrap';

var filtrar = [
    {
        id: 1,
        name: "img1",
        url: "https://www.ssbwiki.com/images/thumb/2/2b/Isabelle_SSBU.png/250px-Isabelle_SSBU.png",
        tags: ["tag1","tag2"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc1",
    },
    {
        id: 2,
        name: "img2",
        url: "https://vignette.wikia.nocookie.net/fantendo/images/b/b6/Waluigi_Artwork_-_Super_Smash_Bros._Brawl.png/revision/latest?cb=20160503203605",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc2",
    },
    {
        id: 3,
        name: "img3",
        url: "https://vignette.wikia.nocookie.net/fantendo/images/b/b6/Waluigi_Artwork_-_Super_Smash_Bros._Brawl.png/revision/latest?cb=20160503203605",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc3",
    },
    {
        id: 4,
        name: "img4",
        url: "https://vignette.wikia.nocookie.net/fantendo/images/b/b6/Waluigi_Artwork_-_Super_Smash_Bros._Brawl.png/revision/latest?cb=20160503203605",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc4",
    },
    {
        id: 5,
        name: "img5",
        url: "https://vignette.wikia.nocookie.net/fantendo/images/b/b6/Waluigi_Artwork_-_Super_Smash_Bros._Brawl.png/revision/latest?cb=20160503203605",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc5",
    },
    {
        id: 6,
        name: "img6",
        url: "https://vignette.wikia.nocookie.net/fantendo/images/b/b6/Waluigi_Artwork_-_Super_Smash_Bros._Brawl.png/revision/latest?cb=20160503203605",
        tags: ["tag2","tag3"],
        // Lorem ipsum Dolor Sit Amet
        desc: "desc6",
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
                url={this.state.list[i].url} tags={this.state.list[i].tags} state={this.state.list[i].state} height="100px"/>
            )
        }
        var actual = ''
        if(this.state.list.length<1) {
            actual = 'Has filtrado todas las solicitudes'
        }else{
            actual= <Photo key={this.state.list[0].id} name={this.state.list[0].name} url={this.state.list[0].url}
                        tags={this.state.list[0].tags} desc={this.state.list[0].desc} state={this.state.list[0].state}
                        height="400px"/>
        }
        return(<Container>
            <Row>
                <Col sm={10}>
                    <h2>Filtrar fotograf&iacute;as</h2>
                    <p>
                        Se acepta material que siga las reglas de uso de la plataforma.
                    </p>
                    <Container>    
                        <Row>
                            {actual}
                        </Row>
                        {this.state.list.length===0 ? 
                        null
                        : <Row>
                            <ButtonGroup>
                                <Button onClick={this.updateElementState}>Aceptar</Button>
                                <Button color="secondary" onClick={this.removeElement}>Rechazar</Button>
                            </ButtonGroup>
                        </Row>
                        }
                    </Container>
                </Col>
                <Col sm={2}>
                    {latest}
                </Col>
            </Row>
        </Container>);
    }
}

export default Filter