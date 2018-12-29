import React, { Component } from 'react';
import Photo from '../../components/Photo';


class Filter extends Component{

    constructor(props){
        super(props)
        this.getLatestElements = this.getLatestElements.bind(this)
        this.removeElement = this.removeElement.bind(this)
        this.updateElementState = this.updateElementState.bind(this)
    }

    componentWillMount(){
        this.getLatestElements()
    }

    getLatestElements(){
        // Call API
        this.setState({
            list: [...this.props.list]
        })
    }

    updateElementState(){
        // Send update to API

        // Update
        // remove
        this.removeElement()
        // getLatestElements

    }

    removeElement(){
        // Fake call to API
        const largo = this.state.list.length
        var list = [...this.state.list.slice(1,largo)]
        console.log(list)
        this.setState({
            list: [...list]
        })
        this.getLatestElements()
    }

    render(){

        var latest = []
        for (var i = 1; i < 4 && i < this.state.list.length; i++) {
            latest.push(
                <Photo name={this.state.list[i].name} url={this.state.list[i].url} tags={this.state.list[i].tags} state={this.state.list[i].state}/>
            )
        }
        var actually = ''
        
        if(this.state.list.length<1) {
            actually = 'Has filtrado todas las solicitudes'
        }
        else{
            actually= <Photo name={this.state.list[0].name} url={this.state.list[0].url} tags={this.state.list[0].tags}
                             desc={this.state.list[0].desc} state={this.state.list[0].state}/>

        }
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='row'>
                            {actually}
                        </div>
                        <div className='row'>
                            <div className='btn-group' role='group' aria-label='Accions'>
                                <button type="button" className="btn btn-primary active" onClick={this.updateElementState}>{this.props.action1}</button>
                                <button type="button" className="btn btn-secondary active" onClick={this.removeElement}>{this.props.action2}</button>
                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        {latest}
                    </div> 
                </div>              
            </div>
        );
    }

}

export default Filter