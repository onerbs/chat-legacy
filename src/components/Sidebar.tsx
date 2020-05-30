import Item from './Item'
import React from 'react'
import { Box, Input } from 'theme-ui'

type props = {
  rooms?: string[],
  selectRoom(uid: string): void
}
export default function Sidebar({rooms, selectRoom}: props) {
  return (
    // todo obtener el ancho de Sidebar dinámicamente.
    <Box p={2} sx={{ width: '250px' }}>
      <Input type="text" placeholder="Buscar" />
      {rooms && rooms.map(name => <Item key={`Room+${name}`} name={name} onClick={() => selectRoom(name)} />)}
    </Box>
  )
}
