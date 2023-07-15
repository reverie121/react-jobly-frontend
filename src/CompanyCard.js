import React from 'react';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import './css/CompanyCard.css';

function CompanyCard( { company } ) {
    return(
        <div className="CompanyCard">
            <Link to={`../companies/${company.handle}`}>
            <h2>{company.name}</h2>
            <p>{company.description}</p>
            </Link>
        </div>
    )
};

export default CompanyCard;