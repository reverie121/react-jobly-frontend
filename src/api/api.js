import axios from "axios";

import { fromLocal } from "../helpers/localStorageHelper";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    // the token for interactive with the API will be stored here.
    const { token } = fromLocal()

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // USER API Routes

  /** Register a new user. */

  static async registerUser(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }  

  /** Login in a user, returning a token. */

  static async loginUser(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token
  }

  /** Get details on a user by username. */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Edit user details. */

  static async editUser(data) {
    const {username, ...userData} = data;
    let res = await this.request(`users/${username}`, userData, "patch");
    return res.user;
  }  

  /** Submit user's job application. */

  static async applyForJob(username, jobID) {
    let res = await this.request(`users/${username}/jobs/${jobID}`, {}, "post");
    console.log(res);
  }


  // COMPANY API Routes

  /** Get a list of companies. */

  static async getCompanies(searchTerm) {
    const nameLike = searchTerm ? `?name=${searchTerm}` : '';
    let res = await this.request(`companies/${nameLike}`);
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get a company's posted jobs. */

  static async getCompanyJobs(handle) {
    let res = await this.request(`jobs/`);
    res = res.jobs.filter(j => j.companyHandle === handle);
    return res;
  }

  // JOB API Routes

  /** Get a list of jobs. */

  static async getJobs(searchTerm) {
    const titleLike = searchTerm ? `?title=${searchTerm}` : '';
    let res = await this.request(`jobs/${titleLike}`);    
    return res.jobs;
  }

  /** Get details on a job by id. */

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

}

export default JoblyApi;