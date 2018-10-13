import React, { Component } from 'react';

class Filter_Photos extends Component{
    render(){
        return(
            <div>
                <img className='img-fluid' style={{height: '500px', width: 'auto'}} src='http://www.lebenshilfe-sz.de/wp-content/uploads/2017/01/noimg.jpg'/>
                <div className='btn-group' role='group' aria-label='Accion'>
                    <button type="button" className="btn btn-primary active">Publicar</button>
                    <button type="button" className="btn btn-secondary active">Rechazar</button>
                </div>
            </div>

        );
    }

}


export default Filter_Photos