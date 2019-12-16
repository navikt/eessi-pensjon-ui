import React from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import Icons from '../Icons/Icons'
import './RefreshButton.css'

export interface RefreshButtonProps {
  className?: string;
  labelRefresh?: string;
  onRefreshClicked?: () => void;
  rotating?: boolean;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({
  className, labelRefresh = 'Forfriske', onRefreshClicked = () => {}, rotating = false
}: RefreshButtonProps): JSX.Element => (
  <a
    title={labelRefresh}
    href='#refresh'
    className={classNames('c-refreshbutton', 'lenke', className, { rotating: rotating })}
    onClick={(e) => {
      e.preventDefault()
      e.stopPropagation()
      onRefreshClicked()
    }}
  >
    <Icons kind='refresh' />
  </a>
)

RefreshButton.propTypes = {
  className: PT.string,
  labelRefresh: PT.string,
  onRefreshClicked: PT.func.isRequired,
  rotating: PT.bool.isRequired
}
RefreshButton.displayName = 'RefreshButton'
export default RefreshButton
