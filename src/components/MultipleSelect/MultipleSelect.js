import React, { useState } from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import makeAnimated from 'react-select/animated'
import { guid } from 'nav-frontend-js-utils'
import PT from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import MultipleOption from './MultipleOption'
import MultipleValueRemove from './MultipleValueRemove'
import './MultipleSelect.css'

const animatedComponents = makeAnimated()

const MultipleSelect = ({
  ariaLabel, className, creatable = false, error, hideSelectedOptions = false, id, label,
  onSelect, options = [], placeholder, values = []
}) => {
  const [_values, setValues] = useState(values)

  const onSelectChange = (e) => {
    if (_(onSelect).isFunction()) {
      onSelect(e)
    }
    setValues(e)
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

  const Component = creatable ? CreatableSelect : Select
  const inputId = id || guid()

  return (
    <div
      id={id}
      className={classNames('c-multipleSelect', className, { skjemaelement__feilmelding: error })}
    >
      <label className='skjemaelement__label' htmlFor={inputId}>{label}</label>
      <Component
        id={id ? id + '-select' : null}
        className='multipleSelect'
        classNamePrefix='multipleSelect'
        placeholder={placeholder}
        aria-label={ariaLabel}
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
        onChange={onSelectChange}
        hideSelectedOptions={hideSelectedOptions || false}
        styles={selectStyle()}
        tabSelectsValue={false}
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

MultipleSelect.propTypes = {
  ariaLabel: PT.string,
  className: PT.string,
  creatable: PT.bool,
  error: PT.string,
  hideSelectedOptions: PT.bool,
  id: PT.string,
  label: PT.oneOfType([PT.node, PT.string]).isRequired,
  onSelect: PT.func,
  options: PT.array,
  placeholder: PT.string,
  values: PT.array
}
MultipleSelect.displayName = 'MultipleSelect'
export default MultipleSelect
