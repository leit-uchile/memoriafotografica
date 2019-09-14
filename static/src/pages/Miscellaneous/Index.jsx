import React from 'react';
import About from './About';
import FAQ from './FAQ';
import ContactUs from './ContactUs';
import {Container, Row, Button, Col} from 'reactstrap'
import {Route, Link} from 'react-router-dom'

const Index = ({match}) =>
    <Container fluid style={styles.container}>
      <div>
          <Row>
            <Col xs="2" style={styles.leftcol}>
              <Button tag={Link} style={styles.button} to={match.path + "/about"} className="navButton">Acerca de</Button>
              <Button tag={Link} style={styles.button} to={match.path + "/resources/faq"} className="navButton">FAQ</Button>
              <Button tag={Link} style={styles.button} to={match.path + "/resources/contact-us"} className="navButton">Contáctenos</Button>
              <Button tag={Link} style={styles.button} to={match.path + "/resources/"} className="navButton">Mapa del sitio</Button>
              <div className="navEnding"></div>
            </Col>
            <Col xs="10" style={styles.rightcol}>
              <Route path={match.path + "/about"} component={About}/>
              <Route path={match.path + "/resources/faq"} component={FAQ}/>
              <Route path={match.path + "/resources/contact-us"} component={ContactUs}/>
            </Col>
          </Row>
        </div>
    </Container>

const styles = {
  container:{
    marginBottom:"2em"
  },
  leftcol:{
    marginLeft:'-1em',
    borderRight:"1px solid rgb(210, 214, 218)"
  },
  rightcol:{
    marginTop:"2em",
    marginBottom:"2em", 
    minHeight:"75vh"
  },
  button:{
    color:'#007bff',
    backgroundColor:'transparent'
  }
}
export default Index;