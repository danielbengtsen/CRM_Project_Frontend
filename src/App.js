import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import React, { useState } from 'react';
import {
  Home,
  NoMatch,
  Login,
  LoggedIn,
  CreateContact
} from './Components';
import apiFacade from './apiFacade';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import jwt_decode from "jwt-decode";


function App() {
  const [error, setError] = useState('');
  const [createContactMsg, setCreateContactMsg] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSalesperson, setIsSalesperson] = useState(false);

  const [token, setToken] = useState(apiFacade.getToken());

  const logout = () => {
    apiFacade.logout();
    setIsAdmin(false);
    setIsSalesperson(false);
    setToken("");
  }

  let decoded;

  const login = (user, pass) => {
    setError("");
    apiFacade.login(user, pass)
      .then(res => {
        setError(''); 
        let token = apiFacade.getToken();
        setToken(token);

        decoded = jwt_decode(token);
        if (decoded.roles === "admin") {
          setIsAdmin(true);
        }

        if (decoded.roles === "salesperson") {
          setIsSalesperson(true);
        }

      })
      .catch(err => {
        setError("Couldn't log you in, make sure the username and password are correct.");
        console.log(err);
      })
  }

  const createTheContact = (name, email, company, jobtitle, phone) => {
    apiFacade.createTheContact(name, email, company, jobtitle, phone)
      .then(res => {
        setCreateContactMsg("Contact created succesfully!");
        setTimeout(() => {
          setCreateContactMsg("");
        }, 10000);
        console.log("Contact created succesfully!", res)
      })
      .catch(err => {
        setCreateContactMsg("Error: Couldn't create contact!");
        setTimeout(() => {
          setCreateContactMsg("");
        }, 10000);
        console.log(err);
      })
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Router>
          <div>
            <Header
              token={token}
              loginMsg={token ? "Logout" : "Login"}
              isSalespersonData={isSalesperson}
            />
            <Switch>

              <Route exact path="/">
                <Home />
              </Route>

              <Route path="/create-contact">
                <CreateContact createTheContact={createTheContact} msg={createContactMsg} />
              </Route>

              <Route path="/login-out">
                <div>
                  {!token ? (<Login login={login} />) :
                  (<div>
                    <LoggedIn/>
                    <button onClick={logout} className="btn btn-black btnBorder">Logout</button>
                  </div>)}
                  <p className="errMsg">{error}</p>
                </div>
              </Route>

              <Route component={NoMatch}></Route>
            </Switch>
          </div>
        </Router>
      </Container>
    </React.Fragment>
  );
}

function Header({loginMsg, isSalespersonData}) {
  return (
    <ul className="header">
      <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
      {
        isSalespersonData &&
        (
          <React.Fragment>
              <li><NavLink exact activeClassName="active" to="/create-contact">Create Contact</NavLink></li>
          </React.Fragment>
        )
      }
      <li><NavLink activeClassName="active" to="/login-out">{loginMsg}</NavLink></li>
    </ul>
  );
}

export default App;
