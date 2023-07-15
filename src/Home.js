import React, { useContext } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import UserContext from "./UserContext";

import './css/Home.css';

function Home() {
    // Access Context for user and setUser.
    const { user } = useContext(UserContext);

    if (!user) return(
        <div className="Home">
            <h1>Jobly</h1>
            <h2>Your Dream Job is just over the horizon.</h2>
            <div>
                <Link to="/login"><button>Log In</button></Link>
                <Link to="/signup"><button>Sign Up</button></Link>
            </div>
        </div>
    )

    return(
        <div className="Home">
            <h1>Jobly</h1>
            <h2>Welcome back, {user.firstName}!</h2>
        </div>
    )
}

export default Home;