import {useContext, useEffect, useState} from "react";
import {MyContext} from "../Context/MyProvider"
import axios from "axios";
import { NavLink } from "react-router-dom";

const SignUp = () => {

    // const [collection, setCollection] = useState({});
    const [username, setUsername] = useState("")
    const [fullname, setFullname] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")

    const {loginredirect,setLoginredirect} = useContext(MyContext);



    async function OnSubmitData() {
        const newUser = {
            username,
            password,
            fullname,
            confirmpassword
        }
        newUser.username = username.trim();
        newUser.fullname = fullname.trim();
        newUser.password = password;
        newUser.confirmpassword = confirmpassword;
        // setCollection((prev) => ({
        //     ...prev , ...newUser
        // }));

        // setTimeout(() => {
        // }, 1000);
        
        await RequestSend(newUser);

        // console.log(collection);
    }

    async function RequestSend(newUser) {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/signup',newUser, {
                headers : {
                    'Content-Type': 'application/json',
                },
            })
            console.log("Response:", response.data);
            alert("Account Created Try Login ❤️❤️")
            
        } catch (error) {
            alert("Signup failed: " + (error.response?.data?.message || "An error occurred."));
        }
    }

    // useEffect(() => {
    //     console.log(collection);
    // },[collection])


    return(
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>Username</label>
                <input type={"text"} placeholder={"enter username"} onChange={(e) => setUsername(e.target.value)}/>
                <label>fullname</label>
                <input type={"text"} placeholder={"enter fullname"} onChange={(e) => setFullname(e.target.value)}/>
                <label>password</label>
                <input type={"password"} placeholder={"enter password"} onChange={(e) => setPassword(e.target.value)}/>
                <label>confirmpassword</label>
                <input type={"password"} placeholder={"enter password"} onChange={(e) => setConfirmPassword(e.target.value)}/>
                <NavLink to={'/login'}>Click to login</NavLink>
                <button onClick={OnSubmitData}>Submit</button>
            </form>
        </div>
    )
}

export default SignUp