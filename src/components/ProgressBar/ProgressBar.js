import React from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import './ProgressBar.css'

const ProgressBar = ({ className, now = 0, status = 'inprogress', children }) => (
  <div className={classNames('c-progressbar w-100', className)}>
    <div
      role='progressbar'
      className={classNames('c-progressbar__bar', 'c-progressbar__bar-' + status)}
      style={{ width: (now) + '%' }}
      aria-valuenow='45' aria-valuemin='0' aria-valuemax='100'
    >
      {children}
    </div>
  </div>
)

ProgressBar.propTypes = {
  className: PT.string,
  now: PT.number.isRequired,
  status: PT.oneOf(['todo', 'inprogress', 'done', 'error'])
}

export default ProgressBar
