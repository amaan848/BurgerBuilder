import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    let ingredientsArray = [];
    for(let ingName in props.ingredients){
        ingredientsArray.push({
            Ingredient : ingName,
            Amount : props.ingredients[ingName]
        })
    }
    let displayIngredients = ingredientsArray.map(ingdt => {
        return (
        <span
        style={{
            display:"inline-block",
            border: "1px solid #ccc",
            margin: "0 3px",
            padding: "5px",
            textTransform: "capitalize"
        }}>
            {ingdt.Ingredient} : {ingdt.Amount}
        </span>)
    })
    return (
        <div className={classes.Order}>
            <span>Ingredients : </span>
            {displayIngredients}
            <p>Price : <strong>{props.price}$</strong></p>
        </div>
    );
}

export default order; 

//  <p>Ingredients : 
//             <li>Salad : {props.ingredients.salad}</li>
//             <li>Cheese : {props.ingredients.cheese}</li>
//             <li>Bacon : {props.ingredients.bacon}</li>
//             <li>Meat : {props.ingredients.meat}</li>
//         </p>