import URLS, {loginURL, populateURL, createContactURL, allContactsURL, singleContactURL, editContactURL, deleteContactURL} from './Settings';

const createTheContact = (name, email, company, jobtitle, phone) => {
    const options = makeOptions("POST", true, { 
        name: name, 
        email: email, 
        company: company,
        jobtitle: jobtitle,
        phone: phone
    });
    return fetch(createContactURL, options)
        .then(handleHttpErrors);
}

const getAllContacts = () => {
    const options = makeOptions("GET", true);
    return fetch(allContactsURL, options)
        .then(handleHttpErrors);
}

const getSingleContact = (email) => {
    const options = makeOptions("POST", true, {email: email});
    return fetch(singleContactURL, options)
        .then(handleHttpErrors);
}

const editContact = (oldEmail, name, email, company, jobtitle, phone) => {
    const options = makeOptions("PUT", true, { 
        name: name, 
        email: email, 
        company: company,
        jobtitle: jobtitle,
        phone: phone
    });
    return fetch(editContactURL + oldEmail, options)
        .then(handleHttpErrors);
}

const deleteContact = (email) => {
    const options = makeOptions("DELETE", true, {email: email});
    return fetch(deleteContactURL + email, options)
        .then(handleHttpErrors);
}

const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
}
const getToken = () => {
    return localStorage.getItem('jwtToken')
}
const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
}
const logout = () => {
    localStorage.removeItem("jwtToken");
}

const login = (user, password) => {
    const options = makeOptions("POST", true, { username: user, password: password });
    return fetch(loginURL, options)
        .then(handleHttpErrors)
        .then(res => { setToken(res.token) })
}

const apiFacade = {
    createTheContact,
    getAllContacts,
    getSingleContact,
    editContact,
    deleteContact,
    setToken,
    getToken,
    loggedIn,
    logout,
    login
}

function makeOptions(method, addToken, body) {
    var opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            'Accept': 'application/json',
        }
    }
    if (addToken && loggedIn()) {
        opts.headers["x-access-token"] = getToken();
    }
    if (body) {
        opts.body = JSON.stringify(body);
    }
    return opts;
}

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

export default apiFacade;