import React from 'react'
import ReactDOM from 'react-dom/client'
import SignIn from './pages/SignIn.tsx'
import SignUp from './pages/SignUp.tsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SignIn/>
  </React.StrictMode>,
)
