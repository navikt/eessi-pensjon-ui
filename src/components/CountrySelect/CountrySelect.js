import React, { useState } from 'react'
import Select from 'react-select'
import PT from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import { guid } from 'nav-frontend-js-utils'
import CountryData from '../CountryData/CountryData'
import CountryOption from '../CountrySelect/CountryOption'
import CountryValue from '../CountrySelect/CountryValue'
import CountryErrorStyle from '../CountrySelect/CountryErrorStyle'
import './CountrySelect.css'

const CountrySelect = ({
  ariaLabel, className, error, excludeList, flags = true, id, includeList, label, locale = 'nb',
  onOptionSelected, placeholder, sort = 'scandinaviaFirst', type, value = null
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
    if (_(onOptionSelected).isFunction()) {
      onOptionSelected(e)
    }
    setValue(e)
  }

  const optionList = CountryData.getData(locale)
  let options = (includeList ? include(includeList, optionList) : optionList)
  options = (excludeList ? exclude(excludeList, options) : options)
  let _options

  if (sort === 'scandinaviaFirst') {
    _options = options.concat()
  }

  if (sort === 'asc') {
    _options = options.concat().sort((a, b) => {
      return a.label.localeCompare(b.label)
    })
  }

  if (sort === 'desc') {
    _options = options.concat().sort((a, b) => {
      return b.label.localeCompare(a.label)
    })
  }

  let defValue = _value
  if (defValue && !defValue.label) {
    defValue = _(options).find({ value: defValue.value ? defValue.value : defValue })
  }
  const inputId = id || guid()

  return (
    <div
      id={id}
      className={classNames('c-countrySelect', className, { skjemaelement__feilmelding: error })}
    >
      <label className='skjemaelement__label' htmlFor={inputId}>{label}</label>
      <Select
        placeholder={placeholder}
        value={defValue || null}
        options={_options}
        id={id ? id + '-select' : null}
        components={{
          Option: CountryOption,
          SingleValue: CountryValue
        }}
        selectProps={{
          type: type,
          id: id + '-select',
          flags: flags
        }}
        aria-label={ariaLabel}
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
  ariaLabel: PT.string,
  className: PT.string,
  error: PT.string,
  excludeList: PT.array,
  flags: PT.bool,
  id: PT.string,
  includeList: PT.array,
  label: PT.oneOfType([PT.node, PT.string]).isRequired,
  locale: PT.string,
  onOptionSelected: PT.func,
  placeholder: PT.string,
  sort: PT.oneOf(['asc', 'desc', 'scandinaviaFirst']),
  type: PT.string,
  value: PT.oneOfType([PT.object, PT.string])
}
CountrySelect.displayName = 'CountrySelect'
export default CountrySelect
