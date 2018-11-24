import React, { Component } from 'react';
import Category_New from './Category_New'
import Photo from '../../components/Photo';
import { Link } from 'react-router-dom';

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

class Categories extends Component{

    constructor(){
        super()
        this.getLatestCategories = this.getLatestCategories.bind(this);
        this.removeCategories = this.removeCategories.bind(this);
        this.updateToDelete = this.updateToDelete.bind(this);
        this.state = {
            toDelete : []
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
    
    updateToDelete(i,isCheck){
        // Send update to API
        console.log(i)
        if (isCheck){
            this.state.toDelete.push(i)
            console.log(this.state.toDelete)
        }
        else{
            var index = this.state.toDelete.indexOf(i);
            this.state.toDelete.splice(index,1);
            console.log(this.state.toDelete)
        }
        
        // Update

    }

    removeCategories(){
        // Fake call to API
        var newCates = []
        for (var i in cates){
            if (i in this.state.toDelete == false){
                newCates.push(cates[i])
            }
        }
        //console.log(newCates)
        cates = newCates
        this.state.toDelete=[]
        this.getLatestCategories()
    }

    
    render(){
        var latest = []
        for (var i = 0; i < cates.length; i++) {
            const index = i;
            latest.push(
                <div>
                    <input type="checkbox" aria-label="Checkbox for delete Categories" onClick={e => this.updateToDelete(this.state.categories[index],e.target.checked)}></input>
                    <Photo name={this.state.categories[i].name} url={this.state.categories[i].url} tags={this.state.categories[i].tags}/>
                    <button type="button" className="btn btn-primary active">Agregar fotos</button>    
                </div>
            )
        }
        if(cates.length<1) {
            latest = 'No existen categorias'
        }
        return(
        
            <div>
                <div className='btn-group' role='group' aria-label='Accions'>
                    <Link to='/curador/dashboard/new-category'>Crear Categoria</Link>
                    <button type="button" className="btn btn-secondary active" onClick={this.removeCategories}>Eliminar</button>
                </div>
                {latest}
                
            </div>
            
        );
    }

}
Categories.props = {
    categories: cates
}

export default Categories