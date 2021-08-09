import  React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
    <div className={classes.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        {
            props.isAuthenticated 
            ? <NavigationItem link="/orders">Orders</NavigationItem>
            : null
        }
        {
            props.isAuthenticated 
            ? <NavigationItem link="/logout">Logout</NavigationItem>
            : <NavigationItem link="/auth">Authenticate</NavigationItem>        
        }
    </div>
);

export default navigationItems;