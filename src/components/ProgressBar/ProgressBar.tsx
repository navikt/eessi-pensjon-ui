import React from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import './ProgressBar.css'

export interface ProgressBarProps {
  className?: string;
  now?: number;
  status?: 'todo' | 'inprogress' | 'done' | 'error';
  children?: JSX.Element;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  className, now = 0, status = 'inprogress', children
}: ProgressBarProps): JSX.Element => (
  <div className={classNames('c-progressbar w-100', className)}>
    <div
      role='progressbar'
      className={classNames('c-progressbar__bar', 'c-progressbar__bar-' + status)}
      style={{ width: (now) + '%' }}
      aria-valuenow={now} aria-valuemin={0} aria-valuemax={100}
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
