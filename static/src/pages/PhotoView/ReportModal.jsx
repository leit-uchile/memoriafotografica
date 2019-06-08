import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

class ReportModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            modal: false,
            reportIssues: []
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(){
        this.setState({
            modal: !this.state.modal
        });
    }

    updateReport(element){
        this.state.reportIssues.push(element)
        this.forceUpdate()
    }

    sendReport(){
        // Call API adn send report Issues
        console.log("Sended report")
    }

    render(){

        const labelStyle = {display: "block"};
        const {style, className} = this.props;

        return(
            <div className={className} style={style}>
                <Button onClick={this.toggle}>¿Algo anda mal?</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Reportar fotografia</ModalHeader>
                    <ModalBody>
                        <label style={labelStyle}><input type="checkbox" onChange={() => this.updateReport(1)}/> Contenido inapropiado</label>
                        <label style={labelStyle}><input type="checkbox" onChange={() => this.updateReport(2)}/> Incita a la violencia</label>
                        <label style={labelStyle}><input type="checkbox" onChange={() => this.updateReport(3)}/> El usuario no es autor del contenido</label>
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