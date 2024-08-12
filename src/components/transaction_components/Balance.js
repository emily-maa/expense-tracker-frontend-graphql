import React, {useContext} from 'react'
import { UserContext } from '../../context/UserContext'
import { useQuery, gql } from '@apollo/client'

//Money formatter function
function moneyFormatter(num) {
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

const USER_BALANCE_QUERY = gql`
  query get_user($id:Int){
    user(id:$id){
      balance{
        net_balance
      }
    }
  }
`;

export default function Balance() {
  const {user} = useContext(UserContext);
  const {data} = useQuery(USER_BALANCE_QUERY,{
    variables: {id: user.id},
    pollInterval:500
  });

  return (
    <div>
      <h4>Your Balance</h4>
      <h1>{moneyFormatter(data?.user.balance.net_balance)}</h1>
    </div>
  )
}
