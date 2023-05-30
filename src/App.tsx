import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Home } from './routes/home/Home'
import React from 'react'

const darkTheme = createTheme({ palette: { mode: 'dark' } })

function App (): JSX.Element {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </header>
      </div>
    </ThemeProvider>
  )
}

export default App
