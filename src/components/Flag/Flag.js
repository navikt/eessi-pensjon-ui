import React from 'react'
import PT from 'prop-types'
import classnames from 'classnames'
import './Flag.css'


const Flag = (props) => {
  const { className, country, label, size = 'M' } = props

  const getFlag = () => {
    const Flags = require('../../resources/flags/' + country.toLowerCase() + '.svg').default
    return <Flags/>
  }

  return (
    <div
      className={classnames(className, 'c-flag', 'c-flag__size-' + size)}
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
  size: PT.string
}
Flag.displayName = 'Flag'
export default Flag
