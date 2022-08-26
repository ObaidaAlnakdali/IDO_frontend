import React, {useState} from 'react'
import logo from '../image/Logo.png'
import man from '../image/Man.png'
import woman from '../image/Woman.png'
import { useNavigate } from "react-router-dom";
import './login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }


  const signin = () => {
    navigate(`/dashboard`)
  }

  return (
    <div className="login">
      <div className='container'>
        <div className='part-1'>
          <div className='image'>
            <img src={logo} alt='' />
          </div>
          <div className="images">
            <img src={woman} alt='' />
            <img src={man} alt='' />
          </div>
        </div>
        <div className='part-2'>
          <div className="form">
          <h1>Time to Work!</h1>
          <div className="input-field">
            <label>Email</label>
            <input type="text" name="email" onChange={(e) => onChange(e)}/>
          </div>
          <div className="input-field">
            <label>Password</label>
            <input type="password" name="password" onChange={(e) => onChange(e)}/>
          </div>
          <button onClick={() => signin()}>SIGN IN</button>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default Login