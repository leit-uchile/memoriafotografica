import React, { Component } from 'react';
//import photoInfo from '../css/photoInfo.css';
import galleryHome from '../css/galleryHome.css';

const Photo = ({className, url, name, height="100px", width="auto", tags}) => <div>
        <a href={url}>
            <img className={className} src={url} height={height} width={width} alt={name}/>
        </a>
    </div> 

export default Photo;