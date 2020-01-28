import React, { Component } from 'react'

import { Flex } from 'react-layouts-v2'

export default class App extends Component {
  render () {
    return (
      <div>
        <Flex spacing-phone={{
          margin: 12
        }} debug spacing={{
          padding: '50%'
        }} />
      </div>
    )
  }
}
