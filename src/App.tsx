import React, { useEffect, useState } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { theme } from './theme/theme'

import Header from './components/Header'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

import { TSchema } from './lib/schema'

const App: React.FC = (): React.ReactElement => {
  const [userData, setUserData] = useState<TSchema | null>(
    localStorage.getItem('groww_user') ? JSON.parse(localStorage.getItem('groww_user')!) : null
  )
  const navigate = useNavigate()

  useEffect(() => {
    if (userData) {
      navigate('/dashboard')
    } else {
      navigate('/')
    }
  }, [userData])

  const handleLogout = () => {
    localStorage.removeItem('groww_user')
    setUserData(null)
    navigate('/', { replace: true })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header user={userData} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home setUserData={setUserData} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  )
}
export default App
