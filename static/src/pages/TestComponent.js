
import React, {Component} from 'react'

export default class TestComponent extends Component{
    render(){
        return (
            <div>
                {this.props.match.params.id}
            </div>
        )
    }
}