import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const [allloandetails, setAllloandetails] = useState([]);

  useEffect(() => {
    fetchLoanDetails();
  }, []);

  const fetchLoanDetails = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin');
      const users = response.data.users;
      if (users.length > 0) {
        setAllloandetails(users);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch loan details");
    }
  };

  const ClickHandler = async (loanid) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/changestate`,
        { userid: loanid },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log(response);
      // Refresh loan details to show updated status
      fetchLoanDetails();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to change loan status");
    }
  };

  return (
    <div>
      {allloandetails.length > 0 ? (
        <div>
          {allloandetails.map((item) => (
            <div key={item.id}>
              <span>User ID: {item.id}</span>
              <span> </span>
              <span>Loan Amount: {item.amount}</span>
              <span> </span>
              <span>Term: {item.term}</span>
              <span> </span>
              <span>Date: {item.date}</span>
              <span> </span>
              <span>Paid EMI: {item.numofpaid}</span>
              <span> </span>
              <span>Loan Paid: {item.paid ? 'Completed' : 'No'}</span>
              <span> </span>
              <span>Loan Status: {item.status}</span>
              {item.status === "Pending" && (
                <button onClick={() => ClickHandler(item.id)}>Change State</button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>No loan details available</div>
      )}
    </div>
  );
}
