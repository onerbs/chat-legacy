import React, { useEffect, useRef, useState } from 'react'
import * as rooms from '../lib/rooms'
import { Action } from '../lib/store'
import { Box, Button, Flex, Input, Text } from 'theme-ui'
import { connect } from 'react-redux'

type props = {
  close(): void
  join(name: string): Promise<Action>
}
function Portal({close, join}: props) {
  const [name, setName] = useState('')
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => { input.current?.focus() }, [])

  return (
    <Flex bg="#000D" onClick={e => { (e.target === e.currentTarget) && close() }} sx={{
      alignItems: 'center',
      height: '100vh',
      justifyContent: 'center',
      backdropFilter: 'blur(30px)',
      position: 'absolute',
      width: '100vw',
      zIndex: 999
    }} >
      <Box as="form"
        bg="#eee"
        onSubmit={e => e.preventDefault()}
        padding={3}
        sx={{ borderRadius: "default" }}
      >
        <Text>Nombre de la sala</Text>
        <Input
          marginBottom={3}
          name="name"
          onChange={(e: any) => setName(e.target.value)}
          ref={input}
          type="text"
          value={name}
        />
        <Button sx={{ width: '100%' }}
          onClick={() => {
            join(name)
            close()
          }}
        >Unirme</Button>
      </Box>
    </Flex>
  )
}
export default connect (
  null,
  dispatch => ({
    join: (name: string) => rooms.join(name).then(dispatch)
  })
)(Portal)
