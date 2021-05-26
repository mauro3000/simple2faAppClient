import "./Home.css";
import Axios from 'axios';
import {useState, useRef} from 'react';
import VerificationInput from 'react-verification-input'

export default function Home(props){

    const [qrCodeSrc, setQrCodeSrc] = useState(null);
    const codeInputRef = useRef(null);
    const getInputRef = (ref) => {
        codeInputRef.current = ref;
    }

    const handle2faSwitch = async (e) => {
     try{
        if(e.target.checked){
            const response = await Axios.post("http://localhost:8080/2faEnable", {username: props.username, twoFactEnabled: true});

            setQrCodeSrc(response.data.qrCodeSrc);

        } else {
            
            await Axios.post("http://localhost:8080/2faEnable", {username: props.username, twoFactEnabled: false});
            props.setTwoFactorsEnabled(false);
        }
     } catch(err){
        console.error(err);
    }
    }

    const verifyCode = async () => {
        try{
            await Axios.post("http://localhost:8080/confirm2faEnabling", {username: props.username, code: codeInputRef.current.value});

            props.setTwoFactorsEnabled(true);
            setQrCodeSrc(null);
            
        } catch(err){
            console.error(err)
        }
    }

    return (
        <div className="home-page">
            <div className="home-container">
                <h1> Home </h1>
                <h4>Hello {props.username}!</h4>
            </div>
            <div className="settings-container">
                <h3>Settings</h3>
                <div className="settings">
                    <label>
                        Enable two factors authentication
                    </label>
                    <label className="switch">
                        <input type="checkbox" onChange={handle2faSwitch} checked={props.twoFactorsEnabled}/>
                        <span className="slider round"></span>
                    </label>                    
                </div>
                {qrCodeSrc ? (<div className="qrcode-container">
                    <img src={qrCodeSrc} alt=""/>
                    <div className="verification-div">
                    <label>Code</label>
                    <VerificationInput length={6} 
                        removeDefaultStyles
                        validChars="0-9" 
                        placeholder="" 
                        autoFocus={true} 
                        getInputRef={getInputRef}
                        container={{
                            className: 'verification-container',
                        }}
                        characters={{
                            className: 'characters',
                        }}
                        character={{
                            className: 'character',
                            classNameInactive: 'character--inactive',
                            classNameSelected: 'character--selected',
                        }}/>
                        <div className="apply-button-div">
                            <button className="apply-button" onClick={verifyCode}>Apply</button>
                        </div>    
                        
                    </div>
                </div>) : null}                
            </div>
        </div>
    )
}