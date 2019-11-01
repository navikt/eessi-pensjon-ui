import React, { useState } from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import { UnmountClosed, Collapse } from 'react-collapse'
import { guid } from 'nav-frontend-js-utils'
import './ExpandingPanel.css'

const ExpandingPanel = ({
  ariaTittel, border = false, children, className, collapseProps, heading,
  onClick, open = false, renderContentWhenClosed
}) => {
  const [_open, setOpen] = useState(open)
  const contentId = (collapseProps && collapseProps.id) || guid()

  const handleOnClick = (e) => {
    setOpen(!_open)
    if (_.isFunction(onClick)) {
      onClick(e)
    }
  }

  const onRestProxy = () => {
    if (collapseProps && collapseProps.onRest) {
      collapseProps.onRest()
    }
  }

  const showContentId = !(!renderContentWhenClosed && !_open)
  const ariaControls = showContentId ? { 'aria-controls': contentId } : undefined
  const CollapseComponent = renderContentWhenClosed ? Collapse : UnmountClosed

  return (
    <div className={classNames('c-expandingpanel', 'ekspanderbartPanel', className, {
      'ekspanderbartPanel--lukket': !_open,
      'ekspanderbartPanel--apen': _open,
      'ekspanderbartPanel--border': border
    })}
    >
      <div
        className='ekspanderbartPanel__hode'
        onClick={handleOnClick}
        aria-expanded={_open}
        {...ariaControls}
      >
        <div className='ekspanderbartPanel__flex-wrapper'>
          {heading}
          <span className='ekspanderbartPanel__indikator' />
        </div>
      </div>
      <CollapseComponent
        id={contentId}
        isOpened={_open}
        onRest={onRestProxy}
        {...collapseProps}
      >
        <article aria-label={ariaTittel} className='ekspanderbartPanel__innhold'>
          {children}
        </article>
      </CollapseComponent>
    </div>
  )
}

ExpandingPanel.propTypes = {
  ariaTittel: PT.string,
  border: PT.bool,
  className: PT.string,
  collapseProps: PT.object,
  heading: PT.oneOfType([PT.string, PT.element]),
  onClick: PT.func,
  open: PT.bool,
  renderContentWhenClosed: PT.bool
}

export default ExpandingPanel
