import './App.css'
import SignUp from "./Pages/SignUp.jsx";
import { Routes,Route, Navigate } from "react-router-dom";
import Login from './Pages/Login.jsx';
import Home from './Pages/Home.jsx';
import { useContext, useEffect } from 'react';
import { MyContext } from './Context/MyProvider.jsx';
import Admin from './Pages/Admin.jsx';
import { Buffer } from 'buffer';
window.Buffer = Buffer; // Make it available globally


function App() {

  const {redirect,profile, setProfile} = useContext(MyContext);


  useEffect(() => {
    console.log('redirect', redirect)
    console.log('profile', profile)
  },[redirect,profile])


  return (
    <div>
      <Routes>
        {/* <Route path='/login' element={redirect != null && profile === "user"? <Navigate to={'/'}/> : <Login/>}/> */}
        <Route path='/login' element={redirect != null && profile === "user" ? <Navigate to={'/'}/>: redirect != null && profile === "admin" ? <Navigate to={'/dashboard'}/>: <Login/>}/>
        {/* <Route path='/signup' element={redirect != null && profile === "user" ? <Navigate to={'/'}/>: <SignUp/>}/> */}
        <Route path='/signup' element={redirect != null && profile === "user" ? <Navigate to={'/'}/>: redirect != null && profile === "admin" ? <Navigate to={'/dashboard'}/>: <SignUp/>}/>
        <Route path='/' element={redirect != null && profile === "user" ? <Home/>: redirect != null && profile === "admin" ? <Navigate to={'/dashboard'}/>: <Navigate to={'/login'}/>}/>
        <Route path='/dashboard' element={redirect != null && profile === "user" ? <Navigate to={'/'}/>: redirect != null && profile === "admin" ? <Admin/>: <Navigate to={'/login'}/>}/>
        <Route path='*' element={<div>404 Not Found</div>}/>
      </Routes>
    </div>
  )
}

export default App
