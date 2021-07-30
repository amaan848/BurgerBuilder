import React , {Component} from 'react';
import Aux from '../../hoc/Aux/aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component{
    state = {
        ingredients : null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount = ()=>{
        axios.get('https://myburger-aa28b-default-rtdb.firebaseio.com/ingredients.json')
        .then( response => {
            this.setState({ingredients : response.data});
           // console.log(response);
        })
        .catch(error =>{
            this.setState({error : true})
        });
    }
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
        const queryParams = [];
        for(let i in this.state.ingredients)
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname : '/checkout',
            search: '?' + queryString
        });
    }

    render(){
        const disabledInfo = {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        if(this.state.ingredients){
        orderSummary = <OrderSummary 
                    ingredients = {this.state.ingredients}
                    cancel = {this.purchaseCancelHandler} 
                    continue = {this.purchaseContinueHandler}
                    totalPrice = {this.state.totalPrice.toFixed(2)}/>;
        if(this.state.loading){
            orderSummary = this.state.error ? <p>Ingredients cant be loaded</p> : <Spinner/>;
        }
        }
        
       
        let burger = <Spinner/>
        if(this.state.ingredients){
             burger = <Aux>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                ingredientAdded = {this.addIngredientHandler} 
                ingredientRemoved = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                price = {this.state.totalPrice}
                purchasibility = {this.state.purchasable}
                ordered = {this.purchaseHandler}/>
                </Aux>;
        }
       
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal> 
                {burger}
            </Aux>
        );
        
    }
}

export default withErrorHandler(BurgerBuilder , axios);