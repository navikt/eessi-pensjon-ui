import React, { useState } from 'react'
import Select, { ValueType } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import makeAnimated from 'react-select/animated'
import { guid } from 'nav-frontend-js-utils'
import PT from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import { SelectComponents } from 'react-select/src/components'
import MultipleOption from './MultipleOption'
import MultipleValueRemove from 'components/MultipleSelect/MultipleValueRemove'
import './MultipleSelect.css'

const animatedComponents: SelectComponents<any> = makeAnimated()

export interface MultipleSelectProps<T> {
  ariaLabel ?: string;
  className ?: string;
  creatable ?: boolean;
  error ?: string;
  hideSelectedOptions ?: boolean;
  id ?: string;
  label: string | JSX.Element;
  onSelect?: (e: ValueType<any>) => void;
  options: Array<T>;
  placeholder?: string;
  values: Array<T>;
}

const MultipleSelect: React.FC<MultipleSelectProps<any>> = ({
  ariaLabel, className, creatable = false, error, hideSelectedOptions = false,
  id, label, onSelect, options = [], placeholder, values = []
}: MultipleSelectProps<any>): JSX.Element => {
  const [_values, setValues] = useState<Array<any>>(values)

  const onSelectChange = (e: Array<any>) => {
    if (_.isFunction(onSelect)) {
      onSelect(e)
    }
    setValues(e)
  }

  const selectStyle = () => ({
    container: (styles: any, state: any) => ({
      ...styles,
      backgroundColor: error ? '#f3e3e3' : '#fff',
      borderRadius: 4,
      borderColor: error ? '1 px solid #ba3a26' : '20px solid #b7b1a9',
      boxShadow: state.isFocused ? '0 0 0 3px #254b6d' : ''
    }),
    control: (styles: any) => ({
      ...styles,
      borderColor: error ? '#ba3a26' : '#b7b1a9',
      backgroundColor: error ? '#f3e3e3' : '#fff',
      ':hover': {
        borderColor: '#0067c5',
        transition: 'border-color 200ms cubic-bezier(0.465, 0.183, 0.153, 0.946)'
      }
    })
  })

  const Component: typeof React.Component = creatable ? CreatableSelect : Select
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
  label: PT.oneOfType([PT.element, PT.string]).isRequired,
  onSelect: PT.func,
  options: PT.array.isRequired,
  placeholder: PT.string,
  values: PT.array.isRequired
}
export default MultipleSelect
