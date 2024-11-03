import React from 'react'

export default function PendingLoanDetails({loandetails,apply}) {
  return (
    <div>
        {apply ? <p>Now You are eligible for loan</p>: <><p>UserID = {loandetails.id}</p>
        <p>Loan Amount = {loandetails.amount}</p>
        <p>Term = {loandetails.term}</p>
        <p>Date = {loandetails.date}</p>
        <p>Paid EMI = {loandetails.numofpaid}</p>
        <p>Loan Paid = {loandetails.paid ? "Completed" : "No"}</p>
        <p>Loan Status = {loandetails.status}</p></>}
    </div>
  )
}
