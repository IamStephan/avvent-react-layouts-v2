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