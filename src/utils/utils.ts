export { default as merge } from 'deepmerge'

export function returnCssValue(value: any): string {
  if(typeof value === 'string') {
    if(/^-?\d*(\.\d+)?$/.test(value)) {
      return value + 'px'
    }
    return value
  }
  return value + 'px'
}