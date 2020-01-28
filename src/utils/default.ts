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