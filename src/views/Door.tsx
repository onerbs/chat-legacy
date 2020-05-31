import React, { useState } from 'react'
import * as user from '../lib/user'
import { Action } from '../lib/store'
import { Box, Button, Flex, Input, Label } from 'theme-ui'
import { Link, useHistory } from 'react-router-dom'
import { Routes } from '../App'
import { connect } from 'react-redux'

type props = {
  btnText: string
  linKText: string
  route: string
  signIn(email: string, password: string): Promise<Action>
  signUp(email: string, password: string): Promise<Action>
}
function Door({btnText, linKText, route, signIn, signUp}: props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  return (
    <Flex sx={{
      alignItems: 'center',
      height: '90vh',
      justifyContent: 'center'
    }}>
      <Flex as="form"
        backgroundColor="white"
        onSubmit={e => e.preventDefault()}
        color="text" sx={{
        borderRadius: 'default',
        flexDirection: 'column',
        textAlign: 'center'
      }}>
        <Box p={3}>
          <Label htmlFor="email">Email</Label>
          <Input mb={3}
            name="email"
            onChange={e => setEmail(e.target.value.trim())}
            type="email"
            value={email} />

          <Label htmlFor="password">Password</Label>
          <Input mb={3}
            name="password"
            onChange={e => setPassword(e.target.value)}
            type="password"
            value={password} />

          <Button mb={3} sx={{ width: '100%' }}
            onClick={() => {
              if (email.trim().length === 0) {
                console.assert(false, 'email is empty')
                return
              }
              if (password.length < 8) {
                console.assert(false, 'password is less than 8')
                return
              }
              const redirect = () => {
                console.log('redireccionando...')
                history.push(Routes.MAIN)
              }
              if (route === Routes.SIGN_UP) {
                signIn(email, password).then(redirect)
              } else {
                signUp(email, password).then(redirect)
              }
            }}
          >{btnText}</Button>
          o <Link replace color="secondary" to={route}>{linKText}</Link>
        </Box>
      </Flex>
    </Flex>
  )
}
export default connect (
  null,
  dispatch => ({
    signIn: (email: string, password: string) => user.signIn(email, password).then(dispatch),
    signUp: (email: string, password: string) => user.signUp(email, password).then(dispatch)
  })
)(Door)
