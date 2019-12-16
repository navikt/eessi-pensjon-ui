import React from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import CountryData, { AllowedLocaleString } from '../CountryData/CountryData'
import { Normaltekst } from '../../Nav'
import Flag from './Flag'
import './Flag.css'

export interface FlagListProps {
  animate?: boolean;
  animationDelay?: number;
  className?: string;
  items: Array<{
    label: string;
    country: string;
  }>;
  locale?: AllowedLocaleString;
  overflowLimit?: number;
  size?: 'S' | 'M' | 'L' | 'XL';
  type?: 'original' |'circle';
  wrap?: boolean;
}

const FlagList: React.FC<FlagListProps> = ({
  animate = true, animationDelay = 0.05, className, items, locale = 'nb', overflowLimit = 5, size, type, wrap = false
}: FlagListProps): JSX.Element => {
  const countryData = CountryData.getCountryInstance(locale)
  return (
    <div
      className={classNames('c-flaglist', className, { wrap: wrap, animate: animate })}
    >
      {items.map((item, index) => {
        if (_(overflowLimit).isNumber() && index > overflowLimit - 1) {
          return null
        }
        const label = item.label || countryData.findByValue(item.country).label
        return (
          <Flag
            style={{ animationDelay: (animationDelay * index) + 's' }}
            className='m-1'
            size={size}
            type={type}
            key={index}
            country={item.country}
            label={label}
          />
        )
      })}
      {_(overflowLimit).isNumber() && items.length > overflowLimit ? (
        <Normaltekst
          data-tip={items
            .concat()
            .slice((items.length - overflowLimit) * -1)
            .map(item => item.label)
            .join(', ')}
          className='pt-2'
        >
            +{items.length - overflowLimit}
        </Normaltekst>
      ) : null}
    </div>
  )
}

FlagList.propTypes = {
  animate: PT.bool,
  className: PT.string,
  locale: PT.oneOf(['en', 'nb']),
  items: PT.array.isRequired,
  overflowLimit: PT.number,
  size: PT.oneOf(['S', 'M', 'L', 'XL']),
  wrap: PT.bool
}
FlagList.displayName = 'FlagList'
export default FlagList
