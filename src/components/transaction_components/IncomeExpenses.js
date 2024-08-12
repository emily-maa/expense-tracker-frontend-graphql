import React, {useContext} from 'react'
import { UserContext } from '../../context/UserContext'
import { useQuery, gql } from '@apollo/client'

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

const USER_BALANCE_QUERY = gql`
  query get_user($id:Int){
    user(id:$id){
      balance{
        income
        expense
      }
    }
  }
`;
const IncomeExpenses = () => {
  const {user} = useContext(UserContext);
  const {data} = useQuery(USER_BALANCE_QUERY,{
    variables: {id: user.id},
    pollInterval:500
  });

  return (
    <>
      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
    <p className="money plus">{moneyFormatter(data?.user.balance.income)}</p>
        </div>
        <div>
          <h4>Expense</h4>
    <p className="money minus">{moneyFormatter(data?.user.balance.expense)}</p>
        </div>
      </div>
    </>
  )
}

export default IncomeExpenses