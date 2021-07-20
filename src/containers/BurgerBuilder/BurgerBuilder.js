import React , {Component} from 'react';
import Aux from '../../hoc/Aux/aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component{
    state = {
        ingredients : {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;
        this.setState(
            {ingredients : updatedIngredients , totalPrice: updatedPrice}
        ); 
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0)
        {
            return null;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - priceDeduction;
        this.setState(
            {ingredients : updatedIngredients , totalPrice: updatedPrice}
        ); 
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState(ingredients){ 
        let sumOfIngredients = 0;
        for(let keys in ingredients){
            sumOfIngredients = sumOfIngredients + ingredients[keys];
        }
        if(sumOfIngredients > 0){
            let purchaseState = true;
            this.setState({
                purchasable : purchaseState
            });
        }
        else{
            let purchaseState = false;
            this.setState({
                purchasable : purchaseState
            });
        } 
    }
    
    purchaseHandler = () => {
        this.setState({purchasing : true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false});
    }

    purchaseContinueHandler = () => {
        alert('You continue');
    }

    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    ingredients = {this.state.ingredients}
                    cancel = {this.purchaseCancelHandler} 
                    continue = {this.purchaseContinueHandler}
                    totalPrice = {this.state.totalPrice.toFixed(2)}/>
                </Modal> 
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                ingredientAdded = {this.addIngredientHandler} 
                ingredientRemoved = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                price = {this.state.totalPrice}
                purchasibility = {this.state.purchasable}
                ordered = {this.purchaseHandler}/>
            </Aux>
        );
        
    }
}

export default BurgerBuilder;