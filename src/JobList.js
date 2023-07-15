import React, { useState, useEffect, useContext } from "react";

import bouncer from "./helpers/bouncer";
import JoblyApi from "./api/api";
import UserContext from "./UserContext";
import JobCard from "./JobCard";
import SearchForm from "./SearchForm";

import './css/JobList.css';

function JobList() {
    // Access Context for user and setUser.
    const { user, setUser } = useContext(UserContext);

    // Call the bouncer.
    let b = bouncer(user, setUser);
    if (b) return b;

    // Set state for component.
    const [isLoading, setIsLoading] = useState(true);
    const [jobList, setJobList] = useState([]);

    // Get list of jobs from backend.
    async function getJobList() {
        const jobs = await JoblyApi.getJobs();
        setJobList(jobs);
        setIsLoading(false);
    }

    // Get list of jobs when component first renders.
    useEffect(() => {
        getJobList();
    }, []);

    // isLoading will be true until the company list is ready.
    if (isLoading) {
        return <h3>Loading &hellip;</h3>;
    }

    return(
        <div className="JobList">
            <SearchForm type="job" setList={(list) => setJobList(list)}/>
            {jobList.length === 0 && <h3>No results. Try again.</h3>}
            {jobList.length > 0 && jobList.map(j => <JobCard key={j.id} job={j} />)}
        </div>
    )
};

export default JobList;