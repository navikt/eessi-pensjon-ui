import React from 'react'
import PT from 'prop-types'
import WidgetEditOptions from './WidgetEditOptions'

import './Widget.css'

const WidgetEdit = (props) => {
  const { labels, setMode } = props

  return (
    <div className='c-d-WidgetEdit'>
      <div className='titleDiv draggableHandle'>
        <div className='title'>
          {labels.dragHereToMoveWidget}
          <div className='deleteButton'>
            <a href='#delete' onClick={() => setMode('delete')}>🗑</a>
          </div>
        </div>
      </div>
      <WidgetEditOptions {...props} />
    </div>
  )
}

WidgetEdit.propTypes = {
  labels: PT.object,
  setMode: PT.func.isRequired
}

export default WidgetEdit
