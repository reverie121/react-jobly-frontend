import React from "react";
import { useState } from "react";

import JoblyApi from "./api/api";

import './css/SearchForm.css';

function SearchForm( { type, setList } ) {
    const INITIAL_STATE = {
        search: ""
    }

    // Sets State for the form data.
    const [formData, setFormData] = useState(INITIAL_STATE);

    const search = async (type, searchTerm) => {
        // Type will be either company or job.
        let res;
        if (type === "company") {
            res = await JoblyApi.getCompanies(searchTerm);
        } else if (type === "job") {
            res = await JoblyApi.getJobs(searchTerm);
        }
        setList(res);
    }

    // Handles value changes (for inputs).
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }
    
    // Handles form submition.
    const handleSubmit = (e) => {
        e.preventDefault();
        // Search for companies or jobs and update state.
        search(type, formData.search);
        // Clear form.
        setFormData(INITIAL_STATE);
    }        

    return(
        <form className="SearchForm">
            <div className="field">
                <label htmlFor="search"></label>
                <input
                    id="search"
                    type="text"
                    name="search"
                    value={formData["search"]}
                    onChange={handleChange}
                />
            </div>                                    
            <button onClick={handleSubmit}>Search</button>
        </form>
    );
};

export default SearchForm;