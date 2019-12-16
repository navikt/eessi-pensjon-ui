import classNames from 'classnames'
import React from 'react'
import { components, OptionProps } from 'react-select'
import Flag from 'components/Flag/Flag'

export type CountryOptionProps = OptionProps<any>

const CountryOption: React.FC<CountryOptionProps> = (props: CountryOptionProps): JSX.Element => {
  const { data, innerProps, isSelected, isFocused, selectProps } = props
  const _type: string = selectProps.selectProps.type || 'country'
  const _label: string = _type === 'country' ? data.label : data.currencyValue + ' - ' + data.currencyLabel
  const _value: string = _type === 'country' ? data.value : data.currencyValue

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

CountryOption.propTypes = {}
CountryOption.displayName = 'CountryOption'
export default CountryOption
