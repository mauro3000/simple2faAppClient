
import Axios from 'axios';
import {useState} from 'react';
import CredentialsLogin from './CredentialsLogin/CredentialsLogin';
import Google2faLogin from './2faLogin/Google2faLogin';

export function Login(props){

    const [currentLogin, setCurrentLogin] = useState('credentials');

    
    
    const onCredentialsLogin = async (username, password) => {

            try{
                const response = await Axios.post("http://localhost:8080/login", {username: username, password: password});

                if(response.data.twoFactEnabled){
                    setCurrentLogin('2fa');
                    props.setTwoFactorsEnabled(true);
                } else {
                    props.setLogged(true);
                    props.setTwoFactorsEnabled(false); 
                }
                props.setUsername(username);
                
            } catch(err){
                console.error(err)
            }

    }

    const onGoogle2faLogin = async (code) => {        
           try{
                await Axios.post("http://localhost:8080/login2fa", {username: props.username, code: code});

                props.setLogged(true);
                
            } catch(err){
                console.error(err)
            }

    }

    return (
        <div className="login-container">
        {(currentLogin === 'credentials') ? <CredentialsLogin onCredentialsLogin={onCredentialsLogin}/> : <Google2faLogin onGoogle2faLogin={onGoogle2faLogin}/>}
        </div>
    )

}