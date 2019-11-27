import React from 'react'
import PT from 'prop-types'
import classnames from 'classnames'
import CountryData from '../CountryData/CountryData'
import flags from './Flags'
import './Flag.css'

const countryData = CountryData.getCountryInstance('nb')

const Flag = ({ className, country, label, size = 'M', style, type = 'original' }) => {
  if (['original', 'circle'].indexOf(type) < 0) {
    console.error('Flag type ' + type + ' not valid')
    return null
  }

  const getFlag = () => {
    // we are using UK as the code, but we have GB as flag's svg
    if (countryData.exists(country)) {
      const flag = flags['flag' + country.toUpperCase()]
      return flag ? <img style={style} alt={label} src={flag} /> : null
    }
    console.error('Flag ' + country.toLowerCase() + ' not found')
    return null
  }

  return (
    <>
      <div
        style={style}
        className={classnames(className, 'c-flag', 'size-' + size, 'type-' + type)}
        data-tip={label}
      >
        {getFlag()}
      </div>
    </>
  )
}

Flag.propTypes = {
  className: PT.string,
  country: PT.string.isRequired,
  label: PT.oneOfType([PT.string, PT.element]),
  type: PT.string,
  size: PT.oneOf(['S', 'M', 'L', 'XL'])
}

Flag.displayName = 'Flag'
export default Flag
