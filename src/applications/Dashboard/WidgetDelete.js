import React from 'react'
import PT from 'prop-types'
import * as Nav  from '../../Nav'
import ReactResizeDetector from 'react-resize-detector'

import './Widget.css'

const WidgetDelete = ({ labels, layout, onResize, onWidgetDelete, setMode }) => {
  const onWidgetDeleteClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    onWidgetDelete(layout)
  }

  return (
    <div className='c-d-WidgetDelete' style={{ minHeight: '300px' }}>
      <ReactResizeDetector
        handleWidth
        handleHeight
        onResize={onResize}
      />
      <div className='deleteText'>
        <p>{labels.deleteWidgetAreYouSure1}</p>
        <p>{labels.deleteWidgetAreYouSure2}</p>
      </div>
      <div className='buttons'>
        <Nav.KnappBase
          id='c-d-WidgetDelete__delete-button-id'
          className='c-d-WidgetDelete__delete-button'
          type='hoved'
          onClick={onWidgetDeleteClick}
        >
          {labels.yes_delete}
        </Nav.KnappBase>
        <Nav.KnappBase
          id='c-d-WidgetDelete__cancel-button-id'
          className='c-d-WidgetDelete__cancel-button'
          type='flat'
          onClick={() => setMode('edit')}
        >
          {labels.no_cancel}
        </Nav.KnappBase>
      </div>
    </div>
  )
}

WidgetDelete.propTypes = {
  layout: PT.object.isRequired,
  onResize: PT.func.isRequired,
  onWidgetDelete: PT.func.isRequired,
  setMode: PT.func.isRequired,
  t: PT.func.isRequired
}
export default WidgetDelete
