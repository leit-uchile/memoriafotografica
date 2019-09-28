import React, { Component } from 'react';
import {Row, Col, Button, Container} from 'reactstrap';

class Landing extends Component{


  constructor(){
    super()
  }

  render(){
    return(
      <Container>
        <Row>
          <Col>
            <h2>Estad&iacute;sticas del sitio</h2>
          </Col>
        </Row>
      </Container>
    )
  }
}


export default Landing;
