import React from 'react';
import Filter from './Filter';
import Publish_Photos from './Publish_Photos';
import Categories from './Categories';
import Reported_Photos from './Reported_Photos';
import Category_New from './Category_New';
import Category_Photos from './Category_Photos';
import Landing from './Landing';
import {Container, Row, Button, Col} from 'reactstrap'
import {Route, Link} from 'react-router-dom'
import './styles.css';

const Dashboard = ({match}) =>
    <Container fluid={true} style={{marginBottom:"-2em", borderTop:"1px solid rgb(210, 214, 218)"}}>
      <div>
          <Row>
            <Col xs="2" className='leftcol'>
              <Button tag={Link} to={match.path + "/"} className="navButton">Dashboard</Button>
              <div className="navSpacer"><span>Curar Imágenes</span></div>
              <Button tag={Link} to={match.path + "/categories"} className="navButton">Categorías</Button>
              <Button tag={Link} to={match.path + "/filter"} className="navButton">Curación</Button>
              <Button tag={Link} to={match.path + "/flagged"} className="navButton">Denuncias</Button>
              <Button tag={Link} to={match.path + "/reported"} className="navButton">Reportes</Button>
              <Button tag={Link} to={match.path + "/tags"} className="navButton">Etiquetas</Button>
              <div className="navEnding"></div>
            </Col>
            <Col xs="10" style={{marginTop:"2em",marginBottom:"2em", minHeight:"75vh"}}>

              <Route path={match.path + "/filter"} component={Filter}/>
              <Route exact path={match.path + "/categories/new-category"} component={Category_New}/>
              <Route exact path={match.path + "/categories/:id/add-photos"} component={Category_Photos}/>
              <Route exact path={match.path + "/categories"} component={Categories}/>
              <Route exact path={match.path + "/flagged"} component={Publish_Photos}/>
              <Route exact path={match.path + "/reported"} component={Reported_Photos}/>
              <Route exact path={match.path + "/"} component={Landing}/>
            </Col>
          </Row>
        </div>
    </Container>

const classes = {
  leftcol:{
    marginLeft:0
  }
}

export default Dashboard;
