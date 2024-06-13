import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Add from './Pages/Add'
import View from './Pages/View'
import Edit from './Pages/Edit'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Add />}></Route>
          <Route path='/view' element={<View />}></Route>
          <Route path='/edit' element={<Edit />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
