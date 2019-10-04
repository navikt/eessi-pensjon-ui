import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import makeAnimated from 'react-select/animated'
import PT from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import MultipleOption from './MultipleOption'
import MultipleValueRemove from './MultipleValueRemove'
import './MultipleSelect.css'

const animatedComponents = makeAnimated()

const MultipleSelect = ({
  className, creatable = false, error = false, errorMessage, excludeList, hideSelectedOptions,
  id, includeList, onChange, optionList = [], placeholder, values
}) => {
  const [_values, setValues] = useState(values)

  useEffect(() => {
    if (!_.isEqual(_values, values)) {
      setValues(values)
    }
  }, [values, _values])

  const include = (selectedValues, allValues) => {
    return _(allValues).filter(it => {
      return selectedValues.indexOf(it.value) >= 0
    })
  }

  const exclude = (selectedValues, allValues) => {
    return _(allValues).filter(it => {
      return selectedValues.indexOf(it.value) < 0
    })
  }

  const selectStyle = () => {
    return {
      container: (styles, state) => {
        const { boxShadow, ...rest } = styles
        return {
          ...rest,
          backgroundColor: error ? '#f3e3e3' : '#fff',
          borderRadius: 4,
          borderColor: error ? '1 px solid #ba3a26' : '20px solid #b7b1a9',
          boxShadow: state.isFocused ? '0 0 0 3px #254b6d' : ''
        }
      },
      control: (styles, state) => {
        const { boxShadow, ...rest } = styles
        return {
          ...rest,
          borderColor: error ? '#ba3a26' : '#b7b1a9',
          backgroundColor: error ? '#f3e3e3' : '#fff',
          ':hover': {
            borderColor: '#0067c5',
            transition: 'border-color 200ms cubic-bezier(0.465, 0.183, 0.153, 0.946)'
          }
        }
      }
    }
  }

  let options = includeList ? include(includeList, optionList) : optionList
  options = excludeList ? exclude(excludeList, options) : options
  const Component = creatable ? CreatableSelect : Select

  return (
    <div
      id={id}
      className={classNames('c-multipleSelect', className, { skjemaelement__feilmelding: error })}
    >
      <Component
        id={id ? id + '-select' : null}
        className='multipleSelect'
        classNamePrefix='multipleSelect'
        placeholder={placeholder}
        isMulti
        animatedComponents
        closeMenuOnSelect={false}
        value={_values}
        options={options}
        components={{
          ...animatedComponents,
          Option: MultipleOption,
          MultiValueRemove: MultipleValueRemove

        }}
        onChange={onChange}
        hideSelectedOptions={hideSelectedOptions || false}
        styles={selectStyle()}
        tabSelectsValue={false}
      />

      {error
        ? (
          <div role='alert' aria-live='assertive' className='skjemaelement__feilmelding'>
            {errorMessage}
          </div>
        )
        : null}
    </div>
  )
}

MultipleSelect.propTypes = {
  onChange: PT.func.isRequired,
  values: PT.array.isRequired,
  style: PT.object,
  includeList: PT.array,
  excludeList: PT.array,
  optionList: PT.array,
  className: PT.string,
  required: PT.string,
  id: PT.string,
  inputProps: PT.object,
  errorMessage: PT.string,
  styles: PT.object,
  error: PT.bool,
  creatable: PT.bool
}
MultipleSelect.displayName = 'MultipleSelect'
export default MultipleSelect
