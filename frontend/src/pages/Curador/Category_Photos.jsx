import React, { Component } from 'react';
import Photo from '../../components/Photo';


var biblio = [
    {
        name: "Foto 1",
        url: "http://ingenieria.uchile.cl/u/ImageServlet?idDocumento=88770&indice=0&nocch=20180525125355.0",
        tags: ["tag1","tag2"],
    },
    {
        name: "Foto 2",
        url: "http://ingenieria.uchile.cl/u/ImageServlet?idDocumento=88770&indice=1&nocch=20180525125355.0",
        tags: ["tag2","tag3"],
    },
];

class Category_Photos extends Component{
      render(){
        return(
            <div>
                <h2>Titulo Categoria</h2>
                <h3>Fotos</h3>
                <Photo name={biblio[0].name} url={biblio[0].url} tags={biblio[0].tags}/>
                <Photo name={biblio[1].name} url={biblio[1].url} tags={biblio[1].tags}/>
                <button>Agregar Foto (abre todas las fotos disponibles)</button>
                <button>Eliminar Fotos</button>
            </div>
        )
    }
}

export default Category_Photos