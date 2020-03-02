import * as CountryFilter from 'components/CountrySelect/CountryFilter'
import { AllowedLocaleString, Countries, Country } from 'declarations/components'
import { Feilmelding } from 'Nav'
import React, { useState } from 'react'
import Select, { ValueType } from 'react-select'
import PT from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import { guid } from 'nav-frontend-js-utils'
import CountryData from '../CountryData/CountryData'
import CountryOption from './CountryOption'
import CountryValue from 'components/CountrySelect/CountryValue'
import CountryErrorStyle from './CountryErrorStyle'
import './CountrySelect.css'

export interface CountrySelectProps<T> {
  ariaLabel?: string;
  className?: string;
  error: string | undefined;
  excludeList?: Array<any>;
  flags?: boolean;
  id: string;
  includeList?: Array<any>;
  label: string | JSX.Element;
  locale: AllowedLocaleString;
  menuPortalTarget?: any;
  onOptionSelected ?: (e: ValueType<T>) => void;
  placeholder?: string;
  sort ?: string;
  type ?: string;
  value?: T | null;
}

const CountrySelect: React.FC<CountrySelectProps<Country>> = ({
  ariaLabel, className, error, excludeList, flags = true, id, includeList, label, locale = 'nb',
  menuPortalTarget, onOptionSelected, placeholder, sort = 'scandinaviaFirst', type, value = null
}) => {
  const [_value, setValue] = useState<ValueType<Country> | null>(value)

  const include = (selectedCountries: Array<string>, allCountries: Countries): Countries => {
    return _.filter(allCountries, country => {
      return selectedCountries.indexOf(country.value) >= 0
    })
  }

  const exclude = (selectedCountries: Array<string>, allCountries: Countries): Countries => {
    return _.filter(allCountries, country => {
      return selectedCountries.indexOf(country.value) < 0
    })
  }

  const onSelectChange = (e: ValueType<Country>): void => {
    if (_.isFunction(onOptionSelected)) {
      onOptionSelected(e)
    }
    setValue(e)
  }

  const optionList: Countries = CountryData.getCountryInstance(locale).getData()
  let options: Countries = (includeList ? include(includeList, optionList) : optionList)
  options = (excludeList ? exclude(excludeList, options) : options)
  let _options: Countries = []

  if (sort === 'scandinaviaFirst') {
    _options = options.concat().sort((a, b) => {
      if (CountryFilter.SCANDINAVIA.indexOf(b.value.toUpperCase()) - CountryFilter.SCANDINAVIA.indexOf(a.value.toUpperCase()) > 0) return 1
      if (CountryFilter.SCANDINAVIA.indexOf(b.value.toUpperCase()) - CountryFilter.SCANDINAVIA.indexOf(a.value.toUpperCase()) < 0) return -1
      return a.label.localeCompare(b.label)
    })
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

  let defValue: Country = (_value as Country)
  if (defValue && !defValue.label) {
    defValue = _.find(options, { value: defValue.value })!
  }
  const inputId: string = id || guid()

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
        id={id + '-select'}
        components={{
          Option: CountryOption,
          SingleValue: CountryValue
        }}
        selectProps={{
          type: type,
          id: id + '-select',
          flags: flags
        }}
        menuPortalTarget={menuPortalTarget || undefined}
        aria-label={ariaLabel}
        className='c-countrySelect__select'
        classNamePrefix='c-countrySelect__select'
        onChange={onSelectChange}
        styles={{
          ...CountryErrorStyle(error),
          menuPortal: base => ({ ...base, zIndex: 9999 })
        }}
        tabSelectsValue={false}
        multi={false}
      />
      {error
        ? (
          <div role='alert' aria-live='assertive' className='feilmelding skjemaelement__feilmelding'>
            <Feilmelding>{error}</Feilmelding>
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
  id: PT.string.isRequired,
  includeList: PT.array,
  label: PT.oneOfType([PT.element, PT.string]).isRequired,
  locale: PT.oneOf(['en' as AllowedLocaleString, 'nb' as AllowedLocaleString]).isRequired,
  menuPortalTarget: PT.any,
  onOptionSelected: PT.func,
  placeholder: PT.string,
  sort: PT.oneOf(['asc', 'desc', 'scandinaviaFirst']),
  type: PT.string,
  value: PT.any
}
export default CountrySelect
