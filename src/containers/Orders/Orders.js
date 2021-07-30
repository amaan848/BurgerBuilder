import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';



class Orders extends Component{
    state={
        orders: [],
        loading: true,

    }
    componentDidMount(){
        axios.get('/orders.json')
        .then(res=> {
            const fetchedData = [];
            for(let key in res.data){
                fetchedData.push(
                    {  ...res.data[key] , id: key });
            }
            this.setState({loading: false , orders: fetchedData})
            
        })
        .catch(err => {
           this.setState({loading: false})
            
        })
    }
    render(){
        let allOrders = this.state.orders;
        const displayOrders = allOrders.map(order => {
            return (
                <Order 
                ingredients={order.ingredients} 
                price={order.price} 
                key={order.id}/>
            );
        })
        return(
            <div>
                {displayOrders}
            </div>
        );
    }
}

export default Orders;