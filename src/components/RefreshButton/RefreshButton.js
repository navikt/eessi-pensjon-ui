import React from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import Icons from '../Icons/Icons'
import './RefreshButton.css'

const RefreshButton = ({ labelRefresh = 'Forfriske', onRefreshClick, rotating }) => (
  <div title={labelRefresh} className={classNames('c-refreshbutton')}>
    <a href='#refresh' onClick={onRefreshClick}>
      <div className={classNames({ rotating: rotating })}>
        <Icons kind='refresh' />
      </div>
    </a>
  </div>
)

RefreshButton.propTypes = {
  labelRefresh: PT.string,
  onRefreshClick: PT.func.isRequired,
  rotating: PT.bool.isRequired
}
RefreshButton.displayName = 'RefreshButton'
export default RefreshButton
