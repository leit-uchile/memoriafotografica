import React from 'react';
import Filter from './Filter';
import Publish_Photos from './Publish_Photos';
import Categories from './Categories';
import Reported_Photos from './Reported_Photos';
import Category_New from './Category_New';
import Category_Photos from './Category_Photos';
import {Button} from 'reactstrap'
import {Route, Link} from 'react-router-dom'

const Dashboard = ({match}) =>
    <div className='container'>
        <h1>DASHBOARD Curador</h1>
        <div>
            <Button tag={Link} to={match.path + "/filter"}>Filtrar contenido</Button>
            <Button tag={Link} to={match.path + "/categories"}>Categorizar</Button>
            <Button tag={Link} to={match.path + "/flagged"}>Denuncias</Button>
            <Button tag={Link} to={match.path + "/reported"}>Reportes</Button>
        </div>
        <div style={{marginTop: '10px'}}>
            <Route path={match.path + "/filter"} component={Filter}/>
            <Route exact path={match.path + "/categories/new-category"} component={Category_New}/>
            <Route exact path={match.path + "/categories/:id/add-photos"} component={Category_Photos}/>
            <Route exact path={match.path + "/categories"} component={Categories}/>
            <Route exact path={match.path + "/flagged"} component={Publish_Photos}/>
            <Route exact path={match.path + "/reported"} component={Reported_Photos}/>
        </div>
    </div>

export default Dashboard;