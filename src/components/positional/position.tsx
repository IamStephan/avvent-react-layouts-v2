import * as React from 'react';
import styled from 'styled-components';
import merge from 'deepmerge';

import { positional } from '../../utils/default';

const PositionalContainer = styled.div<Props>`
  ${props => {
    let allProps = merge(positional, props)

    let styles: Array<string> = []

    // Type
    styles.push(`position: ${allProps.type};`)

    // Spacing (will always have a value: defaultProps)
    styles.push(`margin: ${allProps.spacing.margin}${typeof allProps.spacing.margin === 'number' ? 'px' : ''};`)
    styles.push(`padding: ${allProps.spacing.padding}${typeof allProps.spacing.padding === 'number' ? 'px' : ''};`)

    // Dimension (can have null values)
    if(allProps.dimensions.width) styles.push(`width: ${allProps.dimensions.width}${typeof allProps.dimensions.width === 'number' ? 'px' : ''};`)
    if(allProps.dimensions.height) styles.push(`height: ${allProps.dimensions.height}${typeof allProps.dimensions.height === 'number' ? 'px' : ''};`)

    // Position (can have null values)
    if(allProps.position.top) styles.push(`top: ${allProps.position.top}${typeof allProps.position.top === 'number' ? 'px' : ''};`)
    if(allProps.position.right) styles.push(`right: ${allProps.position.right}${typeof allProps.position.right === 'number' ? 'px' : ''};`)
    if(allProps.position.bottom) styles.push(`bottom: ${allProps.position.bottom}${typeof allProps.position.bottom === 'number' ? 'px' : ''};`)
    if(allProps.position.left) styles.push(`left: ${allProps.position.left}${typeof allProps.position.left === 'number' ? 'px' : ''};`)

    // Z-index
    styles.push(`z-index: ${allProps['z-index']};`)

    // Compile all the values to a string
    let compiled = styles.join('') 
    return `${compiled}`
  }}

  ${props => {
    /**
     * Generate media queries for all the declared props
     */

    let medias: Array<string> = []

    props.breakpoints.map(breakpnt => {
      Object.keys(breakpnt).map(key => {
        let styles: Array<string> = []

        // Spacing (will always have a value: defaultProps)
        if(props['spacing-' + key]) {
          if(props['spacing-' + key].margin) styles.push(`margin: ${props['spacing-' + key].margin}${typeof props['spacing-' + key].margin === 'number' ? 'px' : ''};`)
          if(props['spacing-' + key].padding) styles.push(`padding: ${props['spacing-' + key].padding}${typeof props['spacing-' + key].padding === 'number' ? 'px' : ''};`)
        }

        // Dimension (can have null values)
        if(props['dimension-' + key]) {
          if(props['dimension-' + key].width) styles.push(`width: ${props['dimension-' + key].width}${typeof props['dimension-' + key].width === 'number' ? 'px' : ''};`)
          if(props['dimension-' + key].height) styles.push(`height: ${props['dimension-' + key].height}${typeof props['dimension-' + key].height === 'number' ? 'px' : ''};`)
        }


        // Position (can have null values)
        if(props['position-' + key]) {
          if(props['position-' + key].top) styles.push(`top: ${props['position-' + key].top}${typeof props['position-' + key].top === 'number' ? 'px' : ''};`)
          if(props['position-' + key].right) styles.push(`right: ${props['position-' + key].right}${typeof props['position-' + key].right === 'number' ? 'px' : ''};`)
          if(props['position-' + key].bottom) styles.push(`bottom: ${props['position-' + key].bottom}${typeof props['position-' + key].bottom === 'number' ? 'px' : ''};`)
          if(props['position-' + key].left) styles.push(`left: ${props['position-' + key].left}${typeof props['position-' + key].left === 'number' ? 'px' : ''};`)
        }

        // Z-index
        if(props['z-index-' + key]) styles.push(`z-index: ${props['z-index-' + key]};`)

        // Compile all the values to a string
        let compiled = styles.join('')

        let media = `
          @media (max-width: ${breakpnt[key]}${typeof breakpnt[key] === 'number' ? 'px' : ''}) {
            ${compiled}
          }
        `

        // Check if it is needed to put in the query
        if(styles.length === 0) return
        
        // Push the media to the list
        medias.push(media)
      })
    })

    // All the media queries
    let compiled = medias.reverse().join('')
    console.log(compiled)

    return `${compiled}`
  }}

  ${props => {
    /**
     * Enable debug settings
     */

    let styles: Array<string>= []

    //Check if debug is enabled
    if(props.debug) {
      //background color
      styles.push(`background-color: rgba(221, 120, 77 ,0.2);`)
    }

    //Compile all the values to a string
    let compiled = styles.join('') 
    return `${compiled}`
  }}
`

export interface Props {
  debug: boolean,
  breakpoints: Array<{
    [breakpointName: string]: number | string
  }>,
  type: 'relative' | 'absolute' | 'fixed' | 'sticky',
  spacing: {
    margin: number | string,
    padding: number | string
  },
  dimensions: {
    width: number | string | null,
    height: number | string | null
  },
  position: {
    top: number | string | null,
    right: number | string | null,
    bottom: number | string | null,
    left: number | string | null
  },
  'z-index': number
}

export default class App extends React.Component<Props, {}> {
  static defaultProps = positional
  public render() {
    return (
      <PositionalContainer {...this.props}>
        {this.props.children}
      </PositionalContainer>
    );
  }
}
