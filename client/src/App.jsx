import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'


import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import Home from './home'
import UpdateUser from './UpdateUser'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signup />}> </Route>
      <Route path='/register' element={<Signup />}> </Route>
      <Route path='/login' element={<Login />}> </Route>
      <Route path='/home' element={<Home />}> </Route>
      <Route path='/getUser/:id' element={<UpdateUser />} ></Route>
      <Route path='/update/:id' element={<UpdateUser />} ></Route>
      
    </Routes>
    </BrowserRouter>
  )
}
  
export default App