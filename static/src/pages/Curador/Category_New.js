import React, { Component } from 'react'; 

var cates = [
    {
        name: "DCC",
        url: "https://pbs.twimg.com/profile_images/3410185634/3b7db5e3effe3286920338b1c8b2cfab_400x400.jpeg",
        tags: ["tag1","tag2"],
    }]

class Category_New extends Component{

    constructor(){
        super()
        this.setState({
            categories: cates
        })
    }
    createCategory(name,tags){
        this.cates.push([name,tags])
        console.log(this.cates)
    }

    render(){
        return(
            <div>
                <h1>Crear Categoria</h1>
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
                                    <button type='button' className="btn btn-success" style={{marginTop: '33px'}}  onclick={e => this.createCategory('Nueva','1')} >Crear</button>
                                </div>
                            </div>
                        </form>
                    </div>
            </div>
        )
    }
}

Category_New.props = {
    categories: cates
}

export default Category_New