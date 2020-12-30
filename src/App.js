import React from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import {BrowserRouter, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PrivateRoute from './auth/PrivateRoute';
import PublicRoute from './auth/PublicRoute';
import NullRoute from './auth/NullRoute';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Sidebar from './components/Sidebar/Sidebar';
import Documents from './views/Documents/Documents';
import Settings from './views/Settings/Settings';
import {Layout} from 'antd';

const {Content} = Layout;

const App = props => {
  const {auth} = props;

  return (
    <div className="App">
      <BrowserRouter>
        <Layout style={{minHeight: '100vh'}}>
          <Sidebar auth={auth}/>
          <Layout className="site-layout">
            {/*<Header className="site-layout-background" style={{padding: 0}}/>*/}
            <Content style={{margin: '0.5rem'}}>
              <Switch>
                <PublicRoute auth={auth} exact path="/login" component={Login}/>
                <PublicRoute auth={auth} exact path="/register" component={Register}/>

                <PrivateRoute auth={auth} exact path="/home" component={Home}/>
                <PrivateRoute auth={auth} exact path="/documents" component={Documents}/>
                <PrivateRoute auth={auth} exact path="/settings" component={Settings}/>
                <NullRoute auth={auth}/>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default connect(({authReducer}) => ({auth: authReducer.auth}), null)(App);
