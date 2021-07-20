import React, { Component } from 'react';
import Aux from '../Aux/aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

    state = {
        showSideDrawer : false
    };

    sideDrawerClosedHandler = ()=>{
         this.setState({
            showSideDrawer : false
         });
    }
    sideDrawerOpenedHandler = ()=>{
         this.setState({
            showSideDrawer : true
         });
    }

    render(){
return(
        <Aux>
            <Toolbar showSideDrawer={this.sideDrawerOpenedHandler}/>
            <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
);
}
}

export default Layout;