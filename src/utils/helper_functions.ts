export {default as merge} from 'deepmerge'

export function generateGridAreas(areas: Array<string>) {
  // Check if there is a defenition
  let arrayCopy = [...areas]

  if(arrayCopy.length === 0) return ''

  let qoutedArray = arrayCopy.map(value => {
    return `"${value}"`
  })
  
  let compiled = qoutedArray.join(' ')

  return `${compiled}`
}