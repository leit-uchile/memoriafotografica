import React from 'react';
import {Badge} from 'reactstrap';
import {Link} from 'react-router-dom'

const Photo = ({className, url, name, height="100px", width="auto", tags, onClick, useLink, redirectUrl, ...props}) => useLink  && redirectUrl ? 
    <Link to={redirectUrl}>
        <img className={className} src={url} height={height} width={width} alt={name}/>
        {tags ? 
            tags.map( (el,i) => {<Badge key={i}>el</Badge>})
            : null}
    </Link>
    : 
    <div>
        <a onClick={onClick}>
            <img className={className} src={url} height={height} width={width} alt={name}/>
        </a>
        {tags ? 
            tags.map( (el,i) => {<Badge key={i}>el</Badge>})
            : null}
    </div> 

export default Photo;