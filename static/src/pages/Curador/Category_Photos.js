import React, { Component } from 'react';

class Category_Photos extends Component{
    render(){
        return(
            <div>
                <div>
                    <h1>Categorias y Fotos</h1>


                </div>
                <div>
                    <h1>Administrar Categorias</h1>
                    <div>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-5">
                                    <label>Nombre</label>
                                    <input type="text" className="form-control"/>
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Añadir Tags</label>
                                    <textarea className="form-control" rows='1'/>
                                </div>
                                <div className='form-group col-md-3'>
                                    <button type='button' className="btn btn-success" style={{marginTop: '33px'}}>Crear</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div>
                        <h3>Lista</h3>
                    </div>
                </div>

            </div>

        );
    }

}


export default Category_Photos