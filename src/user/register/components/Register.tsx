import * as EmailValidator from 'email-validator'
import { Button, Stack } from '@mui/material'
import React, { type FC } from 'react'
import Box from '@mui/material/Box'
import { LoadingBackdrop } from '../../../common/components/LoadingBackdrop'
import { RegisterUser } from '../services/RegisterService'
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom'

export const Register: FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)
  const [displayName, setDisplayName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordConfirmed, setPasswordConfirmed] = React.useState(false)

  function isEmailValid (): boolean {
    return EmailValidator.validate(email)
  }

  function isInputValid (): boolean {
    return password.length >= 0 && passwordConfirmed && isEmailValid()
  }

  return (
    <Box sx={{ width: '100%' }}>
      <LoadingBackdrop open={loading} />
      <Stack spacing={1} sx ={{ width: '300px', margin: 'auto', paddingTop: '32px' }}>
        <TextField
          id="outlined-basic"
          label="Display Name"
          variant="outlined"
          value={displayName}
          onChange={event => { setDisplayName(event.target.value) } } />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          error={email.length > 0 && !isEmailValid()}
          helperText={email.length > 0 && !isEmailValid() ? 'Invalid email address.' : null}
          onChange={event => { setEmail(event.target.value) } } />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={event => { setPassword(event.target.value) } } />
        <TextField
          id="outlined-password-input"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          disabled={password.length <= 0}
          error={password.length > 0 && !passwordConfirmed}
          helperText={password.length > 0 && !passwordConfirmed ? 'Passwords do not match' : null}
          onChange={event => {
            setPasswordConfirmed(event.target.value === password)
          }} />
        <Button
          variant="contained"
          disabled={!isInputValid()}
          onClick={() => {
            setLoading(true)
            RegisterUser(email, displayName, password)
              .then(() => {
                navigate('/')
              })
              .catch((e) => {
                console.log(e)
              })
              .finally(() => {
                setLoading(false)
              })
          }}>
          Register
        </Button>
      </Stack>
    </Box>
  )
}
