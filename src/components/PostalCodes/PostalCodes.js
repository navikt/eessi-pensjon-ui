import PostalCodesData from './Postal-codes-Norway-ansi'

class PostalCodes {
  values = {}
  constructor () {
    PostalCodesData.split('\n').forEach(line => {
      const v = line.split(';')
      if (v[0]) {
        this.values[v[0]] = v[1]
      }
    })
  }

  get (val) {
    return this.values[val]
  }
}

const postalCodes = new PostalCodes()
Object.freeze(postalCodes)
export default postalCodes
