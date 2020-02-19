import { breakpoints } from '../../utils/defaults';

const container = {
  debug: false,
  breakpoints: breakpoints,
  inline: false,
  columns: 12,
  gap: 10,
  gapV: 10,
  'place-items': {
    justify: 'flex-start',
    align: 'flex-start'
  },
  'place-content': {
    align: 'flex-start'
  },
  spacing: {
    padding: 0,
    margin: 0
  }
}

const box = {
  debug: false,
  breakpoints: breakpoints,
  order: 1,
  columns: container.columns,
  col: 1,
  offset: 0,
  gap: container.gap,
  spacing: {
    padding: 0
  }
}

export {
  container,
  box
}