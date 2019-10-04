import React, { useState } from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import moment from 'moment'
import { Input } from '../../Nav'
import './DatePicker.css'

const DatePicker = (props) => {
  const { className, disabled = false, feil, labels = {}, ids = {}, onChange, onBlur, onFocus, placeholders = {}, initialValues = {} } = props
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [_timeoutID, setTimeoutID] = useState(null)
  const [focus, setFocus] = useState(false)

  const handleOnBlur = (event) => {
    event.persist()
    setTimeoutID(
      setTimeout(() => {
        setFocus(false)
        if (typeof onBlur === 'function') {
          onBlur(event)
        }
      }, 0)
    )
  }

  const handleOnFocus = (event) => {
    clearTimeout(_timeoutID)
    if (!focus) {
      setFocus(true)
      if (typeof onFocus === 'function') {
        onFocus(event)
      }
    }
  }

  const maxLength = (limit, event) => {
    const target = event.target
    if (target.value.length > limit) {
      target.value = target.value.slice(0, limit)
    }
  }

  const invalidDay = (date) => {
    const day = date.day
    let monthInteger = parseInt(date.month, 10) - 1
    let yearInteger = parseInt(date.year, 10)
    if (isNaN(monthInteger) || monthInteger < 0 || monthInteger > 11) {
      monthInteger = 0
    }
    if (isNaN(yearInteger)) {
      yearInteger = 0
    }
    if (!moment({ year: (yearInteger || 0), month: (monthInteger || 0), day: day }).isValid()) {
      return { day: true }
    }
    return undefined
  }

  const invalidMonth = (date) => {
    if (!date.month) {
      return undefined
    }
    const monthInteger = parseInt(date.month, 10)
    if (isNaN(monthInteger) || monthInteger < 1 || monthInteger > 12) {
      return { month: true }
    }
    return undefined
  }

  const invalidYear = (date) => {
    if (!date.year) {
      return undefined
    }
    const yearInteger = parseInt(date.year, 10)
    if (isNaN(yearInteger)) {
      return { year: true }
    }
    return undefined
  }

  const checkValidity = (newDate) => {
    return Object.assign(
      {},
      invalidDay(newDate),
      invalidMonth(newDate),
      invalidYear(newDate)
    )
  }

  const dateChange = (key, event) => {
    const value = event.target.value
    let newDate

    if (!value) {
      const newValues = Object.assign({}, values)
      delete newValues[key]
      newDate = Object.assign({}, newValues)
    } else {
      newDate = Object.assign({}, values, { [key]: value })
    }
    setValues(newDate)
    setErrors(checkValidity(newDate))
    onChange(newDate)
  }

  const handleMaxLengthDay = (e) => { maxLength(2, e) }
  const handleMaxLengthMonth = (e) => { maxLength(2, e) }
  const handleMaxLengthYear = (e) => { maxLength(4, e) }
  const handleChangeDay = (e) => { dateChange('day', e) }
  const handleChangeMonth = (e) => { dateChange('month', e) }
  const handleChangeYear = (e) => { dateChange('year', e) }

  return (
    <div
      className={classNames('c-datePicker', className)}
      onBlur={handleOnBlur}
      onFocus={handleOnFocus}
    >
      <div className='row pr-2'>
        <div className='col pl-2 pr-1'>
          <Input
            className='DatePickerDayInput'
            label={labels.day || 'dag'}
            id={ids.day || ''}
            placeholder={placeholders.day}
            type='number'
            min='1'
            max='31'
            disabled={disabled}
            value={(values.day !== undefined) ? values.day : ''}
            onInput={handleMaxLengthDay}
            onChange={handleChangeDay}
            feil={(errors.day || feil) ? { feilmelding: '' } : null}
          />
        </div>
        <div className='col pl-1 pr-1'>
          <Input
            className='DatePickerMonthInput'
            label={labels.month || 'måned'}
            id={ids.month || ''}
            placeholder={placeholders.month}
            type='number'
            min='1'
            max='12'
            disabled={disabled}
            value={values.month !== undefined ? values.month : ''}
            onInput={handleMaxLengthMonth}
            onChange={handleChangeMonth}
            feil={errors.month || feil ? { feilmelding: '' } : null}
          />
        </div>
        <div className='col col pl-1 pr-0'>
          <Input
            className='DatePickerYearInput'
            label={labels.year || 'år'}
            id={ids.year || ''}
            placeholder={placeholders.year}
            type='number'
            min='1900'
            disabled={disabled}
            value={values.year !== undefined ? values.year : ''}
            onInput={handleMaxLengthYear}
            onChange={handleChangeYear}
            feil={errors.year || feil ? { feilmelding: '' } : null}
          />
        </div>
      </div>
      {feil ? (
        <div role='alert' aria-live='assertive' className='feilmelding skjemaelement__feilmelding'>
          {feil.feilmelding}
        </div>
      )
        : null}
    </div>
  )
}

DatePicker.propTypes = {
  disabled: PT.bool,
  required: PT.object,
  id: PT.string,
  ids: PT.object,
  initialValues: PT.object,
  feil: PT.object,
  labels: PT.object,
  onBlur: PT.func,
  onFocus: PT.func,
  onChange: PT.func.isRequired
}
DatePicker.displayName = 'DatePicker'
export default DatePicker
