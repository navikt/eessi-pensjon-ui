import { AllowedLocaleString, FlagItems } from 'declarations/components'
import Tooltip from 'rc-tooltip'
import React from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import CountryData from '../CountryData/CountryData'
import { Normaltekst } from '../../Nav'
import Flag from './Flag'
import './Flag.css'

export interface FlagListProps {
  animate?: boolean;
  animationDelay?: number;
  className?: string;
  items: FlagItems;
  locale?: AllowedLocaleString;
  overflowLimit?: number;
  size?: 'S' | 'M' | 'L' | 'XL';
  type?: 'original' |'circle';
  wrap?: boolean;
  wrapper?: boolean;
}

const FlagList: React.FC<FlagListProps> = ({
  animate = true, animationDelay = 0.05, className, items,
  locale = 'nb', overflowLimit = 5, size, type, wrap = false,
  wrapper = true
}: FlagListProps): JSX.Element => {
  const countryData = CountryData.getCountryInstance(locale)

  const flags = items.map((item, index) => {
    if (_(overflowLimit).isNumber() && index > overflowLimit - 1) {
      return null
    }
    const label = item.label || countryData.findByValue(item.country).label
    return (
      <Flag
        style={{ animationDelay: (animationDelay * index) + 's' }}
        className={classNames('m-1', { animate: animate })}
        size={size}
        type={type}
        key={index}
        country={item.country}
        label={label}
      />
    )
  })

  const overflow = _(overflowLimit).isNumber() && items.length > overflowLimit ? (
    <Tooltip
      placement='top' trigger={['hover']} overlay={
        <span>{items
          .concat()
          .slice((items.length - overflowLimit) * -1)
          .map(item => item.label)
          .join(', ')}
        </span>
      }
    >
      <Normaltekst
        className='pt-2'
      >
        +{items.length - overflowLimit}
      </Normaltekst>
    </Tooltip>
  ) : null

  return wrapper ? (
    <div
      className={classNames('c-flaglist', className, { wrap: wrap })}
    >
      {flags}
      {overflow}
    </div>
  ) : (
    <>
      {flags}
      {overflow}
    </>
  )
}

FlagList.propTypes = {
  animate: PT.bool,
  className: PT.string,
  locale: PT.oneOf(['en', 'nb']),
  items: PT.array.isRequired,
  overflowLimit: PT.number,
  size: PT.oneOf(['S', 'M', 'L', 'XL']),
  wrap: PT.bool,
  wrapper: PT.bool
}
FlagList.displayName = 'FlagList'
export default FlagList
