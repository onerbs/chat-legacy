import Messages from '../components/Messages'
import Navigation from '../components/Navigation'
import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Flex } from 'theme-ui'
import { Link } from 'react-router-dom'
import { Routes } from '../App'
import { Store } from '../lib/store'
import { connect } from 'react-redux'

type props = {
  hash?: string
  rooms?: string[]
}
function Chat({hash, rooms}: props) {
  const [room, setRoom] = useState('')
  return hash
  ? <Flex sx={{ flexDirection: 'column', height: '100vh' }}>
      <Navigation activeRoom={room}/>
      <Flex sx={{ height: '100%' }}>
        <Sidebar rooms={rooms} selectRoom={setRoom}/>
        <Messages room={room}/>
      </Flex>
    </Flex>
  : <div><Link to={Routes.SIGN_IN}>Login</Link> to view this page.</div>
}
export default connect (
  (state: Store) => ({
    rooms: state.rooms,
    hash: state.hash
  })
)(Chat)
