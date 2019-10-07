import React, { useState } from 'react'
import Select from 'react-select'
import PT from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import CountryData from '../CountryData/CountryData'
import CountryOption from '../CountrySelect/CountryOption'
import CountryValue from '../CountrySelect/CountryValue'
import CountryErrorStyle from '../CountrySelect/CountryErrorStyle'
import './CountrySelect.css'

const CountrySelect = ({
  className, error, excludeList, id, includeList, locale = 'nb', onSelect, placeholder, type, value = null
}) => {
  const [_value, setValue] = useState(value)

  const include = (selectedCountries, allCountries) => {
    return _(allCountries).filter(country => {
      return selectedCountries.indexOf(country.value) >= 0
    })
  }

  const exclude = (selectedCountries, allCountries) => {
    return _(allCountries).filter(country => {
      return selectedCountries.indexOf(country.value) < 0
    })
  }

  const onSelectChange = (e) => {
    if (_(onSelect).isFunction()) {
      onSelect(e)
    }
    setValue(e)
  }

  const optionList = CountryData.getData(locale)
  let options = (includeList ? include(includeList, optionList) : optionList)
  options = (excludeList ? exclude(excludeList, options) : options)

  let defValue = _value
  if (defValue && !defValue.label) {
    defValue = _(options).find({ value: defValue.value ? defValue.value : defValue })
  }

  return (
    <div
      id={id}
      className={classNames('c-countrySelect', className, { skjemaelement__feilmelding: error })}
    >
      <Select
        placeholder={placeholder}
        value={defValue || null}
        options={options}
        id={id ? id + '-select' : null}
        components={{
          Option: CountryOption,
          SingleValue: CountryValue
        }}
        selectProps={{
          type: type
        }}
        className='c-countrySelect__select'
        classNamePrefix='c-countrySelect__select'
        onChange={onSelectChange}
        styles={{
          ...CountryErrorStyle(error)
        }}
        tabSelectsValue={false}
        multi={false}
      />
      {error
        ? (
          <div role='alert' aria-live='assertive' className='skjemaelement__feilmelding'>
            {error}
          </div>
        )
        : null}
    </div>
  )
}

CountrySelect.propTypes = {
  className: PT.string,
  error: PT.string,
  excludeList: PT.array,
  id: PT.string,
  includeList: PT.array,
  locale: PT.string,
  onSelect: PT.func,
  placeholder: PT.string,
  type: PT.string,
  value: PT.oneOfType([PT.object, PT.string])
}
CountrySelect.displayName = 'CountrySelect'
export default CountrySelect
