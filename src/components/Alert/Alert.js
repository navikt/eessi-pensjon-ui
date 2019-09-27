import React from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import Icons from '../Icons/Icons'
import { AlertStripe } from '../../Nav'
import './Alert.css'

export const errorTypes = {
  OK: 'suksess',
  ERROR: 'feil',
  WARNING: 'advarsel'
}

export const Alert = (props) => {
  const { className, clientErrorStatus, clientErrorMessage, error, fixed, onClientClear, t, type, serverErrorMessage } = props

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

  if (type === 'server') {
    if (!serverErrorMessage) {
      return null
    }

    let message = t(serverErrorMessage)
    if (error) {
      message += ': ' + printError(error)
    }
    return (
      <AlertStripe
        className={classNames('c-alert', 'server', className)} type={errorTypes.ERROR}
      >
        {message}
        <Icons className='closeIcon' size='1x' kind='solidclose' onClick={onClientClear} />
      </AlertStripe>
    )
  }

  if (!clientErrorMessage) {
    return null
  }

  const separatorIndex = clientErrorMessage.lastIndexOf('|')
  let message

  if (separatorIndex >= 0) {
    message = t(clientErrorMessage.substring(0, separatorIndex)) + ': ' + clientErrorMessage.substring(separatorIndex + 1)
  } else {
    message = t(clientErrorMessage)
  }

  if (error) {
    message += ': ' + printError(error)
  }

  return (
    <AlertStripe
      className={classNames(className, 'c-alert', 'client', { fixed: fixed || true })}
      type={errorTypes[clientErrorStatus]}
    >
      {message}
      <Icons className='closeIcon' kind='solidclose' onClick={onClientClear} />
    </AlertStripe>
  )
}

Alert.propTypes = {
  className: PT.string,
  clientErrorStatus: PT.string,
  clientErrorMessage: PT.string,
  error: PT.object,
  fixed: PT.bool,
  onClientClear: PT.func.isRequired,
  t: PT.func.isRequired,
  type: PT.string.isRequired,
  serverErrorMessage: PT.string
}

Alert.displayName = 'Alert'
export default Alert
