import React, {  useState } from 'react'
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome} from '@fortawesome/free-solid-svg-icons'
 import '../static/css/Login.css';
 import history from "../helper/history";

const Login = (props) => {
    const [username, setUserName] = useState()
    const [password, setPassword] = useState(null)
    const [errArray, setErrArray] = useState([])
  
   


    const onSubmitHandler = e => {
       
        e.preventDefault()


        axios.post('http://localhost:3080/login/', {
             username, password




        })
        //redirect to dashboard 
            .then(res=> {
                console.log(res)
                if(res?.status===200)
            history.push('/dashboard')
          else
            alert(res?.message)
        })
            .catch(err=>{ 
                console.log(err)
                const errResponse = err.response.data.errors 
                let tempArr = []
                for (const key of Object.keys(errResponse)){
                    tempArr.push(errResponse[key].message)
                }
                setErrArray(tempArr)

  
        })

    }
    return (
        <><div className='body'>
           
        <div className="home">
        <a className="active" href="/dashboard"><FontAwesomeIcon className='icon' icon={faHome} /> Home</a>
 </div>
        <div className="center">
            <h1>Login</h1>
            <form onSubmit={onSubmitHandler}>
                <div className="txt_field">
                    <input type="text" path="username" required="required" onChange={(e) => setUserName(e.target.value)}  />
                    <span></span>
                    <label path="username">Username</label>
                </div>
               
                <div className="txt_field">
                    <input type="password" path="password" required="required" onChange={(e) => setPassword(e.target.value)} />
                    <span></span>
                    <label path="password">Password</label>
                </div>
                
                <div className="pass">Forgot Password?</div>
                <input type="submit" id="completed" value="Login" />
                <div className="signup_link">
                    Not a member?<a className="active1" href="/signup">Sign up</a>
                </div>
            </form>
            {errArray.map((err, i) => (<p key={i}> {err}</p>))}  
        </div>
        </div></>
    )





}
export default Login;
