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

export const Alert = ({ className, error, message, onClientClear, status = 'ERROR', type }) => {
  let _message = message

  const onClearClicked = () => {
    if (_(onClientClear).isFunction()) {
      onClientClear()
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

  return (
    <AlertStripe
      className={classNames('c-alert', type, className, { fixed: type === 'client' })} type={errorTypes[status]}
    >
      {_message}
      <Icons className='closeIcon' kind='solidclose' onClick={onClearClicked} />
    </AlertStripe>
  )
}

Alert.propTypes = {
  className: PT.string,
  error: PT.object,
  message: PT.string,
  onClientClear: PT.func,
  type: PT.string.isRequired,
  status: PT.string
}

Alert.displayName = 'Alert'
export default Alert
