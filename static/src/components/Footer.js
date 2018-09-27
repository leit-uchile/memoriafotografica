import React, { Component } from 'react';
import footer from '../css/footer.css';

class Footer extends Component{

    constructor(){
        super();
    }

    render(){

        return(
            <footer className='footer mt-5'>
                <div className='container'>
                    <img src={'/fcfm_escudo_color_png.png'} alt={'logo'}/>
                    <h2>Facultad de Ciencias Físicas y Matemáticas,</h2>
                    <h2>Universidad de Chile</h2>
                    <h2>Beauchef 850, Santiago | Central: +562 29784000</h2>
                </div>
            </footer>
        );
    }

}

export default Footer;