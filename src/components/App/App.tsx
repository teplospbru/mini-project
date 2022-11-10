import React, { FC, useEffect } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

// Components
import { Header } from "../Header/Header";
import {UserProfilePage} from "../UserProfilePage/UserProfilePage";
import { UsersPage } from "../UsersPage/UsersPage";
import {UsersSearchPage} from "../UsersSearchPage/UsersSearchPage";

export const App: FC = () => {
  // useEffect(() => {
  //   fetch('https://api.github.com/users')
  //     .then(response => response.json())
  //     .then(response => console.log(response))
  // }, []);

  return (
    <Router>

      <Header />

      <Switch>
        <Route exact path="/">
          <UsersPage />
        </Route>
        <Route path="/users/:id">
          <UserProfilePage />
        </Route>
        <Route path="/users/">
          <UsersPage />
        </Route>
        <Route path="/search">
          <UsersSearchPage />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
      
    </Router>
  )
  
};
