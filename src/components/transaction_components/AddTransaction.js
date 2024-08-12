import React,{useState, useContext} from 'react'
import { UserContext } from '../../context/UserContext'
import { useMutation, gql } from '@apollo/client'

const NEW_TRANSACTION = gql`
    mutation changeTransaction($id: Int, $transaction_id: Int, $text: String, $amount: Float){
        addTransaction(
            id: $id
            transaction_id: $transaction_id
            text: $text
            amount: $amount
        )
        {
            transaction_id
            text
            amount
        }
    }
`;

const AddTransaction = () => {
    const [text,setText] = useState('')
    const [amount,setAmount] = useState(0)
    const {user} = useContext(UserContext);
    const [createTransaction] = useMutation(NEW_TRANSACTION)

    const onSubmit = e => {
        e.preventDefault();

        createTransaction({
            variables: {id:user.id,transaction_id:Math.floor(Math.random()*100000000),text,amount:Number(amount)}
        })
    }
    return (
        <>
        <h3>Add new transaction</h3>
        <form onSubmit={onSubmit}>
            <div className="form-control">
            <label htmlFor="text">Text</label>
            <input type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Enter text..." />
            </div>
            <div className="form-control">
            <label htmlFor="amount"
                >Amount <br />
                (negative - expense, positive - income)</label
            >
            <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Enter amount..." />
            </div>
            <button className="btn">Add transaction</button>
        </form>
        </>
    )
}

export default AddTransaction
