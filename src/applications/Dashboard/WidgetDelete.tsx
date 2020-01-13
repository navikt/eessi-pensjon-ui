import * as Nav from 'Nav'
import PT from 'prop-types'
import React from 'react'
import ReactResizeDetector from 'react-resize-detector'
import { Labels } from 'declarations/types.d'
import { LabelsPropType } from 'declarations/types.pt'
import './Widget.css'

export interface WidgetDeleteProps {
  labels: Labels;
  onResize: (w: number, h: number) => void;
  onDelete: () => void;
  setMode: (s: string) => void;
}

const WidgetDelete: React.FC<WidgetDeleteProps> = ({
  labels, onResize, onDelete, setMode
}: WidgetDeleteProps): JSX.Element => {
  const onWidgetDeleteClick = (e: React.MouseEvent): void => {
    e.stopPropagation()
    e.preventDefault()
    onDelete()
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
  labels: LabelsPropType.isRequired,
  onResize: PT.func.isRequired,
  onDelete: PT.func.isRequired,
  setMode: PT.func.isRequired
}
export default WidgetDelete
