import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome} from '@fortawesome/free-solid-svg-icons'
import '../static/css/Login.css'

const SignUp = (props) => {



    
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
  

    
    const [errArray, setErrArray] = useState([])

    const onSubmitHandler = e => {

        e.preventDefault()







        axios.post('http://localhost:3080/signup', {


            username, email, password, role




        })
                .then(res=> console.log(res))
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
                 <a className="active" href="/"><FontAwesomeIcon className='icon' icon={faHome} /> Home</a>
 </div>
        <div className="center">
            <h1>Sign Up</h1>
            <form onSubmit={onSubmitHandler}>
                <div className="txt_field">

                    <input type="text" path="username" required="required" onChange={(e) => setUserName(e.target.value)} />
                    <span></span>
                    <label path="username">Username</label>

                </div>
              
                <div className="txt_field">
                    <input type="text" path="email" required="required" onChange={(e) => setEmail(e.target.value)} />
                    <span></span>
                    <label path="email">Email</label>
                </div>
              
                <div className="txt_field">
                    <input type="password" path="password" required="required" onChange={(e) => setPassword(e.target.value)}  />
                    <span></span>
                    <label path="password">Password</label>
                </div>


                <div className="role_field">
                {/* <label>
              Assign To */}
          <select name="role" id="role" onChange={(e) => setRole(e.target.value)}>
                    <option hidden="">Select a Role</option> 
                    <option value="fan">Fan</option>
                    <option value="artist">Artist</option>
                    <option value="venue">Venue</option>
                   
                </select>
                {/* </label> */}


                </div>

                <input type="submit" id="completed" value="SignUp" />

                <div className="signup_link">
                    Already a member?<a className="active1" href="/login">Login</a>
                </div>

            </form>
            {errArray.map((err, i) => (<p key={i}> {err}</p>))}  
        </div>
        </div></>
    )
}

export default SignUp;
