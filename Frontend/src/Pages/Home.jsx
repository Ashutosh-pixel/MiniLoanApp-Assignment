import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../Context/MyProvider';
import axios from 'axios';
// import  jsonwebtoken  from 'jsonwebtoken';
import PendingLoanDetails from './../Components/PendingLoanDetails';
import LoanHistory from '../Components/LoanHistory';

export default function Home() {

  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(Date.now);
  const [term, setTerm] = useState(0);
  const [decoded, setDecoded] = useState(null);
  const { userid, setUserId } = useContext(MyContext);

  const [loandetails, setLoandetails] = useState({})
  const [apply, setApply] = useState(false);
  const [loanHistory, setloanHistory] = useState({});
  
  useEffect(() => {
    const token = localStorage.getItem('redirect');
    
    if(token){
      console.log(userid)
    }
    else{
      console.log("false");
    }

    GetLoadDetails();
  }, [userid])


  
  const onClickHandler = () => {
    const loandata = {
      amount,
      date,
      term,
      id: userid,
    }

    SendLoadRequest(loandata);
  }

  async function SendLoadRequest(loandata) {
    try {
            const response = await axios.post(`http://localhost:3000/home/${userid}`, loandata, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // Important to include cookies
            });
            // console.log(response);
        } catch (error) {
            alert(error.response?.data?.message)
        }
  }

  async function GetLoadDetails() {
    try {
            const response = await axios.get(`http://localhost:3000/home/${userid}`);
            console.log(response);
            if(!response.data.apply){
              setLoandetails((prev) => prev=response.data.data)
              console.log(loandetails)
              setApply(false)
            }
            else{
              setApply(true);
            }
            setloanHistory(response.data.loanhistory);
            console.log(response.data.loanhistory)
        } catch (error) {
            alert(error.response?.data?.message)
        }
  }

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Amount</label>
        <input type="text" onChange={(e) => setAmount(e.target.value)}/>
        <label>term</label>
        <input type="text" onChange={(e) => setTerm(e.target.value)}/>
        <label>Date</label>
        <input type="Date" onChange={(e) => setDate(e.target.value)}/>
        <button type='submit' onClick={onClickHandler}>submit</button>
      </form>


      <PendingLoanDetails loandetails={loandetails} apply={apply}/>

      <LoanHistory loanHistory={loanHistory}/>
    </div>
  )
}
