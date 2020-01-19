import React, {Component} from 'react';
import './Input.scss';

class Input extends Component{
    

    render(){
        return (
            <input type={this.props.type} id={this.props.id} className={this.props.placeholder} placeholder={this.props.placeholder} onChange={this.props.onChange} value={this.props.value} name={this.props.name}/>
        );
    }
}

export default Input;