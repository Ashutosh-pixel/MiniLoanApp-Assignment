import axios from 'axios';
import React from 'react'

export default function PendingLoanDetails({loandetails,apply,userid}) {

  const onClickHandler = async() => {
    try {
          const response = await axios.post(`http://localhost:3000/home/button/${userid}`);
          console.log(response);
          alert(response?.data?.message)
        } catch (error) {
          alert(error)
        }
  }

  return (
    <div>
        {apply ? <p>Now You are eligible for loan</p>: <><p>UserID = {loandetails.id}</p>
        <p>Loan Amount = {loandetails.amount}</p>
        <p>Term = {loandetails.term}</p>
        {!apply  && loandetails.status == "Approved"&& Array.from({ length: (loandetails.term-loandetails.numofpaid) }, (_, index) => (
          <button onClick={onClickHandler} key={index}>EMI Pay {index + 1}</button>
        ))}
        <p>Date = {loandetails.date}</p>
        <p>Paid EMI = {loandetails.numofpaid}</p>
        <p>Loan Paid = {loandetails.paid ? "Completed" : "No"}</p>
        <p>Loan Status = {loandetails.status}</p></>}
    </div>
  )
}
