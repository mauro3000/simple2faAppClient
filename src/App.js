import './App.css';
import {useState} from 'react';
import { Login } from './components/login/Login';
import Home from './components/home/Home';

function App() {

  const [logged, setLogged] = useState(false);
  const [twoFactorsEnabled, setTwoFactorsEnabled] = useState(false);
  const [username, setUsername] = useState(null);


  return (
    <div className="App">
      {logged ? <Home twoFactorsEnabled={twoFactorsEnabled} username={username}
      setTwoFactorsEnabled={setTwoFactorsEnabled}/> : <Login username={username }setLogged={setLogged} setTwoFactorsEnabled={setTwoFactorsEnabled} setUsername={setUsername}/>}      
    </div>
  );
}

export default App;
