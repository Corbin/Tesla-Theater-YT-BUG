import React, {useState, useEffect} from 'react';
import App from './App.jsx';
import axios from 'axios';
import md5 from 'md5';
import { REACT_APP_DEV_MODE, REACT_APP_PROD_MODE } from "@env";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successStatus, setSuccessStatus] = useState(false);
  const [loginMessage, setLoginMessage] = useState('Please enter your username and password.')
  const [userID, setUserID] = useState(undefined);

  useEffect(() => {
    const loggedIn = localStorage.getItem('teslaTheaterUser');
    if (loggedIn) {
      let loginObject = JSON.parse(loggedIn);
      let user = loginObject.username;
      let token = loginObject.token;
      axios.get('/Users', {params: {username:user, password:token}})
      .then(({data}) => data.loginSuccessful && (setUserID(data.id), setSuccessStatus(true), localStorage.setItem('teslaTheaterUser', JSON.stringify({username:user, token, lastLogin: Date.now()}))))
      .catch(err => console.log(err))
    }
  }, []);

  const handleClicks = (submitter) => {
    submitter.name === 'login' ?
      axios.get('/Users', {params: {username, password}})
      .then(({data}) => data.loginSuccessful ? (setSuccessStatus(true), setUserID(data.id), setLoginMessage('Login Successful!'), localStorage.setItem('teslaTheaterUser', JSON.stringify({username, token:password, lastLogin: Date.now()}))) : (setSuccessStatus(false), setLoginMessage('Incorrect username/password combination.')))
      .catch(err => console.log(err))
    :
      axios.post('/Users', {username, password})
      .then(({data}) => data.registrationSuccessful && (setSuccessStatus(true), setLoginMessage('Registration Successful!')))
      .catch(err => (setSuccessStatus(false), setLoginMessage('Username already taken.')))
  }

  return (
    !successStatus ?
    <div className="Login">
      <form onSubmit={(e) => {e.preventDefault(); handleClicks(e.nativeEvent.submitter)}}>
      <h5 className="Title">Login</h5>
      <h6 className="LoginMessage">{loginMessage}</h6>
      <label htmlFor="Username">Username:</label>
      <input id="Username" name="Username" type="text" default="" minLength="2" maxLength="24" onChange={(e) => setUsername(e.target.value)}/>
      <label htmlFor="Password">Password:</label>
      <input id="Password" name="password" autoComplete="true" type="password" minLength="8" maxLength="32" onChange={(e) => setPassword(md5(e.target.value + process.env.PASSWORD_SALT))}/>
      <div className="actionButtons">
        <button type="submit" name="login" action="submit">Login</button>
        <button type="submit" name="register" action="submit">Register</button>
      </div>
      </form>
    </div>
  : <App loggedIn={setSuccessStatus} setUsername={setUsername} setPassword={setPassword} setLoginMessage={setLoginMessage} userID={userID}/>
  )
}

export default Login;