import React from 'react';
import {Link} from 'react-router-dom'

const Photo = ({className, url, name, height="100px", width="cover", onClick, 
    style, useLink, redirectUrl, hover, hoverText, hoverStyle, ...props}) => useLink  && redirectUrl ? 
    <Link to={redirectUrl}>
        {
            hover && hoverText ?
            <div style={{
                ...styles.containerDivIm,
                backgroundImage: "url('"+url+"')",
                height: height,
                width: width,
                ...style,
                }}>
                <div className={'doHoverPhoto'} style={{
                    ...styles.photoHoverDefault,
                    lineHeight: height,
                    ...hoverStyle
                }}>
                    {hoverText}
                </div>
            </div>
            :
            <div style={{...style, 
                ...styles.containerDivIm,
                backgroundImage: "url('"+url+"')",
                height: height,
                width: width,
                }}>
            </div>
        }
    </Link>
    : 
    <a onClick={onClick}>
        <div style={{...style, 
            ...styles.containerDivIm,
            backgroundImage: "url('"+url+"')",
            height: height,
            width: width,
            }}>
        </div>
    </a>

const styles = {
    containerDivIm: {
        position: 'relative',
        backgroundSize: "cover",
        backgroundPositionY: "center",
        backgroundPositionX: "center",
    },
    photoHoverDefault: {
        position: 'absolute',
        top: '0',
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        textAlign: 'center',
        verticalAlign: 'middle',
        color: "white",
        fontWeight: '700',
    }
}

export default Photo;