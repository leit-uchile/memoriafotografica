import React, {Component} from 'react';

class UploadUnregiter extends Component{
    constructor(Props){
        super()
        this.props = Props        
        if(Props.cache != null){
            this.state = {
                ...Props.cache,
                error: null
            }
        }else{
            this.state = {
            rol: "",
            info: {},
            student : false,
            email : "",
            name: "",
            lastname: "",
            }
        }      
        this.checkGeneration = this.checkGeneration.bind(this);
    }

    updateGeneration = e =>{e.preventDefault(); this.setState({ info: {...this.state.info, generation: e.target.value}})};

    
    checkGeneration(e){
        this.setState({
            student : e.target.checked,
            info: {...this.state.info, estudiante : e.target.checked}
             })
    }

    updateName = e => {this.setState({name: e.target.value})};
    updateLastName = e => {this.setState({lastname: e.target.value})};
    updateEmail = e => {this.setState({email: e.target.value})};
    onSubmit = e => {
        e.preventDefault();
        this.props.saveInfo(this.state)
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
                    <h1>Cuentanos un poco sobre ti</h1>
                </div>

                <form onSubmit={this.onSubmit}>
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
            
                <hr />

                <div>
                    <h2>En caso que necesitemos contactarte</h2>
                </div>
                
                <div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Nombre: </label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" placeholder="Jose" onChange={this.updateName} required value={this.state.name}></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Apellido: </label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" placeholder="Aguirre" onChange={this.updateLastName}required value={this.state.lastname}></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Correo electronico:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="email" placeholder="jose.medina@memoria-uchile.cl" onChange={this.updateEmail}required value={this.state.email}></input>
                        </div>
                    </div>
                </div>

                <button className="btn btn-secondary" onClick={this.props.goBack}>Atras</button>  
                <button className="btn btn-success" type="submit">Continuar</button>  
                </form>
            </div>
        )
    }
}

export default UploadUnregiter
  