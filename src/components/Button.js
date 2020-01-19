import React, {Component} from 'react';
import './Button.scss';

class Button extends Component{
    

    render(){
        return (
            <button onClick={this.props.onClick} className={ this.props.className }>{ this.props.label}</button>
        );
    }
}

export default Button;

