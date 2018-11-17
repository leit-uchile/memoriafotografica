import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

class ReportModal extends Component{

    constructor(props){
        super(props);

        this.state = {
            modal: false
        }

        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState({
            modal: !this.state.modal
        });
    }

    render(){
        return(
            <div>
                <Button color="danger" onClick={this.toggle}>Reportar Foto</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Reportar fotografia</ModalHeader>
                    <ModalBody>
                        Contents
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Reportar</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

export default ReportModal;