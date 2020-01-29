import React, { Component } from 'react'

import { Grid } from 'react-layouts-v2'

export default class App extends Component {
  render () {
    return (
      <div>
        <Grid debug spacing-laptop={{
          padding: '50%'
        }}
        grid={{
          areas: ['asdasdasd asdasd', 'fyugb fyugbj']
        }}

        grid-phone={{
          areas: ['asdasdasd asdasd']
        }}

        gap-phone={{
          column: '50vh'
        }}
        />
      </div>
    )
  }
}
