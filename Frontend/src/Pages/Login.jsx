import React, { useContext, useState } from 'react';
import { MyContext } from '../Context/MyProvider';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { redirect, setRedirect,userid, setUserId } = useContext(MyContext);
    const { profile, setProfile } = useContext(MyContext);
    const navigate = useNavigate(); // For programmatic navigation

    const OnSubmitData = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const logData = {
            username: username.trim(),
            password: password.trim(),
        };

        console.log('logData', logData);
        await RequestSend(logData);
    };

    async function RequestSend(logData) {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', logData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // Important to include cookies
            });

            console.log("Response:", response.data);
            setRedirect(response.data.token);
            setProfile(response.data.profile);
            localStorage.setItem('redirect', response.data.token);
            localStorage.setItem('profile', response.data.profile);
            localStorage.setItem('id', response.data.id);
            setUserId(response.data.id);
            if(response.data.profile === "user"){
                navigate('/'); // Example redirect
            }
            else{
                navigate('/dashboard'); // Example redirect
            }
            
        } catch (error) {
            console.error("Login error:", error);
            // You can show a user-friendly message here
            alert("Login failed: " + (error.response?.data?.message || "An error occurred."));
        }
    }

    return (
        <div>
            <form onSubmit={OnSubmitData}>
                <label>Username</label>
                <input type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                <label>Password</label>
                <input type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                <NavLink to="/signup">Click to signup</NavLink>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
