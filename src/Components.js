import React, { useEffect, useState } from 'react';
import apiFacade from './apiFacade';
import Contact from './Contact';
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
    const [loading, setLoading] = useState(false);


    function handleSubmit(event) {
        event.preventDefault();
        apiFacade.getAllContacts()
            .then(array => {
                setContacts(array);
            })
    }

    function handleDelete(name) {
        /* apiFacade.deleteUser(name)
            .then(updateUsers); */
    }

    function handleEdit() {
        apiFacade.getAllContacts()
            .then(array => {
                setContacts(array);
            })
    }

    return (
        <div>
            <h2>All Contacts</h2>
            <hr className="ownHr"/>
            <button className="btn btn-black btnBorder" onClick={handleSubmit}>Get Contacts</button> <br/> <br/>
            <hr className="ownHr"/>
            <Contact contacts={contacts} loading={loading} handleDelete={handleDelete} />
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