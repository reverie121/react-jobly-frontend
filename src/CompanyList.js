import React, { useEffect, useState, useContext } from "react";

import bouncer from "./helpers/bouncer";
import JoblyApi from "./api/api";
import UserContext from "./UserContext";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";

import './css/CompanyList.css';

function CompanyList() {
    // Access Context for user and setUser.
    const { user, setUser } = useContext(UserContext);

    // Call the bouncer.
    let b = bouncer(user, setUser);
    if (b) return b;

    // Set state for this component.
    const [isLoading, setIsLoading] = useState(true);
    const [companyList, setCompanyList] = useState([]);

    // Get list of companies from backend.
    async function getCompanyList() {
        const companies = await JoblyApi.getCompanies();
        setCompanyList(companies);
        setIsLoading(false);
    }

    // Get list of companies when component first renders.
    useEffect(() => {
        getCompanyList();
    }, []);

    // isLoading will be true until the company list is ready.
    if (isLoading) {
        return <h3>Loading &hellip;</h3>;
    }

    return(
        <div className="CompanyList">
            <SearchForm type="company" setList={(list) => setCompanyList(list)}/>
            {companyList.length === 0 && <h3>No results. Try again.</h3>}
            {companyList.length > 0 && companyList.map(c => <CompanyCard key={c.handle} company={c} />)}
        </div>
    )
};

export default CompanyList;