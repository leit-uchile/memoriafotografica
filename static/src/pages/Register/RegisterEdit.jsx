import React, { Component } from 'react';
import Register from './Register';
import { link, Link } from 'react-router-dom'

class RegisterEdit extends Component{
    constructor(props) {
        super(props)
        this.state = {
            nombre : "nombre nuevo "
        }
    }

componentWillMount(){
    this.getUserInfo()
}

async getUserInfo(){
    this.setState({
        user:{username:"Natalia", email: "nati@yo.leit", password:"Yo123456"}
    })
}

    render(){
        return (
            <div class="container">
               <div class="container"><h1>Edición de datos</h1>
                       
                       <div class="card"> 
                        <div class="card-body">
                         
                               <img src="http://www.icare3d.org/images/AvatarTransp.png" /> 
                        </div>      
                       </div> 
   
                       <div class="container" style={{backgroundColor: "rgb(245,245,245)", borderRadius: "1em", marginTop: "2em", padding: "2em"}}>
                            <label>Cambiar nombre de: {this.state.user.username}</label>  
                            <input className="form-control" type="text" placeholder={this.state.nombre}></input>
                                                               
                        </div>
                        <div class="container" style={{backgroundColor: "rgb(245,245,245)", borderRadius: "1em", marginTop: "2em", padding: "2em"}}>                         
                            <label>Cambiar email de: {this.state.user.email}</label>
                        </div>

                         <div class="container" style={{backgroundColor: "rgb(245,245,245)", borderRadius: "1em", marginTop: "2em", padding: "2em"}}>
                         <input className="form-control" type="text" placeholder="correo nuevo"></input>
                         </div>
                         
                         <div class="container" style={{backgroundColor: "rgb(245,245,245)", borderRadius: "1em", marginTop: "2em", padding: "2em"}}>
                         <label>Cambiar contraseña</label>
                         
                            <div>
                         <input className="form-control" type="text" placeholder="clave"></input>
                            </div>
                         </div>   
                </div>
            </div>    
                    )
    }
}

export default RegisterEdit;