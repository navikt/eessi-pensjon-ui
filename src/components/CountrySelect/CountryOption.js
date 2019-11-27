import React from 'react'
import PT from 'prop-types'
import { components } from 'react-select'
import Flag from '../Flag/Flag'
import classNames from 'classnames'

const CountryOption = (props) => {
  const { data, innerProps, isSelected, isFocused, selectProps } = props
  const _type = selectProps.selectProps.type || 'country'
  const _label = _type === 'country' ? data.label : data.currencyValue + ' - ' + data.currencyLabel
  const _value = _type === 'country' ? data.value : data.currencyValue

  return (
    <components.Option {...props}>
      <div
        {...innerProps}
        id={selectProps.id ? selectProps.id + '-' + _value : undefined}
        className={classNames('c-countryOption', {
          selected: isSelected,
          focused: isFocused
        })}
      >
        {selectProps.selectProps.flags ? (
          <Flag
            className='c-countryOption__flag mr-2'
            label={_label}
            country={data.value}
            type='original'
            size='M'
          />
        ) : null}
        <span className='c-countryOption__label'>{_label}</span>
      </div>
    </components.Option>
  )
}

CountryOption.propTypes = {
  innerProps: PT.object,
  isSelected: PT.bool,
  isFocused: PT.bool,
  selectProps: PT.object
}
CountryOption.displayName = 'CountryOption'
export default CountryOption
