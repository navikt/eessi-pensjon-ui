import React from 'react'
import PT from 'prop-types'
import classnames from 'classnames'
import CountryData from '../CountryData/CountryData'
import ReactTooltip from 'react-tooltip'
import ReactFlag from 'react-world-flags'
import './Flag.css'

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
  size: PT.string
}
Flag.displayName = 'Flag'
export default Flag
