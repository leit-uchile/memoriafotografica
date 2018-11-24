import React, {Component} from 'react';

class RegisterUserInfo extends Component{
    constructor(Props){
        super()
        this.state = {
            rol: "",
            info: {},
            student : false
        }
        this.props = Props
        this.checkGeneration = this.checkGeneration.bind(this);
    }

    updateGeneration = e =>{e.preventDefault(); this.setState({generation: e.target.value})};

    
    checkGeneration(e){
        this.setState({
            student : e.target.checked,
            info: {...this.state.info, estudiante : e.target.checked}
             })
    }
    
    render(){


           
        var generacion;
        if (this.state.student){
            generacion = <label> generación: <input type="Number" max= "3000" onChange={this.updateGeneration} min="1920" placeholder="1920"/> </label>
        }else{
            generacion= null

        }
        
        

        return(
            <div class="container" style={{backgroundColor: "rgb(245,245,245)", borderRadius: "1em", marginTop: "2em", padding: "2em"}}>
                <div>
                    <h1>Registrar</h1>
                </div>

                <form onSubmit={() => this.props.saveInfo(this.state.info)}>
                <p>
                    <label>Información de comunidad FCFM</label>
                    <hr/>
                </p>
                <p>
                    <label>¿Cuál o cuáles fueron sus roles (o son)?</label>
                </p>
                <p>
                    <label><input type="checkbox" onChange={e =>this.setState({info: {...this.state.info, academico: e.target.checked}})} /> académico  </label>
                </p>
                <p>
                    <label><input type="checkbox" onChange={e => {e.preventDefault(); this.setState({info: {...this.state.info, funcionario: e.target.checked}})}}/> funcionario </label>
                </p>
                <p>
                    <label><input type="checkbox" onChange={e => {this.checkGeneration(e)} }/>estudiante  &nbsp;</label>
                    {generacion}
                </p>
                <p>
                    <label><input type="checkbox"onChange={e =>this.setState({info: {...this.state.info, externo: e.target.checked}})}/> externo a la comunidad </label>
                </p>
            
                <label>¿Cómo te esteraste de esta página?</label>
                <div className="input-group mb-3">
                    <select className="custom-select" onChange={e => this.setState({info: {...this.state.info,dato: e.target.value}})} required>
                        <option>internet</option>
                        <option>poster</option>
                        <option>correo electrónico</option>
                        <option>un amigo</option>
                    </select> 

                    
                </div>  
                <p>&nbsp;</p>

                <button className="btn btn-secondary" onClick={this.props.goBack}>Atras</button>  
                <button className="btn btn-success" type="submit">Registrar</button>  
                </form>
            </div>
        )
    }
}

export default RegisterUserInfo
  