import React, { Component } from 'react'

import { Grid, Box, Flex, Position } from 'react-layouts-v2'

export default class App extends Component {
  render () {
    return (
      <Position debug={true} type='fixed' dimensions={{
        width: '100vw',
        height: '100vh'
      }}>
        <Flex
          debug
          style={{
            minHeight: '100%',
          }}
          place-items={{
            justify: 'center',
            align: 'center'
          }}
        >
          <Box>
            asad
          </Box>
        </Flex>
      </Position>
    )
  }
}
