import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import PT from 'prop-types'
import classNames from 'classnames'
import PDFSpecialPage from '../PDFSpecialPage/PDFSpecialPage'
import { HjelpetekstAuto, Textarea } from '../../../../Nav'
import ColorPicker from '../../../../components/ColorPicker/ColorPicker'
import './DnDSpecial.css'

const DnDSpecial = ({ actions, labels, separator, watermark }) => {
  const [, setIsHovering] = useState(false)

  const onHandleMouseEnter = () => {
    setIsHovering(true)
  }

  const onHandleMouseLeave = () => {
    setIsHovering(false)
  }

  const setSeparatorText = (e) => {
    if (e.target) {
      e.preventDefault()
      e.stopPropagation()
    }
    actions.setSeparator({
      separatorText: e.target ? e.target.value : e,
      separatorTextColor: separator.separatorTextColor
    })
  }

  const setSeparatorTextColor = (color) => {
    actions.setSeparator({
      separatorText: separator.separatorText,
      separatorTextColor: color.rgb
    })
  }

  const setWatermarkText = (e) => {
    if (e.target) {
      e.preventDefault()
      e.stopPropagation()
    }
    actions.setWatermark({
      watermarkText: e.target.value,
      watermarkTextColor: watermark.watermarkTextColor
    })
  }

  const setWatermarkTextColor = (color) => {
    actions.setWatermark({
      watermarkText: watermark.watermarkText,
      watermarkTextColor: color.rgb
    })
  }

  const separatorEnabled = !!separator.separatorText

  return (
    <div
      className='c-pdf-dndSpecial position-relative'
      onMouseEnter={onHandleMouseEnter}
      onMouseLeave={onHandleMouseLeave}
    >
      <HjelpetekstAuto>{labels['help-specials-pdf']}</HjelpetekstAuto>
      <Droppable droppableId='c-pdf-dndSpecial-droppable' direction='horizontal'>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={classNames('c-pdf-dndSpecial-droppable', { 'c-pdf-dndSpecial-droppable-active': snapshot.isDraggingOver })}
          >
            <Draggable
              key='dndspecial' draggableId={encodeURIComponent(JSON.stringify(separator))}
              index={0} isDragDisabled={!separatorEnabled}
            >
              {(provided, snapshot) => (
                <>
                  <div
                    className={classNames('c-pdf-dndSpecial-draggable', { dragging: snapshot.isDragging })}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <PDFSpecialPage
                      separator={separator} deleteLink={false}
                      className={classNames({
                        enabled: separatorEnabled,
                        disabled: !separatorEnabled,
                        'c-pdf-dndSpecial-draggable-active': snapshot.isDragging
                      })}
                    />
                  </div>
                  {snapshot.isDragging && (
                    <div className='cloneStyle'>
                      <PDFSpecialPage separator={separator} deleteLink={false} />
                    </div>
                  )}
                </>
              )}
            </Draggable>
            <div className='ml-3 d-inline-block'>
              <Textarea label={labels.content} maxLength={100} placeholder={labels['specials-textPlaceholder']} value={separator.separatorText} onChange={setSeparatorText} />
              <ColorPicker color={separator.separatorTextColor} onChangeComplete={setSeparatorTextColor} />
            </div>
            <div className='ml-3'>
              <Textarea label={labels.watermark} maxLength={100} placeholder={labels['specials-watermarkPlaceholder']} value={watermark.watermarkText} onChange={setWatermarkText} />
              <ColorPicker color={watermark.watermarkTextColor} onChangeComplete={setWatermarkTextColor} />
            </div>
          </div>
        )}
      </Droppable>
    </div>
  )
}

DnDSpecial.propTypes = {
  actions: PT.object,
  separator: PT.object.isRequired,
  watermark: PT.object.isRequired
}

export default DnDSpecial
