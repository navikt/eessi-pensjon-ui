import React from 'react'
import PT from 'prop-types'
import Flag from '../Flag/Flag'

const CountryValue = (props) => {
  const { selectProps, data, innerProps } = props
  const _type = selectProps.selectProps.type || 'country'
  const _label = _type === 'country' ? data.label : (data.currency ? data.currency + ' - ' : '') + data.currencyLabel

  return (
    <div className='c-countryValue' {...innerProps}>
      {selectProps.selectProps.flags ? (
        <Flag
          className='mr-2'
          label={_label}
          country={data.value}
          type='original'
          size='M'
        />
      ) : null}
      <span className='c-countryValue__label'>{_label}</span>
    </div>
  )
}

CountryValue.propTypes = {
  data: PT.object,
  innerProps: PT.object,
  selectProps: PT.object
}
CountryValue.displayName = 'CountryValue'
export default CountryValue
