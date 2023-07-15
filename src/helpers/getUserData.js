import JoblyApi from "../api/api";

const getUserData = async (username, setUser) => {
    console.debug(`Getting data for user ${username}.`)
    let res = await JoblyApi.getUser(username);
    setUser({...res})
}

export default getUserData;