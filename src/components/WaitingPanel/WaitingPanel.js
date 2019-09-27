import React from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import { Spinner } from '../../Nav'
import RefreshButton from '../RefreshButton/RefreshButton'

const WaitingPanel = (props) => {
  const { message, className } = props

  return (
    <div className={classNames('c-waitingPanel', 'text-center', className)}>
      <Spinner />
      <p className='c-waitingPanel__message typo-normal'>{message}</p>
    </div>
  )
}

WaitingPanel.propTypes = {
  message: PT.string.isRequired,
  className: PT.string
}
WaitingPanel.displayName = 'WaitingPanel'
export default WaitingPanel
