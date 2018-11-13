import React, { Component } from 'react'; 
import Photo from '../../components/Photo';

var cates = [
    {
        name: "DCC",
        url: "https://pbs.twimg.com/profile_images/3410185634/3b7db5e3effe3286920338b1c8b2cfab_400x400.jpeg",
        tags: ["tag1","tag2"],
    },
    {
        name: "DFI",
        url: "https://pbs.twimg.com/profile_images/634838310989529088/-iiRAsLm_400x400.png",
        tags: ["tag2","tag3"],
    },
    {
        name: "Facultad de Derecho",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR17c1V96m-TXcg75FL3Cez4NjACHlJmU74Oeb2Hs0xIiHO9Mlf",
        tags: ["tag2","tag3"],
    },
    {
        name: "DIM",
        url: "http://www.dim.uchile.cl/u/ImageServlet?idDocumento=110986&indice=3&nocch=20181018153621.0",
        tags: ["tag2","tag3"],
    }
];

class Category_Photos extends Component{

    constructor(){
        super()
        this.getLatestCategories = this.getLatestCategories.bind(this);
        this.removeCategories = this.removeCategories.bind(this);
        this.updateCategoriesList = this.updateCategoriesList.bind(this);
        this.state = {
            catesToDelete : []
        }
    }

    componentWillMount(){
        this.getLatestCategories()
    }

    getLatestCategories(){
        // Call API
        this.setState({
            categories: cates
        })
    }
    
    updateCategoriesList(i,isCheck){
        // Send update to API
        console.log(i)
        if (isCheck){
            this.state.catesToDelete.push(i)
        }
        // Update

    }

    removeCategories(){
        // Fake call to API
        cates = cates.slice(1,cates.length)
        this.getLatestCategories()
    }

    
    render(){
        var latest = []
        for (var i = 0; i < cates.length; i++) {
            const index = i;
            latest.push(
                <div>
                    <input type="checkbox" aria-label="Checkbox for delete Categories" onChange={e => this.updateCategoriesList(this.state.categories[index],e.target.checked)}></input>
                    <Photo name={this.state.categories[i].name} url={this.state.categories[i].url} tags={this.state.categories[i].tags}/>
                </div>
            )
        }
        if(cates.length<1) {
            latest = 'No existen categorias'
        }
        return(
            <div>
                <div className='btn-group' role='group' aria-label='Accions'>
                    <button type="button" className="btn btn-primary active">Agregar fotos</button>
                    <button type="button" className="btn btn-secondary active" onClick={this.removeCategories}>Eliminar</button>
                </div>
                {latest}
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
                                    <button type='button' className="btn btn-success" style={{marginTop: '33px'}}>Crear</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}
Category_Photos.props = {
    categories: cates
}

export default Category_Photos