import React,{ useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useMutation, gql } from '@apollo/client'

const DELETED_TRANSACTION = gql`
    mutation changeTransaction($id: Int, $transaction_id: Int){
        deleteTransaction(
            id: $id
            transaction_id: $transaction_id
        )
        {
            transaction_id
            text
            amount
        }
    }
`;

const Transaction = ( {transaction} ) => {
    const sign = transaction.amount < 0 ? '-':'+';
    const {user} = useContext(UserContext);
    const[removeTransaction] = useMutation(DELETED_TRANSACTION);

    const deleteTransaction = id => {
      removeTransaction({
            variables: {id:user.id,transaction_id:transaction.transaction_id}
        })
    }

  return (
    <li className={transaction.amount < 0 ? 'minus':'plus'}>
        {transaction.text} <span>{sign}${Math.abs(transaction.amount)}</span><button className="delete-btn" onClick={()=>deleteTransaction(transaction.transaction_id)}>x</button>
    </li>
  )
}

export default Transaction
