import React from 'react'
import { SingleValueProps } from 'react-select'
import Flag from 'components/Flag/Flag'

export type CountryValueProps = SingleValueProps<any>

const CountryValue: React.FC<CountryValueProps> = (props: CountryValueProps): JSX.Element => {
  const { selectProps, data, innerProps } = props
  const _type: string = selectProps.selectProps.type || 'country'
  const _label: string = _type === 'country' ? data.label : data.currencyValue + ' - ' + data.currencyLabel

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

CountryValue.propTypes = {}
export default CountryValue
