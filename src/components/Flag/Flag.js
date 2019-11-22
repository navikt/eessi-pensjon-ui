import React from 'react'
import PT from 'prop-types'
import classnames from 'classnames'
import CountryData from '../CountryData/CountryData'
import flags from './Flags'
import './Flag.css'

const Flag = ({ className, country, label, size = 'M', type = 'original' }) => {
  if (['original', 'circle'].indexOf(type) < 0) {
    console.error('Flag type ' + type + ' not valid')
    return null
  }

  const getFlag = () => {
    let _country = country
    if (CountryData.exists(_country)) {
      // we are using UK as the code, but we have GB as flag's svg
      if (country.toLowerCase() === 'uk') {
        _country = 'gb'
      }
      const flag = flags['flag_' + _country.toUpperCase()]
      return flag ? <img alt={label} src={flag} /> : null
    }
    console.error('Flag ' + _country.toLowerCase() + ' not found')
    return null
  }

  return (
    <>
      <div
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
