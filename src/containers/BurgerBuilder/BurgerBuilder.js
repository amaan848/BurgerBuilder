import React , {Component} from 'react';
import Aux from '../../hoc/aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


class BurgerBuilder extends Component{
    state = {
        ingredients : {
            salad: 0,
            meat: 1,
            cheese: 3,
            bacon: 0
        }
    };
    render(){
        return (
            <Aux>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls/>
            </Aux>

        );
    }
}

export default BurgerBuilder;