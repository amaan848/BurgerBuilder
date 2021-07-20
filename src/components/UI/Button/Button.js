import React from 'react';
import classes from './Button.module.css';

const button = (props) => (
    <button 
    onClick={props.clicked} 
    className={[classes.Button , classes[props.BtnType]].join(' ')}> 
    {/* BtnType has to be either "Danger" or "Success" */}
        {props.children}</button>
);

export default button; 