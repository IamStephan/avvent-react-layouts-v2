import * as React from 'react';
import styled from 'styled-components';
import merge from 'deepmerge';

import { boxFlex, boxGrid } from '../utils/default';

const BoxContainer = styled.div<Props>`
  box-sizing: border-box;

  ${props => {
    /**
     * Styles for normal props (non breakpoint based)
     */
    
    let styles: Array<string> = []

      if(props.display === 'flex' || props.display === 'inline-flex') {
        let allProps = merge(boxFlex, props)

        // General styles
        // Order
        styles.push(`order: ${allProps.order};`)

        // Place-flex
        styles.push(`align-self: ${allProps['place-flex'].align};`)

        // Universal spacing
        styles.push(`padding: ${allProps.spacing.padding}${typeof allProps.spacing.padding === 'number' ? 'px' : ''};`)

        // When the user uses the grid system (quite opinionated)
        if(allProps.useGrid) {
          //Column stretch
          styles.push(`width: calc(${allProps.col / allProps.columns * 100}% - ${allProps.gap}${typeof allProps.gap === 'number' ? 'px' : ''});`)

          // Gap (Maybe this could be done better)
          styles.push(`margin: ${Number(allProps.gap) / 2}${typeof allProps.gap === 'number' ? 'px' : ''};`)
        } else {
          // Flex
          styles.push(`flex-grow: ${allProps.flex.grow};`)
          styles.push(`flex-shrink: ${allProps.flex.shrink};`)
          styles.push(`flex-basis: ${allProps.flex.basis}${typeof allProps.flex.basis === 'number' ? 'px' : ''};`)

          // Spacing
          styles.push(`margin: ${allProps.spacing.margin}${typeof allProps.spacing.margin === 'number' ? 'px' : ''};`)
        }
      }

    if(props.display === 'grid' || props.display === 'inline-grid') {
      let allProps = merge(boxGrid, props)

      // Columns (Can be empty string)
      if(allProps.column) {
        if(allProps.column.start) styles.push(`grid-column-start: ${allProps.column.start};`)
        if(allProps.column.end) styles.push(`grid-column-end: ${allProps.column.end};`)
      }

      // Rows (Can be empty string)
      if(allProps.row) {
        if(allProps.row.start) styles.push(`grid-row-start: ${allProps.row.start};`)
        if(allProps.row.end) styles.push(`grid-row-end: ${allProps.row.end};`)
      }

      // Generic area (Can be empty string)
      if(allProps.area) styles.push(`grid-area: ${allProps.area};`)

      // Place Self
      styles.push(`justify-self: ${allProps['place-grid'].justify};`)
      styles.push(`align-self: ${allProps['place-grid'].align};`)

      // Spacing
      styles.push(`margin: ${allProps.spacing.margin}${typeof allProps.spacing.margin === 'number' ? 'px' : ''};`)
      styles.push(`padding: ${allProps.spacing.padding}${typeof allProps.spacing.padding === 'number' ? 'px' : ''};`)
    }
    
    // Complied styles
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

        if(props.display === 'flex' || props.display === 'inline-flex') {
          // General styles
          // Order
          if(props['order-' + key]) styles.push(`order: ${props['order-' + key]};`)

          // Place-flex
          if(props['place-flex-' + key]) {
            if(props['place-flex-' + key].align) styles.push(`align-self: ${props['place-flex'].align};`)
          }

          // Universal spacing
          if(props['spacing-' + key]) {
            if(props['spacing-' + key].padding) styles.push(`padding: ${props['spacing-' + key].padding}${typeof props['spacing-' + key].padding === 'number' ? 'px' : ''};`)
          }
          

          // When the user uses the grid system (quite opinionated)
          if(props.useGrid) {
            //Column stretch
            if(props['col-' + key]) {
              // Columns and gap should be defined in the default props in parent component
              styles.push(`width: calc(${props['col-' + key].col / props.columns * 100}% - ${props.gap}${typeof props.gap === 'number' ? 'px' : ''});`)
            }
            

            // Gap (Maybe this could be done better)
            // Gap should be defined in the default props in parent component
            styles.push(`margin: ${Number(props.gap) / 2}${typeof props.gap === 'number' ? 'px' : ''};`)
          } else {
            // Flex
            if(props['flex-' + key]) {
              if(props['flex-' + key].grow) styles.push(`flex-grow: ${props['flex-' + key].grow};`)
              if(props['flex-' + key].shrink) styles.push(`flex-shrink: ${props['flex-' + key].shrink};`)
              if(props['flex-' + key].basis) styles.push(`flex-basis: ${props['flex-' + key].basis}${typeof props['flex-' + key].basis === 'number' ? 'px' : ''};`) 
            }
            
            // Spacing
            if(props['spacing-' + key].margin) styles.push(`margin: ${props['spacing-' + key].margin}${typeof props['spacing-' + key].margin === 'number' ? 'px' : ''};`)
          }
        }

        if(props.display === 'grid' || props.display === 'inline-grid') {
          // Columns (Can be empty string)
          if(props['column-' + key]) {
            if(props['column-' + key].start) styles.push(`grid-column-start: ${props['column-' + key].start};`)
            if(props['column-' + key].end) styles.push(`grid-column-end: ${props['column-' + key].end};`)
          }

          // Rows (Can be empty string)
          if(props['row-' + key]) {
            if(props['row-' + key].row.start) styles.push(`grid-row-start: ${props['row-' + key].row.start};`)
            if(props['row-' + key].row.end) styles.push(`grid-row-end: ${props['row-' + key].row.end};`)
          }

          // Generic area (Can be empty string)
          if(props['area-' + key]) styles.push(`grid-area: ${props['area-' + key]};`)

          // Place Self
          if(props['place-grid-' + key]) {
            if(props['place-grid-' + key].justify) styles.push(`justify-self: ${props['place-grid-' + key].justify};`)
            if(props['place-grid-' + key].align) styles.push(`align-self: ${props['place-grid-' + key].align};`)
          }

          // Spacing
          if(props['spacing-' + key]) {
            if(props['spacing-' + key].margin) styles.push(`margin: ${props['spacing-' + key].margin}${typeof props['spacing-' + key].margin === 'number' ? 'px' : ''};`)
            if(props['spacing-' + key].padding) styles.push(`padding: ${props['spacing-' + key].padding}${typeof props['spacing-' + key].padding === 'number' ? 'px' : ''};`)
          }
          
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
      styles.push(`border: 1.5px dashed #282828;`)

      // Border-radius
      styles.push(`border-radius: 10px;`)
    }

    //Compile all the values to a string
    let compiled = styles.join('') 
    return `${compiled}`
  }}
`

export interface Props {
  // From Parent component
  debug: boolean,
  display: 'flex' | 'inline-flex' | 'grid' | 'inline-grid'
  breakpoints: Array<{
    [breakpointName: string]: number | string
  }>,

  // Flexbox specific
  order: number,
  flex: {
    grow: number,
    shrink: number,
    basis: number | string
  },
  'place-flex': {
    align: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  },
  // Only for when useGrid is enabled
  useGrid: boolean,
  col: number,
  columns: number,
  gap: number | string,

  // Grid Specific
  column: {
    start: string,
    end: string
  },
  row: {
    start: string,
    end: string
  },
  area: string,
  'place-grid': {
    justify: 'start' | 'end' | 'center' | 'stretch',
    align: 'start' | 'end' | 'center' | 'stretch'
  },
  spacing: {
    margin: number | string,
    padding: number | string
  }
}

export default class App extends React.Component<Props, {}> {
  public render() {
    return (
      <BoxContainer {...this.props}>
        {this.props.children}
      </BoxContainer>
    );
  }
}
