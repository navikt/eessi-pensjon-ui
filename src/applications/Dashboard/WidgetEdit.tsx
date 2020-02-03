import { Widget, WidgetMap } from 'declarations/Dashboard.d'
import WidgetEditOptions from 'applications/Dashboard/WidgetEditOptions'
import { WidgetMapPropType, WidgetPropType } from 'declarations/Dashboard.pt'
import PT from 'prop-types'
import React from 'react'
import { Labels } from 'declarations/types.d'
import { LabelsPropType } from 'declarations/types.pt'
import './Widget.css'

export interface WidgetEditProps {
  labels: Labels;
  myWidgets: WidgetMap;
  onUpdate: (w: Widget) => void;
  setMode: (s: string) => void;
  widget: Widget;
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
  myWidgets: WidgetMapPropType.isRequired,
  onUpdate: PT.func.isRequired,
  setMode: PT.func.isRequired,
  widget: WidgetPropType.isRequired
}

export default WidgetEdit
