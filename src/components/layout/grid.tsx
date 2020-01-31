import * as React from 'react';
import styled from 'styled-components';

import { gridContainer } from '../../utils/default';
import { generateGridAreas, merge } from '../../utils/helper_functions';

const GridContainer = styled.div<Props>`
  ${props => {
    /**
     * Styles for normal props (non breakpoint based)
     */

    //Deep merge givin props with defaults (allows for values to always be present)
    let allProps = merge(gridContainer, props)

    let styles: Array<string> = []

    // Display
    styles.push(`display: ${allProps.display};`)

    // Grid
    styles.push(`grid-template-columns: ${allProps.grid.columns};`)
    styles.push(`grid-template-rows: ${allProps.grid.rows};`)
    // Dubble check since it can be a empty array
    if(allProps.grid.areas.length !== 0) styles.push(`grid-template-areas: ${generateGridAreas(allProps.grid.areas)};`)
    // Values can be null
    if(allProps.grid.auto.columns !== null) styles.push(`grid-auto-columns: ${allProps.grid.auto.columns}${typeof allProps.grid.auto.columns === 'number' ? 'px' : ''};`)
    if(allProps.grid.auto.rows !== null) styles.push(`grid-auto-rows: ${allProps.grid.auto.rows}${typeof allProps.grid.auto.rows === 'number' ? 'px' : ''};`)

    // Flow
    styles.push(`grid-auto-flow: ${allProps.flow};`)

    // Place-items
    styles.push(`justify-items: ${allProps['place-items'].justify};`)
    styles.push(`align-items: ${allProps['place-items'].align};`)

    // Place-content
    styles.push(`justify-content: ${allProps['place-content'].justify};`)
    styles.push(`align-content: ${allProps['place-content'].align};`)

    // Gap
    styles.push(`grid-column-gap: ${allProps.gap.column}${typeof allProps.gap.column === 'number' ? 'px' : ''};`)
    styles.push(`grid-row-gap: ${allProps.gap.row}${typeof allProps.gap.row === 'number' ? 'px' : ''};`)

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

        // Grid
        if(props['grid-' + key]) {
          // Rows & columns
          if(props['grid-' + key].columns) styles.push(`grid-template-columns: ${props['grid-' + key].columns};`)
          if(props['grid-' + key].rows) styles.push(`grid-template-rows: ${props['grid-' + key].rows};`)

          //A reas
          if(props['grid-' + key].areas) {
            if(props['grid-' + key].areas.length !== 0) styles.push(`grid-template-areas: ${generateGridAreas(props['grid-' + key].areas)};`)
          }

          // Auto rows & columns
          if(props['grid-' + key].auto) {
            if(props['grid-' + key].grid.auto.columns !== null) styles.push(`grid-auto-columns: ${props['grid-' + key].grid.auto.columns}${typeof props['grid-' + key].grid.auto.columns === 'number' ? 'px' : ''};`)
            if(props['grid-' + key].grid.auto.rows !== null) styles.push(`grid-auto-rows: ${props['grid-' + key].grid.auto.rows}${typeof props['grid-' + key].grid.auto.rows === 'number' ? 'px' : ''};`)
          }
        }
        
        // Flow
        if(props['flow-' + key]) styles.push(`grid-auto-flow: ${props['flow-' + key].flow};`)

        // Place-items
        if(props['place-items-' + key]) {
          if(props['place-items-' + key].justify) styles.push(`justify-items: ${props['place-items-' + key].justify};`)
          if(props['place-items-' + key].align) styles.push(`align-items: ${props['place-items-' + key].align};`)
        }

        // Place-content
        if(props['place-content-' + key]) {
          if(props['place-content-' + key].justify) styles.push(`justify-content: ${props['place-content-' + key].justify};`)
          if(props['place-content-' + key].align) styles.push(`align-content: ${props['place-content-' + key].align};`)
        }

        // Gap
        if(props['gap-' + key]) {
          if(props['gap-' + key].column) styles.push(`grid-column-gap: ${props['gap-' + key].column}${typeof props['gap-' + key].column === 'number' ? 'px' : ''};`)
          if(props['gap-' + key].row) styles.push(`grid-row-gap: ${props['gap-' + key].row}${typeof props['gap-' + key].row === 'number' ? 'px' : ''};`)
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
        
        //Push the media to the list
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
      styles.push(`background-color: rgba(77, 178, 211, 0.25);`)
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
  display: 'grid' | 'inline-grid',
  grid: {
    columns: string,
    rows: string,
    areas: Array<string>,
    auto: {
      rows: number | string | null,
      columns: number | string | null
    }
  },
  flow: 'row' | 'column' | 'row dense' | 'column dense',
  'place-items': {
    justify: 'start' | 'end' | 'center' | 'stretch',
    align: 'start' | 'end' | 'center' | 'stretch'
  },
  'place-content': {
    justify: 'start' | 'end' | 'center' | 'stretch',
    align: 'start' | 'end' | 'center' | 'stretch'
  },
  gap: {
    column: number | string,
    row: number | string
  },
  spacing: {
    margin: number | string,
    padding: number | string
  }
}

export default class Grid extends React.Component<Props, {}> {
  static defaultProps = gridContainer

  render() {
    const childrenWithInjectedProps = React.Children.map(this.props.children, child => React.cloneElement(child as React.ReactElement, {
      debug: this.props.debug,
      display: this.props.display,
      breakpoints: this.props.breakpoints
    }))

    return (
      <GridContainer {...this.props}>
        {childrenWithInjectedProps}
      </GridContainer>
    );
  }
}
