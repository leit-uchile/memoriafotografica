import React, { Component } from 'react';
import Register from '../Register/Register';
import { Link } from 'react-router-dom'

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            user: {
                username: "Cargando nombre ..."
            }
        }
        this.props = props
    }

    componentWillMount(){
        this.getUserInfo()
    }

    async getUserInfo(){
        this.setState({
            user: { username: "natalia", email: "nati@yo.leit"}

        })
    }

    render(){
        return(
            <div class="container"style={{backgroundColor: "rgb(245,245,245)", borderRadius: "1em", marginTop: "2em", padding: "2em"}}>
                <h1> Perfil </h1>
              <div> <img src="http://www.icare3d.org/images/AvatarTransp.png" /> </div> 
              <div style={{fontSize: "60px"}}> {this.state.user.username} </div>
              <div>{this.state.user.email}</div>
                <Link to = {'/registeredit/'}><button class="btn btn-secondary pull-left">editar mis datos</button>
                </Link>
                <br></br>
              
               <div>
                    <button class="btn btn-secondary pull-right">Invitar usuarios</button>
                    <Link to = {'//'}></Link>
               </div>
                <hr></hr>
              <h2>Mis fotos</h2>     
              <Link to = {'/photo/'} ></Link>

                <hr></hr>
                <h3>Mis Àlbumes</h3>

                <hr></hr>
                <h4>Mis comentarios</h4>
                
            </div>
            
        )
    }
}

export default Dashboard; 