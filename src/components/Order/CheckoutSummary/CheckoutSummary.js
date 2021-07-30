import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <p>We hope it tastes well!</p>
            <div style={{width: '100%' , margin: 'auto'}}>
                    <Burger ingredients={props.ingredients}/>
            </div>
            <Button BtnType="Danger" clicked={props.checkoutCancelled} >CANCEL</Button>
            <Button BtnType="Success" clicked={props.checkoutContinued} >CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;