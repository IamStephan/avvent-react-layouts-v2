import React, { Component } from 'react'

import { Grid, Box, Flex } from 'react-layouts-v2'

export default class App extends Component {
  render () {
    return (
      <Grid
        debug
        gap={{
          column: 10,
          row: 20
        }}
        grid={{
          columns: 'repeat(4, 1fr)',
          rows: '50px 50px 40px',
          areas: [
            'poop poop face face'
          ]
        }}
        spacing={{
          padding: 50
        }}
      >
        <Box area='poop' area-phone='face'>1</Box>
        <Box area='face' area-phone='poop' spacing-phone={{
          padding: 50
        }}>2</Box>
      </Grid>
    )
  }
}
