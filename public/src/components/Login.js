import React, {useState, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext.js';
import "../App.js";
import "../css/Login.css"


const Login = () => {
    const [id, setId] = useState(null);
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleLogin = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/login?id=${id}&&password=${password}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if(!data){
            setError("Invalid ID or Password");
                  return;
          }
          else{
            fetch(`http://localhost:8080/getUser?id=${id}`)
            .then((res) => {
              return res.json();
            })
            .then((user_data)=>{
              setUser(user_data) 
              navigate("/dashboard");
              return;
            })
          }
        })
        .catch(error => {
          console.error("Error with fetching data")
        });
    }
      
    return (
    <>
        <p className="title">Login</p>

        <form className="Login" onSubmit={handleLogin}>
            <div>
                <label>ID:</label>
                <input
                    type="number"
                    value={id}
                    onChange={(e) =>setId(e.target.value)}
                    required
                />
            </div>
            <div>
            <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) =>setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <p>{error}</p>}
            <button type="submit">Login</button>
        </form>
    </>
  )
}

export default Login
