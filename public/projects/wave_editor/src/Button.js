import React from 'react';
import plus from './plus.png';
import minus from './minus.png';
class Button extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <button className="btn-default" data-positive={this.props.positive} className="plus" onClick={this.props.onClick}><img src = {+this.props.positive ? plus : minus}/></button>
        );
    }
}

export default Button;
