import React, {useState, useEffect, useContext} from 'react'
import { GlobalContext} from '../../context/GlobalState';
import { UserContext } from '../../context/UserContext'

//Money formatter function
function moneyFormatter(num) {
  console.log(num)
  let p = Number(num).toFixed(2).split('.');
  return (
    '$ ' + (p[0].split('')[0]=== '-' ? '-' : '') +
    p[0]
      .split('')
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
      }, '') +
    '.' +
    p[1]
  );
}

export default function Balance() {
  const {user} = useContext(UserContext);
  // const { transactions }= useContext(GlobalContext);

  // const amounts = transactions.map(transaction => transaction.amount);

  // const total = amounts.reduce((a, n) => (a + Number(n)), 0);
  const [balance, setBalance] = useState(0);

  const getBalance = () =>{
    fetch(`http://localhost:8080/getBalance?id=${user.id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBalance(data["currentBalance"])
      });
      
  }
  useEffect(() => {
    getBalance()
    const interval=setInterval(()=>{
      getBalance()
      },1000)
 
 
     return()=>clearInterval(interval)
  },[]);

  return (
    <div>
      <h4>Your Balance</h4>
      <h1>{moneyFormatter(balance)}</h1>
    </div>
  )
}
