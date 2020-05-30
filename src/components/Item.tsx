import Avatar from './Avatar'
import React from 'react'
import { Flex, Text } from 'theme-ui'

type props = {
  name: string,
  onClick(): void
}
// Q obtener el tamaño del avatar en Item dinámicamente?
const size = 40
export default function Item({name, onClick}: props) {
  return (
    <Flex
      onClick={onClick}
      paddingY={2}
      sx={{ cursor: 'pointer' }}
    >
      {/* todo Avatar del Item. */}
      <Avatar size={size}/>
      <Flex sx={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%'
      }}>
        <Flex sx={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Text>{name}</Text>
          {/* todo Badge de mensajes no leídos. */}
          <Flex variant='badge'>?</Flex>
        </Flex>
        {/* todo Previo del último mensaje. */}
        <Text sx={{ fontSize: "90%", opacity: 0.75 }}>Last message...</Text>
      </Flex>
    </Flex>
  )
}
