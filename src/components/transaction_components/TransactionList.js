import React, {useState, useEffect, useContext} from 'react'
import { GlobalContext} from '../../context/GlobalState';
import Transaction from './Transaction'
import { UserContext } from '../../context/UserContext'

export const TransactionList = () => {
  // const { transactions }= useContext(GlobalContext);
  const [transactions, setTransactions] = useState([]);
  const {user} = useContext(UserContext);

  const getTransactions = () =>{
    fetch(`http://localhost:8080/getTransactions?id=${user.id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setTransactions(data)
        console.log(transactions);
        console.log(transactions.type)
      });

  }
  useEffect(() => {
    getTransactions()
    const interval=setInterval(()=>{
      getTransactions()
      },1000)
 
 
     return()=>clearInterval(interval)
  }, []);
  
  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => (<Transaction key={transaction.id} transaction={transaction}/>))}
        
      </ul>
    </>
  )
}

export default TransactionList

