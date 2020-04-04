import React from 'react';
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import ProtectedRoute from './Components/Common/ProtectedRoute/protectedRoute.componenet';
import Header from './Components/Header/header.component';
import HomePage from './Pages/HomePage/home.page';
import LoginPage from './Pages/LoginPage/login.page';
import Logout from './Components/Logout/logout.component';
import SourcesPage from './Pages/SourcesPage/sources.page';
import NotFoundPage from './Pages/NotFoundPage/notFound.page';
import {getCurrentUser} from './Services/auth.service';
import './App.css';

function App(props) {
  const user = getCurrentUser()
  const isLoggedin = user ? true : false;
  return (
    <React.Fragment>
      <Header user={user} />
      <Switch>
        <Route path="/login"  render={(props) => <LoginPage {...props} history={props.history} isLoggedin={isLoggedin}/>}></Route>
        <Route path="/logout" component={Logout} />
        <Route path="/home" component={ProtectedRoute(HomePage, isLoggedin)} />
        <Route path="/sources" component={ProtectedRoute(SourcesPage, isLoggedin)} />
        <Route path="/not-found" component={ProtectedRoute(NotFoundPage, isLoggedin)} />
        <Redirect from="/" exact to="/home" />
        <Redirect to="/not-found" />
      </Switch>
    </React.Fragment>
  );
}

export default withRouter(App);
