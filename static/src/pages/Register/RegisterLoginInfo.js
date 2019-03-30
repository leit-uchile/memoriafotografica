import React, {Component} from 'react';

class RegisterLoginInfo extends Component{
    constructor(Props){
        super(Props)
        if(Props.cache != null){
            this.state = {
                ...Props.cache,
                error: null
            }
        }else{
            this.state = {
                email : "",
                password: "",
                name: "",
                lastname: "",
                passwordCheck: "",
                date: "",
            }
        }
        this.checkPassword = this.checkPassword.bind(this);
        this.props = Props
    }

    updateName = e => {this.setState({name: e.target.value})};
    updateLastName = e => {this.setState({lastname: e.target.value})};
    updateEmail = e => {this.setState({email: e.target.value})};
    updatePassword = e => {this.setState({password: e.target.value})};
    updatePasswordCheck = e => {this.setState({passwordCheck: e.target.value})};
    updateDate = e => {this.setState({date: e.target.value})};

    checkPassword(){
        if(this.state.password === ""){
            this.setState({error: "Por favor ingrese su contraseña"})
            return false;
        }else if(this.state.password !== this.state.passwordCheck){
            this.setState({error: "Las contraseñas son diferentes"})
            return false;
        }else if(this.state.password.length < 8){
            this.setState({error: "La contraseña es demasiado corta. Minimo 8 caracteres"})
            return false;
        }else{
            return true;
        }
    }

    onSubmit = e => {
        e.preventDefault();
        if(this.checkPassword()){
            this.setState({error: null})
            this.props.saveInfo(this.state)
        }
    }

    render(){
        var errorMessage;
        if(this.state.error !== undefined && this.state.error !== null){
            errorMessage = <div className="alert alert-warning">{this.state.error}</div>
        }else{
            errorMessage = null;
        }

        return (
            <div class="container" style={{backgroundColor: "rgb(245,245,245)", borderRadius: "1em", marginTop: "2em", padding: "2em"}}>
                <div class="container"><h1>Register</h1></div>
                <form onSubmit={this.onSubmit}>
                {errorMessage}
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
                        <label className="col-sm-2 col-form-label">Fecha de nacimiento:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="date" onChange={this.updateDate} id="date" required value={this.state.date}></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Correo electronico:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="email" placeholder="jose.medina@memoria-uchile.cl" onChange={this.updateEmail}required value={this.state.email}></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Contraseña:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="password" onChange={this.updatePassword} method="post"required></input>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Repita su contraseña:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="password" onChange={this.updatePasswordCheck} method="post"required></input>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary" type="submit" style={{marginLeft: "calc(100% - 6em)"}}>Continuar</button>
                </form>
               
            </div>
        );
    }
}

export default RegisterLoginInfo;