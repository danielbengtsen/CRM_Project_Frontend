import React, { useEffect, useState } from 'react';
import apiFacade from './apiFacade';
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from "jwt-decode";
import 'react-tabs/style/react-tabs.css';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import BusinessIcon from '@material-ui/icons/Business';
import WorkIcon from '@material-ui/icons/Work';
import PhoneIcon from '@material-ui/icons/Phone';


export function Home() {
    return (
        <div>
            <div>
                <h2>Welcome</h2>
                <hr className="ownHr"></hr>
            </div>
            <div className="list-group">
                <h5>Please login.</h5>
            </div>
        </div>
    );
}

export function Login({ login }) {
    const init = { username: "", password: "" };
    const [loginCredentials, setLoginCredentials] = useState(init);

    const performLogin = (evt) => {
        evt.preventDefault();
        login(loginCredentials.username, loginCredentials.password);
    }
    const onChange = (evt) => {
        setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value })
    }
    return (
        <div>
            <h2>Login here</h2>
            <form onChange={onChange}>
                    <Grid item xs={2} className="mb-2">
                        <input className="form-control ownInputs" placeholder="Username" id="username" />
                    </Grid>

                    <Grid item xs={2} className="mb-2">
                        <input type="password" className="form-control ownInputs" placeholder="Password" id="password" />
                    </Grid>
                    
                    <button onClick={performLogin} type="button" className="btn btn-black btnBorder">Login</button>
            </form>

            <br />
            <hr className="ownHr" />
        </div>
    )
}

export function CreateContact({ createTheContact, msg })
{
    const init = { name: "", email: "", company: "", jobtitle: "", phone: "" };
    const [contactInformation, setContactInformation] = useState(init);

    const submitContact = (evt) => {
        evt.preventDefault();
        createTheContact(contactInformation.name, contactInformation.email, contactInformation.company, contactInformation.jobtitle, contactInformation.phone);
    }
    const onChange = (evt) => {
        setContactInformation({ ...contactInformation, [evt.target.id]: evt.target.value })
    }
    return (
        <div>
            <h2>Insert contact information here</h2>
            <form onChange={onChange}>
                    <Grid item xs={2} className="mb-2">
                        <input className="form-control ownInputs" placeholder="Name" id="name" />
                    </Grid>

                    <Grid item xs={2} className="mb-2">
                        <input className="form-control ownInputs" placeholder="Email" id="email" />
                    </Grid>

                    <Grid item xs={2} className="mb-2">
                        <input className="form-control ownInputs" placeholder="Company" id="company" />
                    </Grid>

                    <Grid item xs={2} className="mb-2">
                        <input className="form-control ownInputs" placeholder="Jobtitle" id="jobtitle" />
                    </Grid>

                    <Grid item xs={2} className="mb-2">
                        <input className="form-control ownInputs" placeholder="Phone" id="phone" />
                    </Grid>
                    
                    <button onClick={submitContact} type="button" className="btn btn-black btnBorder">Create Contact</button>
            </form>

            <br />
            <hr className="ownHr" />
            <p>{msg}</p>
        </div>
    )
}

export function AllContacts({ msg })
{
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState('');


    function showAllContacts(event) {
        event.preventDefault();
        apiFacade.getAllContacts()
            .then(array => {
                setContacts(array);
            })
            .catch(err => {
                Promise.resolve(err.fullError).then(function (value) {
                    setError(value.message);
                });
                setTimeout(() => {
                    setError("");
                  }, 10000)
            });
    }

    let displayContacts = contacts.map((contact) => (
        <div>
            <ul className="list-group mb-4" key={contact.email}>
                <Grid container spacing={0}>
                    <Grid item xs={3}>
                        <li className="list-group-item ownList">
                            <div className="mb-1">
                                <PersonIcon /> {contact.name}
                            </div>
                            <div className="mb-1">
                                <AlternateEmailIcon /> {contact.email}
                            </div>
                            {/* <div className="mb-1">
                                <BusinessIcon /> {contact.company}
                            </div>
                            <div className="mb-1">
                                <WorkIcon /> {contact.jobtitle}
                            </div> */}
                            <div className="mb-1">
                                <PhoneIcon /> {contact.phone}
                            </div>
                            <div>
                                <button type="button" className="btn btn-black btnBorder">Show details</button>
                            </div>
                        </li>
                    </Grid>
                </Grid>
            </ul>
        </div>
    ));

    return (
        <div>
            <h2>All Contacts</h2>
            <form>
                    <button onClick={showAllContacts} type="button" className="btn btn-black btnBorder">Show all contacts</button>
            </form>

            <br />
            <hr className="ownHr" />
            <p>{msg}{error}</p>

            {displayContacts}
        </div>
    )
}

export function LoggedIn() {
    const token = apiFacade.getToken();
    const decoded = jwt_decode(token); // jwt_decode is an external library

    return (
        <div>
            <h2>You are logged in!</h2>
            <p>Username: {decoded.username}, Role: {decoded.roles}</p>
        </div>
    )
}

export function NoMatch() {
    return (
        <div>
            <h2>Sorry, we couldn't find that page...</h2>
        </div>
    );
}