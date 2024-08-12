import React, {useState, useContext} from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext.js';
import "../App.js";
import "../css/Login.css"
import { useQuery, gql } from '@apollo/client'

const USER_STATUS_QUERY = gql`
  query get_user($id: Int, $password: String){
    user(id: $id) {
      status
      id
      username
      password
    }
    login(
      id:$id
      password:$password
    )
  }
`;
const Login = () => {
    const [id, setId] = useState(null);
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const { data } = useQuery(USER_STATUS_QUERY,{
      skip: id===null || password==="",
      variables:{id:parseInt(id),password}
    });

    const handleLogin = (e) => {
       e.preventDefault();
       if (data){
        const {user,login} = data;
        if(!login){
          setError("Invalid ID or Password");
          return;
        }
        else{
          let user_data = {
            "id":user.id,
            "username":user.username,
            "password":user.password
          }
          setUser(user_data)
          navigate("/dashboard");
          return;
        }
       }
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
