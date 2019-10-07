import React from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import CountryData from '../CountryData/CountryData'
import { Normaltekst } from '../../Nav'
import Flag from './Flag'

import './Flag.css'

const FlagList = (props) => {
  const { className, items, locale = 'nb', overflowLimit, size, type } = props

  return (
    <div
      className={classNames('c-flaglist', className)}
    >
      {items.map((item, index) => {
        if (_(overflowLimit).isNumber() && index > overflowLimit - 1) {
          return null
        }
        const label = item.label || CountryData.findByValue(locale, item.country).label
        return (
          <Flag
            className='m-2'
            size={size}
            type={type}
            key={index}
            country={item.country}
            label={label}
          />
        )
      })}
      {_(overflowLimit).isNumber() && items.length > overflowLimit
        ? <Normaltekst className='pt-2'>+{items.length - overflowLimit}</Normaltekst>
        : null}
    </div>
  )
}

FlagList.propTypes = {
  className: PT.string,
  locale: PT.string,
  items: PT.array.isRequired,
  overflowLimit: PT.number,
  size: PT.string
}
FlagList.displayName = 'FlagList'
export default FlagList
