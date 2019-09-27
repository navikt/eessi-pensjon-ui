import React from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import Icons from '../Icons/Icons'

import './RefreshButton.css'
import PsychoPanel from '../Psycho/PsychoPanel'

const RefreshButton = (props) => {
  const { t, onRefreshClick, rotating } = props

  return (
    <div title={t('ui:refresh')} className={classNames('c-refreshbutton')}>
      <a href='#refresh' onClick={onRefreshClick}>
        <div className={classNames({ rotating: rotating })}>
          <Icons kind='refresh' />
        </div>
      </a>
    </div>
  )
}

RefreshButton.propTypes = {
  t: PT.func.isRequired,
  onRefreshClick: PT.func.isRequired,
  rotating: PT.bool.isRequired
}
RefreshButton.displayName = 'RefreshButton'
export default RefreshButton
