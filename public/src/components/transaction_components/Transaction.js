import React,{ useContext } from 'react'
import { GlobalContext} from '../../context/GlobalState';
import { UserContext } from '../../context/UserContext'

const Transaction = ( {transaction} ) => {
    // const {deleteTransaction } = useContext(GlobalContext)
    const sign = transaction.amount < 0 ? '-':'+';
    const {user} = useContext(UserContext);

    const deleteTransaction = id => {
      fetch(`http://localhost:8080/deleteTransaction/${transaction.id}?id=${user.id}`, {
        method: "DELETE",
      })
        // .then(response => response.json())
        // .then(() => {
        //   setUsers(values => {
        //     return values.filter(item => item.id !== id)
        //   })
        //   AppToaster.show({
        //     message: "User deleted successfully",
        //     intent: "success",
        //     timeout: 3000,
        //   })
        // })
    }

  return (
    <li className={transaction.amount < 0 ? 'minus':'plus'}>
        {transaction.text} <span>{sign}${Math.abs(transaction.amount)}</span><button className="delete-btn" onClick={()=>deleteTransaction(transaction.id)}>x</button>
    </li>
  )
}

export default Transaction
