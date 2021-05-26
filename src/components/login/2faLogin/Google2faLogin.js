import '../Login.css';
import {useRef} from 'react';
import VerificationInput from 'react-verification-input';

export default function Google2faLogin(props){

    const codeInputRef = useRef(null);

    const handleClick = () => {
        props.onGoogle2faLogin(codeInputRef.current.value);
    }

    const getInputRef = (ref) => {
        codeInputRef.current = ref;
    }

    return (
        <div className="container">
            <div id="form" className="form">
                <h2>Google Authentication login</h2>
                <div className="form-control">
                    <label>Code</label>
                    <VerificationInput length={6} validChars="0-9" placeholder="" autoFocus={true} getInputRef={getInputRef}/>
                </div>
                <button type="button" onClick={handleClick}>Login</button>
            </div>
        </div>
    )
}