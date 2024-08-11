import React, {useContext} from 'react'
import { UserContext } from '../../context/UserContext'

const Header = () => {
  const {user} = useContext(UserContext);
  return (
    <div>
      <h2>Expense Tracker</h2>
      <h3>Welcome {user.username}</h3>
    </div>
  )
}

export default Header
