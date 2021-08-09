import React , {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route , Switch , withRouter , Redirect} from 'react-router-dom';
import Orders from '../src/containers/Orders/Orders';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import Auth from './containers/Auth/Auth';


class App extends Component{
  componentDidMount(){
    this.props.onTryAutoSignup()
  }
  render(){
  let routes = (
          <Switch>
                <Route path='/auth' component={Auth}/>
                <Route path='/' component={BurgerBuilder}/>
                <Redirect to='/'/>
          </Switch>
  );

  if(this.props.isAunthenticated){
    routes = (
            <Switch>
                <Route path='/orders' component={Orders}/>
                <Route path='/checkout' component={Checkout}/>              
                <Route path='/logout' component={Logout}/>
                <Route path='/' component={BurgerBuilder}/>
                <Redirect to='/'/>
            </Switch>
    );
  }
    return (
      <div>
          <Layout>
            {routes}
          </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAunthenticated : state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
    return{
      onTryAutoSignup : () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps )(App));