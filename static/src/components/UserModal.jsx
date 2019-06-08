import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import {connect} from 'react-redux';
import {auth} from '../actions';

class UserModal extends Component{

    constructor(props){
        super(props)
        this.state = {
            modal: false
        }
        this.toggle = this.toggle.bind(this)
        this.logout = this.logout.bind(this)
    }

    toggle(){
        this.setState(prevstate => ({modal: !prevstate.modal}))
    }

    logout(){
        this.props.logout(this.props.auth.token)
        this.toggle()
    }

    render(){
        const {first_name, last_name} = this.props.auth.user

        return (
            <div className='nav-link' onClick={this.toggle}>    
                <span>{`${ first_name? first_name : "Nombre"} ${ last_name? last_name : "Apellido"}`}</span>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        {`${ first_name? first_name : "Nombre"} ${ last_name? last_name : "Apellido"}`}
                    </ModalHeader>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Ir a Perfil</Button>
                        <Button color="warning" onClick={this.logout}>Cerrar sesi&oacute;n</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapActionsToProps = dispatch => {
    return {
        logout: (token) => {
            return dispatch(auth.logout(token));
        }
    }
}

export default connect(mapStateToProps,mapActionsToProps)(UserModal)