import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import React from 'react'
import { Register } from './user/register/components/Register'
import { SignIn } from './user/signin/components/SignIn'
import { SitesGrid } from './user/sites/components/SitesGrid'

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
              <Route path="*" element={<SitesGrid />} />
            </Routes>
          </BrowserRouter>
        </header>
      </div>
    </ThemeProvider>
  )
}

export default App
