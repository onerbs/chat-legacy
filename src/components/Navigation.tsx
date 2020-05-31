import Avatar from './Avatar'
import React, { useState, Suspense, lazy } from 'react'
import { Flex, Text } from 'theme-ui'
import { Icon } from './Icon'
import { STORE__CLEAR } from '../lib/actions'
import { Store } from '../lib/store'
import { connect } from 'react-redux'
const Portal = lazy(() => import('./Portal'))

type props = {
  activeRoom: string
  hash: string
  name: string
  logout(): void
}
function Navigation({activeRoom, hash, name, logout}: props) {
  const [isAdding, addNew] = useState(false)
  return (<>
    {isAdding && (
      <Suspense fallback={<span/>}>
        <Portal close={() => addNew(false)} />
      </Suspense>
    )}

    <Flex py={2} sx={{ alignItems: 'center' }}>
      {/* todo obtener el ancho de Sidebar dinámicamente. */}
      <Flex px={2} sx={{ alignItems: 'center', justifyContent: 'space-between', width: '250px' }}>
        <Text sx={{ lineHeight: 1 }}>
          <Icon name="menu" />
        </Text>
        <Text sx={{ lineHeight: 1 }}>
          <Icon name="add" onClick={() => addNew(true)} />
          <Icon name="exit_to_app" onClick={logout} />
        </Text>
      </Flex>

      <Flex pr={2} sx={{ justifyContent: 'space-between', width: 'calc(100% - 250px)' }}>
        <Flex sx={{ flexDirection: 'column' }}>
          <Text>{activeRoom}</Text>
          {/* <Text variant="small">Members</Text> */}
        </Flex>
        <Avatar hash={hash} alt={`${name}'s avatar`} size={35}/>
      </Flex>
    </Flex>
  </>)
}
export default connect (
  (session: Store, ownProps: { activeRoom: string }) => ({
    activeRoom: ownProps.activeRoom,
    hash: session.hash,
    name: session.displayName
  }),
  dispatch => ({
    logout: () => {
      dispatch({ type: STORE__CLEAR })
      window.location.reload()
    }
  })
)(Navigation)
