import React, { FC } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

// Components
import {UserProfilePage} from "../UserProfilePage/UserProfilePage";
import { UsersPage } from "../UsersPage/UsersPage";
import {UsersSearchPage} from "../UsersSearchPage/UsersSearchPage";

export const App: FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/search/users" element={ <UsersSearchPage /> } />
        <Route path="/users/:id" element={ <UserProfilePage /> } />
        <Route path="/users/" element={ <UsersPage /> } />
        <Route path="/" element={ <UsersPage /> } />
        <Route path="*" element={ <Navigate replace to="/" /> } />
      </Routes>
    </Router>
  )
};
