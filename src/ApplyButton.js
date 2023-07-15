import React, { useContext, useEffect, useState } from "react";

import JoblyApi from "./api/api";
import UserContext from "./UserContext";

import './css/ApplyButton.css';

function ApplyButton( { jobID } ) {
    // Access Context for user and setUser.
    const { user, setUser } = useContext(UserContext);
    const [ hasApplied, setHasApplied ] = useState(false);

    useEffect(() => {
        if (user.applications && user.applications.includes(jobID)) {
            setHasApplied(true);
        }
    }, [user])

    if (hasApplied === true) {
        return(
            <button disabled className="Applied">Applied</button>
        )
    }

    const handleClick = async (e) => {
        try {
            await JoblyApi.applyForJob(user.username, jobID);
            let updatedUser
            user.applications ?
                updatedUser = {...user, applications: [...user.applications, jobID]}
                :
                updatedUser = {...user, applications: [jobID]};
            setUser(updatedUser);
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <button className="ApplyButton" onClick={handleClick}>Apply</button>
    );
};

export default ApplyButton;