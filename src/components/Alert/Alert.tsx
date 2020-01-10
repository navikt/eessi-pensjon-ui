import { AlertStripeType } from 'nav-frontend-alertstriper'
import React from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import Icons from '../Icons/Icons'
import { AlertStripe } from 'Nav'
import './Alert.css'

type AlertStatus = 'OK' | 'ERROR' | 'WARNING'

type AlertStatusClasses = {[status in AlertStatus]: AlertStripeType}

type AlertType = 'client' | 'server'

interface AlertError {
  status?: string;
  message ?: string;
  error?: string;
  uuid ?: string;
}

export interface AlertProps {
  className ?: string;
  error?: AlertError;
  fixed?: boolean;
  message?: string;
  onClose?: () => void;
  status?: AlertStatus;
  type?: AlertType;
}

export const errorTypes: AlertStatusClasses = {
  OK: 'suksess',
  ERROR: 'feil',
  WARNING: 'advarsel'
}

export const Alert: React.FC<AlertProps> = ({
  className, error, fixed, message, onClose, status = 'ERROR', type
}: AlertProps): JSX.Element | null => {
  let _message: string | undefined = message

  const onCloseIconClicked = (): void => {
    if (_.isFunction(onClose)) {
      onClose()
    }
  }

  const printError = (error: AlertError): string => {
    const errorMessage: Array<string> = []
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

  if (!_.isEmpty(error)) {
    _message += ': ' + printError(error!)
  }

  const _fixed: boolean = _.isNil(fixed) ? type === 'client' : fixed
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
  type: PT.oneOf(['client', 'server'])
}

Alert.displayName = 'Alert'
export default Alert
