import React from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import Icons from '../Icons/Icons'
import './RefreshButton.css'

const RefreshButton = ({ className, labelRefresh = 'Forfriske', onRefreshClicked = () => {}, rotating = false }) => (
  <a
    title={labelRefresh}
    href='#refresh'
    className={classNames('c-refreshbutton', className, { rotating: rotating })}
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
