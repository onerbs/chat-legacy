import Bubble from './Bubble'
import React, { useState, useEffect, useRef } from 'react'
import { Flex, Input } from 'theme-ui'
import { Message } from '../lib/firebase'
import { Store } from '../lib/store'
import { connect } from 'react-redux'
import { push, subscribe } from '../lib/rooms'

type props = {
  room: string
  name: string
  send(m: Message, to: string): void
}
function Messages({room, name, send}: props) {

  const [hist, setHist] = useState<Message[]>([])
  const [message, setMessage] = useState('')
  const input = useRef(document.createElement('input'))

  useEffect(() => {
    if (room) {
      subscribe(room, setHist)
      input.current.focus()
    }
  }, [room])

  const sendMessage = () => {
    send({
      date: new Date(),
      from: name,
      message
    },room)
    setMessage('')
  }

  return room ? (
    <Flex sx={{ flexDirection: 'column', flex: 1 }}>
      <Flex sx={{ bg: "#d5d9e1",
        px: 2, py: 1, flex: 1,
        flexDirection: "column",
      }}>
        {hist.length > 0 &&
          hist.map(e => (
            <Bubble
              key={`Message+${e.from}+${Math.random()}`}
              foreign={e.from !== name}
              from={e.from}
              message={e.message}
              time={e.date}
            />
          ))
        }
      </Flex>
      <Flex p={2} sx={{ alignItems: 'center' }}>
        <Input
          onChange={e => setMessage(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && sendMessage()}
          placeholder="Escribe tu mensaje"
          ref={input}
          type="text"
          value={message}
          />
        <i className="material-icons" style={{ margin: '0 0.2em 0 0.5em' }} onClick={sendMessage}>send</i>
      </Flex>
    </Flex>
  ):<span/>
}
export default connect (
  (store: Store) => ({
    name: store.name
  }),
  dispatch => ({
    send: (message: Message, addressee: string) => push(message, addressee).then(dispatch)
  })
)(Messages)
