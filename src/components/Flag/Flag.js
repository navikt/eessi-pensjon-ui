import React from 'react'
import PT from 'prop-types'
import classnames from 'classnames'
import CountryData from '../CountryData/CountryData'
import './Flag.css'
import ReactFlag from 'react-world-flags'

const Flag = ({ className, country, label, size = 'M', type = 'original' }) => {
  if (['original', 'circle'].indexOf(type) < 0) {
    console.error('Flag type ' + type + ' not valid')
    return null
  }

  const getFlag = () => {
    if (CountryData.exists(country)) {
      return <ReactFlag code={country} />
    }
    console.error('Flag ' + country.toLowerCase() + ' not found')
    return null
  }

  return (
    <div
      className={classnames(className, 'c-flag', 'size-' + size, 'type-' + type)}
      title={label}
    >
      {getFlag()}
    </div>
  )
}

Flag.propTypes = {
  className: PT.string,
  country: PT.string.isRequired,
  label: PT.string.isRequired,
  type: PT.string,
  size: PT.string
}
Flag.displayName = 'Flag'
export default Flag
