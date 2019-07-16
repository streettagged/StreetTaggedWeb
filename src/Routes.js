import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import StreetArt from "./containers/StreetArt";
import NewArt from "./containers/NewArt";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Map from "./containers/Map"



export default ({ childProps }) =>
<Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/art/new" exact component={NewArt} props={childProps} />
    <AuthenticatedRoute path="/art/:id" exact component={StreetArt} props={childProps} />
    <AuthenticatedRoute path="/map" exact component={Map} props={childProps} />


    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
</Switch>;