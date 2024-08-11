import React, {useState, useEffect, useContext} from 'react'
import { GlobalContext} from '../../context/GlobalState';
import { UserContext } from '../../context/UserContext'

//Money formatter function
function moneyFormatter(num) {
  let p = Number(num).toFixed(2).split('.');
  return (
    '$ ' +
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
const IncomeExpenses = () => {
  // const { transactions }= useContext(GlobalContext);
  // const amounts = transactions.map(transaction => transaction.amount);
  // const income = amounts
  //   .filter(item => item > 0)
  //   .reduce((a, n) => (a + Number(n)), 0);

  // const expense = (
  //   amounts.filter(item => item < 0).reduce((acc, item) => (acc += Number(item)), 0) *
  //   -1
  // );
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const {user} = useContext(UserContext);
  
  const getIncomeExpense = () =>{
    fetch(`http://localhost:8080/getBalance?id=${user.id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setIncome(data["income"])
        setExpense(data["expense"])
      });
  }
  useEffect(() => {
    getIncomeExpense()
    const interval=setInterval(()=>{
      getIncomeExpense()
      },1000)
 
 
     return()=>clearInterval(interval)
  }, []);
    

  return (
    <>
      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
    <p className="money plus">{moneyFormatter(income)}</p>
        </div>
        <div>
          <h4>Expense</h4>
    <p className="money minus">{moneyFormatter(expense)}</p>
        </div>
      </div>
    </>
  )
}

export default IncomeExpenses