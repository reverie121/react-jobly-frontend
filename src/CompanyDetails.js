import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import bouncer from "./helpers/bouncer";
import JoblyApi from "./api/api";
import UserContext from "./UserContext";
import JobCard from "./JobCard";

import './css/CompanyDetails.css';

function CompanyDetails() {
    // Access Context for user and setUser.
    const { user, setUser } = useContext(UserContext);

    // Call the bouncer.
    let b = bouncer(user, setUser);
    if (b) return b;

    // Set state and get required params for component.
    const [isLoading, setIsLoading] = useState(true);
    const [company, setCompany] = useState({});
    const [companyJobs, setCompanyJobs] = useState([]);
    const { companyHandle } = useParams();
    
    // Get company information from backend.
    async function getCompany() {
        const [companyResult, jobsResult] = await Promise.all([
            JoblyApi.getCompany(companyHandle),
            JoblyApi.getCompanyJobs(companyHandle)
        ]);
        setCompany(companyResult);
        setCompanyJobs(jobsResult);
        setIsLoading(false);
    }

    // Get company information when component first renders.
    useEffect(() => {
        getCompany();
    }, []);

    // isLoading will be true until the company list is ready.
    if (isLoading) {
        return <h3>Loading &hellip;</h3>;
    }

    return(
        <div className="CompanyDetails">
            <div className="DetailsHeader">
                <h2>{company.name}</h2>
                <p>{company.description}</p>
            </div>
            <div className="JobsContainer">
                {companyJobs.map(j => <JobCard key={j.id} job={j}/>)}
            </div>
        </div>
    )
};

export default CompanyDetails;