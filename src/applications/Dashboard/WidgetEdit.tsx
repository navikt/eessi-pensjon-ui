import { Widget, WidgetMap } from 'declarations/Dashboard.d'
import WidgetEditOptions from 'applications/Dashboard/WidgetEditOptions'
import PT from 'prop-types'
import React from 'react'
import { Labels } from 'declarations/types.d'
import { LabelsPropType } from 'declarations/types.pt'
import './Widget.css'

export interface WidgetEditProps {
  myWidgets: WidgetMap;
  widget: Widget;
  setMode: (s: string) => void;
  labels: Labels;
}

const WidgetEdit: React.FC<WidgetEditProps> = (props: WidgetEditProps): JSX.Element => {
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
  labels: LabelsPropType.isRequired,
  setMode: PT.func.isRequired
}

export default WidgetEdit
