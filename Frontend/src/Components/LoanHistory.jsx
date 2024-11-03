import React from 'react';

export default function LoanHistory({ loanHistory = [] }) { // Default to an empty array
  // Check if loanHistory is an array
  if (!Array.isArray(loanHistory)) {
    return <div>No loan history available.</div>;
  }

  return (
    <div>LOAN HISTORY
      {loanHistory.map((element, index) => ( // Single level map
        <div key={element.id}> 
          <span>Loan Amount: {element.amount}</span>
          <span> </span>
          <span>Term: {element.term}</span>
          <span> </span>
          <span>Date: {element.date}</span>
          <span> </span>
          <span>Paid EMI: {element.numofpaid}</span>
          <span> </span>
          <span>Loan Paid: {element.paid ? "Completed" : "No"}</span>
          <span> </span>
          <span>Loan Status: {element.status}</span> 
        </div>
      ))}
    </div>
  );
}
