import React from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import Icons from '../Icons/Icons'
import { AlertStripe } from '../../Nav'
import './Alert.css'

export const errorTypes = {
  OK: 'suksess',
  ERROR: 'feil',
  WARNING: 'advarsel'
}

export const Alert = ({ className, error, fixed, message, onClear, status = 'ERROR', type }) => {
  let _message = message

  const onClearClicked = () => {
    if (_(onClear).isFunction()) {
      onClear()
    }
  }

  const printError = (error) => {
    const errorMessage = []
    if (error.status) {
      errorMessage.push(error.status)
    }
    if (error.message) {
      errorMessage.push(error.message)
    }
    if (error.error) {
      errorMessage.push(error.error)
    }
    if (error.uuid) {
      errorMessage.push(error.uuid)
    }
    return errorMessage.join(' - ')
  }

  if (!_message) {
    return null
  }

  if (!['client', 'server'].indexOf(type) < 0) {
    console.error('Invalid alert type: ' + type)
    return null
  }

  if (error) {
    _message += ': ' + printError(error)
  }

  const _fixed = _.isNil(fixed) ? type === 'client' : fixed
  return (
    <AlertStripe
      className={classNames('c-alert', type, className, { fixed: _fixed })}
      type={errorTypes[status]}
    >
      {_message}
      {onClear ? <Icons className='closeIcon' kind='solidclose' onClick={onClearClicked} /> : null}
    </AlertStripe>
  )
}

Alert.propTypes = {
  className: PT.string,
  error: PT.object,
  fixed: PT.bool,
  message: PT.string,
  onClear: PT.func,
  status: PT.string,
  type: PT.string.isRequired
}

Alert.displayName = 'Alert'
export default Alert
