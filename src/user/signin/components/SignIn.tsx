import { Alert, Button, Stack } from '@mui/material'
import React, { type FC } from 'react'
import { Auth } from '../services/SignInService'
import Box from '@mui/material/Box'
import { LoadingBackdrop } from '../../../common/components/LoadingBackdrop'
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom'

export const SignIn: FC = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = React.useState(false)
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [invalid, setInvalid] = React.useState(false)

  function doAuth (): void {
    setInvalid(false)
    setLoading(true)
    Auth(username, password)
      .then(_ => {
        console.log('Authenticated successfully.')
        navigate('/')
      })
      .catch(e => {
        console.log('Failed to sign in: ', e)
        setInvalid(true)
        setPassword('')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <LoadingBackdrop open={loading} />
      <Stack spacing={1} sx ={{ width: '300px', margin: 'auto', paddingTop: '32px' }}>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={username}
          onChange={event => {
            setInvalid(false)
            setUsername(event.target.value)
          } } />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={event => {
            setInvalid(false)
            setPassword(event.target.value)
          } }
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              doAuth()
            }
          }} />
        {
          invalid && (
            <Alert
              severity="error"
              onClose={() => {
                setInvalid(false)
              }}>
              Invalid username or password.
            </Alert>
          )
        }
        <Button
          variant="contained"
          onClick={doAuth}>
          Sign In
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            navigate('/register')
          }}>
          Register
        </Button>
      </Stack>
    </Box>
  )
}
