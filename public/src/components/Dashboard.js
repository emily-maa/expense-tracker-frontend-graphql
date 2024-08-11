import React from 'react'
import Header from './transaction_components/Header'
import Balance from './transaction_components/Balance'
import IncomeExpenses from './transaction_components/IncomeExpenses'
import TransactionList from './transaction_components/TransactionList'
import AddTransaction from './transaction_components/AddTransaction'

const Dashboard = () => {
  return (
    <div>
      <Header/>
       <div className="container">
         <Balance/>
         <IncomeExpenses/>
         <TransactionList/>
         <AddTransaction/>
       </div>
    </div>
  )
}

export default Dashboard
