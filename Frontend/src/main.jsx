import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MyProvider from './Context/MyProvider.jsx'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <MyProvider>
        <App />
    </MyProvider>
    </BrowserRouter>
    
    
)
