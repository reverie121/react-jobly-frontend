import React from "react";
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import UserProfile from "./UserProfile";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import CompanyDetails from "./CompanyDetails";
import Home from "./Home";

function Routes() {
    return(
        <Switch>
            <Route exact path="/companies">
                <CompanyList />
            </Route>
            <Route path="/companies/:companyHandle">
                <CompanyDetails />
            </Route>
            <Route exact path="/jobs">
                <JobList />
            </Route>
            <Route exact path="/login">
                <LoginForm />
            </Route>
            <Route exact path="/signup">
                <SignupForm />
            </Route>
            <Route exact path="/profile">
                <UserProfile />
            </Route>
            <Route exact path="/">
                <Home />
            </Route>
            <Route>
              <p>Hmmm. I can't seem to find what you want.</p>
            </Route>
        </Switch>
    )
}

export default Routes;