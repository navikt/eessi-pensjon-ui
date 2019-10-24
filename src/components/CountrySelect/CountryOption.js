import React from 'react'
import PT from 'prop-types'
import { components } from 'react-select'
import Flag from '../Flag/Flag'
import classNames from 'classnames'

const CountryOption = (props) => {
  const { data, innerProps, isSelected, isFocused, label, selectProps, value } = props
  const _type = selectProps.selectProps.type || 'country'
  const _label = _type === 'country' ? label : (data.currency ? data.currency + ' - ' : '') + data.currencyLabel
  return (
    <components.Option {...props}>
      <div
        {...innerProps}
        id={selectProps.id ? selectProps.id + '-' + data.value : undefined}
        className={classNames('c-countryOption', {
          selected: isSelected,
          focused: isFocused
        })}
      >
        {selectProps.selectProps.flags ? (
          <Flag
            className='c-countryOption__flag mr-2'
            label={_label}
            country={value}
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
  data: PT.object,
  innerProps: PT.object,
  isSelected: PT.bool,
  isFocused: PT.bool,
  label: PT.string,
  selectProps: PT.object,
  value: PT.string
}
CountryOption.displayName = 'CountryOption'
export default CountryOption
