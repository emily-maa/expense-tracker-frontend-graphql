import React, {useContext} from 'react'
import Transaction from './Transaction'
import { UserContext } from '../../context/UserContext'
import { useQuery, gql } from '@apollo/client'

const USER_TRANSACTION_QUERY = gql`
  query get_user($id:Int){
    user(id:$id){
      transactions{
        transaction_id
        text
        amount
      }
    }
  }
`;

export const TransactionList = () => {
  // const { transactions }= useContext(GlobalContext);
  // const [transactions, setTransactions] = useState([]);
  const {user} = useContext(UserContext);
  const {data} = useQuery(USER_TRANSACTION_QUERY,{
    variables: {id: user.id},
    pollInterval:500
  });
  
  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {data?.user.transactions?.map(transaction => (<Transaction key={transaction.transaction_id} transaction={transaction}/>))}
      </ul>
    </>
  )
}

export default TransactionList

