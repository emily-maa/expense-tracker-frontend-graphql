import React,{useState, useContext} from 'react'
import { GlobalContext} from '../../context/GlobalState';
import { UserContext } from '../../context/UserContext'

const AddTransaction = () => {
    const [text,setText] = useState('')
    const [amount,setAmount] = useState(0)
    const {user} = useContext(UserContext);
    console.log(amount)

    const { addTransaction } = useContext(GlobalContext)

    const onSubmit = e => {
        e.preventDefault();

        const newTransaction = {
            id: Math.floor(Math.random() * 100000000),
            text,
            amount
        }

        // addTransaction(newTransaction);
        fetch(`http://localhost:8080/addTransaction?id=${user.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
        })
        // .then(response => response.json())
        // .then(data => console.log('Transaction added:', data))
        // .catch(error => console.error('Error creating transaction:', error));
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
