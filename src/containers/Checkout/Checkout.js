import React , {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {  Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    state = {
        ingredients: {
            salad : 1,
            bacon: 1,
            meat: 1,
            cheese: 1
        },
        totalPrice : 4
    }

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const params = query.entries();
        let price = 0;
        const ingredients = {};
        for(let param of params){
            if(param[0] === 'price'){
                price = param[1];
            }else{
            ingredients[param[0]] = +param[1];
            }
        }
        this.setState({
            ingredients : ingredients,
            totalPrice : price
        });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler} />
                <Route path={this.props.match.path + '/contact-data'}  
                //component={ContactData}..we want to pass props i.e ingredients so we use a render method instead
                render = {(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
                
            </div>
        );
    }
}

export default Checkout;