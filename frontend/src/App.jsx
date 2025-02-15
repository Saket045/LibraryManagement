/* eslint-disable no-unused-vars */
import React from 'react'
import {Route,Routes, useLocation} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import SignUp from './Pages/auth/Signup.jsx'
import Login from './Pages/auth/Login.jsx'
import { useSelector } from 'react-redux'
import ReportsPage from './Pages/basePages/ReportPages/Report.jsx'
import Transaction from './Pages/basePages/TransactionPages/Transaction.jsx'
import Maintainance from './Pages/basePages/MaintainancePages/Maintainance.jsx'

const App = () => {

  return (
    <div>   
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={ <Login/>}/>
      <Route path='/report' element={ <ReportsPage/>}/>
      <Route path='/transaction' element={ <Transaction/>}/>
      <Route path='/maintainance' element={ <Maintainance/>}/>
      </Routes>
    </div>
  )
}
export default App
