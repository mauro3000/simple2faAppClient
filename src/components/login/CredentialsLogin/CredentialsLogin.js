import {useRef} from 'react';
import '../Login.css';

export default function CredentialsLogin(props){

    const usernameInput = useRef(null);
    const passwordInput = useRef(null);

    const handleClick = () => {
        props.onCredentialsLogin(usernameInput.current.value, passwordInput.current.value);
    }

    return (
        <div className="container">
            <div id="form" className="form">
                <h2>Login to Monitoring Center</h2>
                <div className="form-control">
                    <label>Username</label>
                    <input ref={usernameInput} type="text" id="username" placeholder="Enter username"/>
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input ref={passwordInput} type="password" id="password" placeholder="Enter password"/>
                </div>
                <button onClick={handleClick}>Login</button>
            </div>
        </div>
    )
}