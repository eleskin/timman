import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {BrowserRouter, Switch} from 'react-router-dom';
import {useMediaQuery} from 'react-responsive';
import {connect} from 'react-redux';
import PrivateRoute from './auth/PrivateRoute';
import PublicRoute from './auth/PublicRoute';
import NullRoute from './auth/NullRoute';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import Documents from './views/Documents/Documents';
// import Settings from './views/Settings/Settings';
import {Layout} from 'antd';
import Header from './components/Header/Header';
import Notes from './views/Notes/Notes';
import Settings from './views/Settings/Settings';
import TodoList from './views/TodoList/TodoList';

const {Content} = Layout;

const App = props => {
  const {auth} = props;
  const isMobile = useMediaQuery({ query: '(min-width: 576px)' })

  return (
    <div className="App">
      <BrowserRouter>
        <Layout style={{minHeight: '100vh', maxHeight: '100vh', height: '100%'}}>
          {isMobile && <Sidebar auth={auth}/>}
          <Layout className="site-layout" style={{overflowY: 'scroll'}}>
            <Header/>
            <Content style={{margin: '0.5rem', paddingBottom: '50px'}}>
              <Switch>
                <PublicRoute auth={auth} exact path="/login" component={Login}/>
                <PublicRoute auth={auth} exact path="/register" component={Register}/>

                <PrivateRoute auth={auth} exact path="/home" component={Home}/>

                <PrivateRoute auth={auth} exact path="/notes" component={Notes}/>
                <PrivateRoute auth={auth} exact path="/notes/:id" component={Notes}/>

                <PrivateRoute auth={auth} exact path="/documents" component={Documents}/>
                <PrivateRoute auth={auth} exact path="/settings" component={Settings}/>
                <PrivateRoute auth={auth} exact path="/todo" component={TodoList}/>
                <NullRoute auth={auth}/>
              </Switch>
            </Content>
            {auth && !isMobile && <Footer/>}
          </Layout>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default connect(({authReducer}) => ({auth: authReducer.auth}), null)(App);
