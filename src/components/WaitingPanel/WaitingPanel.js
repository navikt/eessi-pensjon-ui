import React from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import { Spinner, Normaltekst } from '../../Nav'
const WaitingPanel = ({ className, size = 'M', message = 'Vennligst vent...' }) => (
  <div className={classNames('c-waitingPanel', 'text-center', className)}>
    <Spinner type={size} />
    <Normaltekst className='c-waitingPanel__message'>
      {message}
    </Normaltekst>
  </div>
)

WaitingPanel.propTypes = {
  className: PT.string,
  size: PT.string,
  message: PT.string
}
WaitingPanel.displayName = 'WaitingPanel'
export default WaitingPanel
