import * as React from 'react';
import styled from 'styled-components';

import { merge } from '../../utils/helper_functions';
import { flexContainer, breakpoints } from '../../utils/default'

const FlexContainer = styled.div<Props>`
  ${props => {
    /**
     * Styles for normal props (non breakpoint based)
     */

    // Deep merge givin props with defaults (allows for values to always be present)
    let allProps = merge(flexContainer, props)

    let styles: Array<string> = []
    
    // Display
    styles.push(`display: ${allProps.display};`)

    // Flow
    styles.push(`flex-direction: ${allProps.flow.direction};`)
    styles.push(`flex-wrap: ${allProps.flow.wrap ? 'wrap' : 'nowrap'};`)

    // Place-items
    styles.push(`justify-content: ${allProps['place-items'].justify};`)
    styles.push(`align-items: ${allProps['place-items'].align};`)

    // Place-content
    styles.push(`align-content: ${allProps['place-content'].align};`)

    // Spacing
    styles.push(`margin: ${allProps.spacing.margin}${typeof allProps.spacing.margin === 'number' ? 'px' : ''};`)
    styles.push(`padding: ${allProps.spacing.padding}${typeof allProps.spacing.padding === 'number' ? 'px' : ''};`)

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

        // Flow
        if(props['flow-' + key]) {
          if(props['flow-' + key].direction) styles.push(`flex-direction: ${props['flow-' + key].direction};`)
          if(props['flow-' + key].wrap) styles.push(`flex-wrap: ${props['flow-' + key].wrap ? 'wrap' : 'nowrap'};`)
        }
        

        // Place-items
        if(props['place-items-' + key]) {
          if(props['place-items-' + key].justify) styles.push(`justify-content: ${props['place-items-' + key].justify};`)
          if(props['place-items-' + key].align) styles.push(`align-items: ${props['place-items-' + key].justify.align};`)
        }

        // Place-content
        if(props['place-content-' + key]) {
          if(props['place-content-' + key].align) styles.push(`align-content: ${props['place-content-' + key].align};`)
        }


        // Spacing
        if(props['spacing-' + key]) {
          if(props['spacing-' + key].margin)  styles.push(`margin: ${props['spacing-' + key].margin}${typeof props['spacing-' + key].margin === 'number' ? 'px' : ''};`)
          if(props['spacing-' + key].padding)  styles.push(`padding: ${props['spacing-' + key].padding}${typeof props['spacing-' + key].padding === 'number' ? 'px' : ''};`)
        }

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
      styles.push(`background-color: rgba(77, 178, 211 ,0.2);`)
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
  useGrid: boolean,
  columns: boolean,
  gap: number | string,
  display: 'flex' | 'inline-flex',
  flow: {
    direction: 'row' | 'row-reverse' | 'column' | 'column-reverse',
    wrap: boolean
  },
  'place-items': {
    justify: 'flex-start' | 'flex-end' | 'center' | 'space-around' | 'space-between',
    align: 'flex-start' | 'flex-end' | 'center' | 'space-around' | 'space-between'
  },
  'place-content': {
    align: 'flex-start' | 'flex-end' | 'center' | 'space-around' | 'space-between' | 'stretch'
  },
  spacing: {
    margin: number | string,
    padding: number | string
  }
}

export default class App extends React.Component<Props, {}> {
  static defaultProps = {
    breakpoints: breakpoints
  }

  render() {
    const childrenWithInjectedProps = React.Children.map(this.props.children, child => React.cloneElement(child as React.ReactElement, {
      debug: this.props.debug,
      breakpoints: this.props.breakpoints,
      useGrid: this.props.useGrid,
      columns: this.props.columns,
      gap: this.props.gap,
      display: this.props.display
    }))

    return (
      <FlexContainer {...this.props}>
        {childrenWithInjectedProps}
      </FlexContainer>
    );
  }
}
