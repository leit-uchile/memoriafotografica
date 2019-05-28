import React from 'react';
import Filter from './Filter';
import Publish_Photos from './Publish_Photos';
import Categories from './Categories';
import Reported_Photos from './Reported_Photos';
import Category_New from './Category_New';
import Category_Photos from './Category_Photos';
import {Container, Row, Button} from 'reactstrap'
import {Route, Link} from 'react-router-dom'

const Dashboard = ({match}) =>
    <Container style={{marginTop:'20px'}}>
        <Row>
            <Button tag={Link} to={match.path + "/filter"} style={styles.button}>Fotos </Button>
            <Button tag={Link} to={match.path + "/categories"} style={styles.button}>Categorizar</Button>
            <Button tag={Link} to={match.path + "/flagged"} style={styles.button}>Denuncias</Button>
            <Button tag={Link} to={match.path + "/reported"} style={styles.button}>Reportes</Button>
        </Row>
        <div style={{marginTop: '20px'}}>
            <Route path={match.path + "/filter"} component={Filter}/>
            <Route exact path={match.path + "/categories/new-category"} component={Category_New}/>
            <Route exact path={match.path + "/categories/:id/add-photos"} component={Category_Photos}/>
            <Route exact path={match.path + "/categories"} component={Categories}/>
            <Route exact path={match.path + "/flagged"} component={Publish_Photos}/>
            <Route exact path={match.path + "/reported"} component={Reported_Photos}/>
        </div>
    </Container>

const styles={
    button:{
        color:'#000000',
        width:'20%',
        textAlign:'left',
        fontSize:'15px',
        marginRight:'10px', 
        backgroundColor:'#dceaf7', 
        borderRadius:'5px', 
        border:'1px solid rgb(156,158,159)', 
        boxShadow: '2px 2px 4px rgb(156,158,159)'
    }
}
export default Dashboard;