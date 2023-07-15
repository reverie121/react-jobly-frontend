import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom/cjs/react-router-dom.min";

import { clearLocal } from "./helpers/localStorageHelper";
import UserContext from "./UserContext";

import './css/Nav.css';

function Nav() {

    const { user, setUser } = useContext(UserContext)
    const { pathname } = useLocation();

    function isLoggedIn() {
        return user ? true : false
    }

    function logout() {
        clearLocal();
        setUser(null);
    }

    return(
        <div className="Nav">
            <NavLink to="../" isActive={() => pathname === "/"}>Jobly</NavLink>
            <div>
                {isLoggedIn() && <NavLink to="../companies">Companies</NavLink>}
                {isLoggedIn() && <NavLink to="../jobs">Jobs</NavLink>}
                {isLoggedIn() && <NavLink to="../profile">Profile</NavLink>}
                {isLoggedIn() && <NavLink to="../" onClick={logout} isActive={() => pathname === "/logout"}>Log Out {user.username}</NavLink>}
                {!isLoggedIn() && <NavLink to="../login">Log In</NavLink>}
                {!isLoggedIn() && <NavLink to="../signup">Signup</NavLink>}
            </div>
        </div>
    )
};

export default Nav;