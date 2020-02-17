import * as React from 'react';
import styled from 'styled-components';

import { merge, returnCssValue } from '../../utils/utils';
import { container } from './defaults';

import Box from './fbox';

const DebugView = styled.svg`
  height: 100%;
  width: 100%;
  top: 0px;
  bottom: 0px;
  position: absolute;
  z-index: 1;
`

const FlexContainer = styled.div<IProps>`
  ${props => {
    let mergedProps = merge(container, props)
    let styles: Array<string> = []

    // Defaults
    styles.push(`box-sizing: border-box;`)
    styles.push(`position: relative;`)
    styles.push(`flex-wrap: wrap;`)

    // Display
    styles.push(`display: ${mergedProps.inline ? 'inline-flex': 'flex'};`)

    // Place-items
    styles.push(`justify-content: ${mergedProps['place-items'].justify};`)
    styles.push(`align-items: ${mergedProps['place-items'].align};`)

    // Place-content
    styles.push(`align-content: ${mergedProps['place-content'].align};`)

    // Spacing
    styles.push(`padding: ${returnCssValue(mergedProps.spacing.padding)};`)
    styles.push(`margin: ${returnCssValue(mergedProps.spacing.margin)};`)

    return styles.join(' ')
  }}

  ${props => {
    let mergedProps = merge(container, props)
    let styles: Array<string> = []

    if(mergedProps.debug) {
      styles.push(`background-color: rgba(77, 178, 211, 0.25);`)
    }

    return styles.join(' ')
  }}
`

export interface IProps {
  debug: boolean,
  breakpoints: Array<{
    [breakpoint: string]: number | string
  }>,
  inline: boolean,
  columns: number,
  gap: number | string,
  'place-items': {
    justify: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around',
    align: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'
  },
  'place-content': {
    align: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch'
  },
  spacing: {
    padding: number | string,
    margin: number | string
  }
}

export default class FlexGrid extends React.Component<IProps> {
  static defaultProps = container

  static Box = Box

  render() {
    const childrenWithInjectedProps = React.Children.map(this.props.children, child => React.cloneElement(child as React.ReactElement, {
      debug: this.props.debug,
      breakpoints: this.props.breakpoints,
      columns: this.props.columns,
      gap: this.props.gap
    }))

    const SVGid = Math.floor(Math.random() * 1000)

    return (
      <FlexContainer {...this.props}>
        {this.props.debug ? (
          <DebugView>
            <defs>
              <pattern x='0' y='0' id={`grid_display_${SVGid}`} width={(100 / this.props.columns) / 100} height={'0.1'}>
                <rect
                  x={`calc(${returnCssValue(this.props.gap)} / 2)`}
                  y='0'
                  width={`calc((100% / ${this.props.columns}) - ${returnCssValue(this.props.gap)})`}
                  height="100%"
                  fill="rgba(0, 0, 0, 0.25)"
                />
              </pattern>
            </defs>
            <rect fill={`url(#grid_display_${SVGid})`} width='100%' height='100%' />
          </DebugView>
        ) : null}

        {childrenWithInjectedProps}
      </FlexContainer>
    );
  }
}
