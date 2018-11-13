import React, { Component } from 'react';
import Send_Photos from './Send_Photos';
import Category_Photos from './Category_Photos';
import Reported_Photos from './Reported_Photos';

class Dashboard extends Component{
    constructor(){
        super();
        this.state={
            page: 0
        };
    }
    changePage = e =>{this.setState({page: e})}

    render(){
        var currentpage;
        switch (this.state.page){
            case 0:
                currentpage = <Send_Photos />
                break;
            case 1:
                currentpage = <Category_Photos />
                break;
            case 2:
                currentpage = <Reported_Photos />
                break;
        }

        return(
            <div className='container'>
                <h1>DASHBOARD Curador</h1>
                <div className='btn-group' role='group' aria-label='Botones'>
                    <button type="button" className="btn btn-secondary active" onClick={()=>this.changePage(0)}>Filtrar <span className="badge bandge-pill badge-light">N</span></button>
                    <button type="button" className="btn btn-secondary active" onClick={()=>this.changePage(1)}>Categorizar</button>
                    <button type="button" className="btn btn-secondary active" onClick={()=>this.changePage(2)}>Denuncias</button>
                    <button type="button" className="btn btn-secondary active" onClick={()=>this.changePage(3)}>Reportes</button>
                </div>
                <div style={{marginTop: '10px'}}>
                    {currentpage}
                </div>
            </div>
        )
    }
}

export default Dashboard;