import React from 'react';
import burgerLogo from '../../assets/images/bl.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height }}>
        <img src={burgerLogo} alt="myBurger"/>
    </div>
);

export default logo;