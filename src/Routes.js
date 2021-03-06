import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import StreetArt from "./containers/StreetArt";
import NewArt from "./containers/NewArt";
import MapView from "./containers/MapView";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import ResetPassword from "./containers/ResetPassword";
import Settings from "./containers/Settings";
import ChangePassword from "./containers/ChangePassword";
import ChangeEmail from "./containers/ChangeEmail";

export default ({ childProps }) =>
<Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <UnauthenticatedRoute path="/login/reset" exact component={ResetPassword} props={childProps}/>
    <AuthenticatedRoute path="/latest" exact component={Home} props={childProps} />
    <AuthenticatedRoute path="/mapview" exact component={MapView} props={childProps} />
    <AuthenticatedRoute path="/art/new" exact component={NewArt} props={childProps} />
    <AuthenticatedRoute path="/art/:id" exact component={StreetArt} props={childProps} />
    <AuthenticatedRoute path="/settings" exact component={Settings} props={childProps} />
    <AuthenticatedRoute path="/settings/password" exact component={ChangePassword} props={childProps} />
    <AuthenticatedRoute path="/settings/email" exact component={ChangeEmail} props={childProps} />

    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
</Switch>;