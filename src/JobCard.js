import React from "react";

import ApplyButton from "./ApplyButton";

import './css/JobCard.css';

function JobCard( { job } ) {
    return(
        <div className="JobCard">
            <h4>{job.title}</h4>
            {job.salary && <p>Salary: ${job.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>}
            {job.equity && <p>Equity: {job.equity}%</p>}
            <ApplyButton jobID={job.id} />
        </div>
    )
};

export default JobCard;