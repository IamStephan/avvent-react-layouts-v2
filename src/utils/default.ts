export const breakpoints = [
  { phone: 425 },
  { tablet: 768 },
  { laptop: 1024 },
  { desktop: 1440 }
]

export const flexContainer = {
  debug: false,
  breakpoints: breakpoints,
  useGrid: false,
  columns: 12,
  gap: 10,
  display: 'flex',
  flow: {
    direction: 'row',
    wrap: false
  },
  'place-items': {
    justify: 'flex-start',
    align: 'flex-start'
  },
  'place-content': {
    align: 'flex-start'
  },
  spacing: {
    margin: 0,
    padding: 0
  }
}

export const gridContainer = {
  debug: false,
  breakpoints: breakpoints,
  display: 'grid',
  grid: {
    columns: '1fr',
    rows: '1fr',
    areas: [],
    auto: {
      rows: null,
      columns: null
    }
  },
  flow: 'row',
  'place-items': {
    justify: 'stretch',
    align: 'stretch'
  },
  'place-content': {
    justify: 'stretch',
    align: 'stretch'
  },
  gap: {
    column: 0,
    row: 0
  },
  spacing: {
    margin: 0,
    padding: 0
  }
}

export const boxFlex = {
  order: 0,
  flex: {
    grow: 0,
    shrink: 0,
    basis: 'auto'
  },
  'place-flex': {
    align: 'auto'
  },
  col: 1,
  useGrid: flexContainer.useGrid,
  columns: flexContainer.columns,
  gap: 0,
  spacing: {
    margin: 0,
    padding: 0
  }
}

export const boxGrid = {
  column: {
    start: '',
    end: ''
  },
  row: {
    start: '',
    end: ''
  },
  area: '',
  'place-grid': {
    justify: 'stretch',
    align: 'stretch'
  },
  gap: 0,
  spacing: {
    margin: 0,
    padding: 0
  }
}

export const positional = {
  debug: false,
  breakpoints: breakpoints,
  type: 'relative',
  spacing: {
    margin: 0,
    padding: 0
  },
  dimensions: {
    width: null,
    height: null
  },
  position: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  'z-index': 1
}