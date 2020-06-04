import React, { Component } from 'react';
import './TodoItem.css'
import checkIMG from '../images/check.svg';
import checkCompleteIMG from '../images/check-complet.svg'

class TodoItem extends Component{

    render() {

        const { item, onCompleteClick, onRemove } = this.props;

        let className = "TodoItem";
        let check = checkIMG;

        if (item.isComplete) {
            className += " complete";
            check = checkCompleteIMG;
        }

        return(
            <div className={className} >
                <img onClick={onCompleteClick} src={check} />
                <p onClick={onCompleteClick}>{item.title}</p>
                <button onClick={onRemove}>&times;</button>
            </div>
        );
    }
}

export default TodoItem;