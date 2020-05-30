import React from 'react'
import { Box, Flex, Text } from 'theme-ui'

type props = {
  foreign?: boolean
  from: string
  message: string
  time: Date
}
export default function Bubble({foreign = false, from, message, time}: props) {
  return (
    <Box>
      <Text variant="small" mx={2} sx={{
        display: foreign ? 'block' : 'none'
      }}>{from}</Text>
      <Flex mb={1}>
        {!foreign && <Box sx={{ minWidth: '20%' }}></Box>}
        <Flex as="span" variant={`bubble.${foreign ? 'foreign' : 'primary'}`} sx={{
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          margin: '3px',
          position: 'relative',
          flexGrow: 1
        }}>
          {/* todo clip-path. */}
          <Text sx={{ textAlign: 'justify' }}>{message}</Text>
          <Text variant="bubble.time">{HH_MM(time)}</Text>
        </Flex>
        {foreign && <Box sx={{ minWidth: '20%' }}></Box>}
      </Flex>
    </Box>
  )
}

function HH_MM(date: Date): string {
  return `${zero(date.getHours())}:${zero(date.getMinutes())}`
}

function zero(N: number): string {
  return ('0' + N).slice(-2)
}
