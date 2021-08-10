import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
//this needs not to be a class based component 
    render(){
    const ingredientSummary = this.props.ingredients;
    const lists = Object.keys(ingredientSummary).map((ingd) => {
        return <li key={ingd + ingredientSummary[ingd]}>
            <span style={{textTransform:'capitalize'}}>{ingd}</span> : {ingredientSummary[ingd]}
            </li>
    });
return(
    <Aux>
        <h3>Your Order</h3>
        <p>A delicious Burger with the following ingredients : </p>
        <ul>
            {lists}
        </ul>
        <p><strong>Total Price : {this.props.totalPrice}</strong></p>
        <p>Continue to Checkout?</p>
        <Button BtnType="Danger" clicked={this.props.cancel}>CANCEL</Button>
        <Button BtnType="Success" clicked={this.props.continue}>CONTINUE</Button>
    </Aux>
);
}
}

export default OrderSummary;