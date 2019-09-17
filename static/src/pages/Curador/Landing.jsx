import React, { Component } from 'react';
import {Row, Col, Button, Container} from 'reactstrap';

class Landing extends Component{


  constructor(){
    super()
  }

  render(){
    return(
      <Container>
        <ul>
          <li> 10 Fotos </li>
          <li> 20 Tags </li>
        </ul>
      </Container>
    )
  }
}


export default Landing;
