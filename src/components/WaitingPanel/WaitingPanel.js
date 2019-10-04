import React from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import { Spinner, Normaltekst } from '../../Nav'
const WaitingPanel = ({ className, message }) => (
  <div className={classNames('c-waitingPanel', 'text-center', className)}>
    <Spinner />
    <Normaltekst className='c-waitingPanel__message'>
      {message}
    </Normaltekst>
  </div>
)

WaitingPanel.propTypes = {
  className: PT.string,
  message: PT.string.isRequired
}
WaitingPanel.displayName = 'WaitingPanel'
export default WaitingPanel
