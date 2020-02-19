import * as React from 'react';
import styled from 'styled-components';

import { merge, returnCssValue } from '../../utils/utils';
import { box } from './defaults';

const BoxContainer = styled.div<IProps>`
  ${props => {
    let mergedProps = merge(box, props)
    let styles: Array<string> = []

    // Normalize
    styles.push(`box-sizing: border-box;`)

    // Order
    styles.push(`order: ${mergedProps.order};`)

    // Col and gap
    styles.push(`width: calc(${mergedProps.col / mergedProps.columns * 100}% - ${returnCssValue(mergedProps.gap)});`)

    // Margin for gap and offset
    styles.push(`margin-left: calc(${mergedProps.offset / mergedProps.columns * 100}% + (${returnCssValue(mergedProps.gap)} / 2));`)
    styles.push(`margin-right: calc(${returnCssValue(mergedProps.gap)} / 2);`)

    styles.push(`margin-top: calc(${returnCssValue(mergedProps.gapV)} / 2);`)
    styles.push(`margin-bottom: calc(${returnCssValue(mergedProps.gapV)} / 2);`)

    return styles.join(' ')
  }}

  ${props => {
    /**
     * Generate media queries for all the declared props
     */
    let medias: Array<string> = []
    let mergedProps = merge(box, props)

    mergedProps.breakpoints.map(breakpnt => {
      Object.keys(breakpnt).map(key => {
        let styles: Array<string> = []


        if(mergedProps['col-' + key]) {
          styles.push(`width: calc(${mergedProps['col-' + key] / mergedProps.columns * 100}% - ${returnCssValue(mergedProps.gap)});`)
        }

        if(mergedProps['offset-' + key] || mergedProps['offset-' + key] === 0) {
          styles.push(`margin-left: calc(${mergedProps['offset-' + key] / mergedProps.columns * 100}% + (${returnCssValue(mergedProps.gap)} / 2));`)
        }
        // Compile all the values to a string
        let compiled = styles.join('')
        let media = `
          @media (max-width: ${returnCssValue(breakpnt[key])}) {
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
    let mergedProps = merge(box, props)
    let styles: Array<string> = []

    if(mergedProps.debug) {
      styles.push(`border: 2px dashed dimgray;`)
    }

    return styles.join(' ')
  }}

${props => {
    /**
     * show-*
     */
    let medias: Array<string> = []
    
    props.breakpoints.map((breakpnt, i, array) => {
      Object.keys(breakpnt).map(key => {
        let media: string = ''
        
        if(props['show-' + key]) {
          // first breakpoint requires that the media query range from 0 to actual breakpoint
          if(i === 0) {
            let queryOne = `max-width: ${breakpnt[key]}${typeof breakpnt[key] === 'number' ? 'px' : ''}`
            media = `
              @media (${queryOne}) {
                display: block;
              }
            `
          } else {
            let prevVal = Object.values(array[i - 1])[0]
            let queryOne = `min-width: ${prevVal}${typeof prevVal === 'number' ? 'px' : ''}`
            let queryTwo = `max-width: ${breakpnt[key]}${typeof breakpnt[key] === 'number' ? 'px' : ''}`
            media = `
              @media (${queryOne}) and (${queryTwo}) {
                display: block;
              }
            `
          }
        }
        // Compile all the values to a string
        // Check if it is needed to put in the query
        if(media === '') return
        //Push the media to the list
        medias.push(media)
        medias.push('display: none;')
      })
    })
    // All the media queries
    let compiled = medias.reverse().join('')
    console.log(compiled)
    return `${compiled}`
  }}

  ${props => {
    /**
     * hidden-*
     */
    let medias: Array<string> = []
    props.breakpoints.map((breakpnt, i, array) => {
      Object.keys(breakpnt).map(key => {
        let media: string = ''
        
        if(props['hidden-' + key]) {
          // first breakpoint requires that the media query range from 0 to actual breakpoint
          if(i === 0) {
            let queryOne = `max-width: ${breakpnt[key]}${typeof breakpnt[key] === 'number' ? 'px' : ''}`
            media = `
              @media (${queryOne}) {
                display: none;
              }
            `
          } else {
            let prevVal = Object.values(array[i - 1])[0]
            let queryOne = `min-width: ${prevVal}${typeof prevVal === 'number' ? 'px' : ''}`
            let queryTwo = `max-width: ${breakpnt[key]}${typeof breakpnt[key] === 'number' ? 'px' : ''}`
            media = `
              @media (${queryOne}) and (${queryTwo}) {
                display: none;
              }
            `
          }
        }
        // Compile all the values to a string
        // Check if it is needed to put in the query
        if(media === '') return
        
        //Push the media to the list
        medias.push(media)
      })
    })
    // All the media queries
    let compiled = medias.reverse().join('')
    console.log(compiled)
    return `${compiled}`
  }}
`

export interface IProps {
  debug: boolean,
  breakpoints: Array<{
    [breakpoint: string]: number | string
  }>,
  order: number,
  columns: number,
  col: number,
  offset: number,
  gap: number | string,
  gapV: number| string,
  spacing: {
    padding: number | string
  }
}

export default class Box extends React.Component<IProps> {
  public render() {
    return (
      <BoxContainer {...this.props}>
        {this.props.children}
      </BoxContainer>
    );
  }
}
