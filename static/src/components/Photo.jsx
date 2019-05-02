import React from 'react';
import {Badge} from 'reactstrap';

const Photo = ({className, url, name, height="100px", width="auto", tags, onClick, ...props}) => <div>
        <a onClick={onClick}>
            <img className={className} src={url} height={height} width={width} alt={name}/>
        </a>
        {tags ? 
            tags.map( (el,i) => {<Badge key={i}>el</Badge>})
            : null}
    </div> 

export default Photo;