import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Home } from './ui/Home'
import React from 'react'
import { Register } from './ui/Register'
import { SignIn } from './ui/SignIn'

const darkTheme = createTheme({ palette: { mode: 'dark' } })

function App (): JSX.Element {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Routes>
              <Route path="signin" element={<SignIn /> } />
              <Route path="register" element={<Register /> } />
              <Route path="*" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </header>
      </div>
    </ThemeProvider>
  )
}

export default App
