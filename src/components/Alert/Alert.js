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

export const Alert = ({ className, error, fixed, message, onClose, status = 'ERROR', type }) => {
  let _message = message

  const onCloseIconClicked = () => {
    if (_(onClose).isFunction()) {
      onClose()
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

  if (!_.includes(['client', 'server'], type)) {
    console.error('Invalid alert type: ' + type)
    return null
  }

  if (!_.includes(Object.keys(errorTypes), status)) {
    console.error('Invalid alert status: ' + status)
    return null
  }

  if (error) {
    _message += ': ' + printError(error)
  }

  const _fixed = _.isNil(fixed) ? type === 'client' : fixed
  return (
    <AlertStripe
      className={classNames('c-alert', 'c-alert__type-' + type, 'c-alert__status-' + status, className, { fixed: _fixed })}
      type={errorTypes[status]}
    >
      {_message}
      {_(onClose).isFunction() ? <Icons className='closeIcon' kind='solidclose' onClick={onCloseIconClicked} /> : null}
    </AlertStripe>
  )
}

Alert.propTypes = {
  className: PT.string,
  error: PT.object,
  fixed: PT.bool,
  message: PT.string,
  onClose: PT.func,
  status: PT.oneOf(['OK', 'ERROR', 'WARNING']),
  type: PT.oneOf(['client', 'server']).isRequired
}

Alert.displayName = 'Alert'
export default Alert
