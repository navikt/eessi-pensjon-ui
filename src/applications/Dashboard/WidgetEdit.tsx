import { Labels, Widget, WidgetMap } from 'applications/Dashboard/declarations/Dashboard'
import WidgetEditOptions from 'applications/Dashboard/WidgetEditOptions'
import PT from 'prop-types'
import React from 'react'
import './Widget.css'

export interface WidgetEditProps {
  myWidgets: WidgetMap;
  widget: Widget;
  setMode: (s: string) => void;
  labels: Labels;
}

const WidgetEdit = (props: WidgetEditProps): JSX.Element => {
  const { labels, setMode } = props

  return (
    <div className='c-d-WidgetEdit'>
      <div className='titleDiv draggableHandle'>
        <div className='title'>
          {labels.dragHereToMoveWidget}
          <div className='deleteButton'>
            <a
              href='#delete' onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                e.stopPropagation()
                setMode('delete')
              }}
            >🗑
            </a>
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
