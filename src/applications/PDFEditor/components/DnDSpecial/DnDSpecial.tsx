import {
  Recipes,
  RecipeType,
  Separator,
  Watermark
} from 'declarations/PDFEditor.d'
import {
  RecipesPropType,
  SeparatorPropType,
  WatermarkPropType
} from 'declarations/PDFEditor.pt'
import classNames from 'classnames'
import ColorPicker from 'components/ColorPicker/ColorPicker'
import PT from 'prop-types'
import React, { useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { Textarea } from 'Nav'
import { ColorResult } from 'react-color'
import { ActionCreators, Labels } from 'declarations/types.d'
import { ActionCreatorsPropType, LabelsPropType } from 'declarations/types.pt'
import PDFSpecialPage from 'applications/PDFEditor/components/PDFSpecialPage/PDFSpecialPage'
import './DnDSpecial.css'

export interface DnDSpecialProps {
  actions: ActionCreators;
  dndTarget: RecipeType;
  labels: Labels;
  pageScale: number;
  recipes: Recipes;
  separator: Separator;
  watermark: Watermark;
  style?: React.CSSProperties;
}

const DnDSpecial: React.FC<DnDSpecialProps> = ({
  actions, dndTarget, labels, pageScale, recipes, separator, watermark
}: DnDSpecialProps): JSX.Element => {
  const [, setIsHovering] = useState<boolean>(false)

  const onHandleMouseEnter: () => void = () => {
    setIsHovering(true)
  }

  const onHandleMouseLeave: () => void = () => {
    setIsHovering(false)
  }

  const setSeparatorText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target) {
      e.preventDefault()
      e.stopPropagation()
    }
    actions.setSeparator({
      separatorText: e.target ? e.target.value : e,
      separatorTextColor: separator.separatorTextColor
    })
  }

  const setSeparatorTextColor = (color: ColorResult) => {
    actions.setSeparator({
      separatorText: separator.separatorText,
      separatorTextColor: color.rgb
    })
  }

  const setWatermarkText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target) {
      e.preventDefault()
      e.stopPropagation()
    }
    actions.setWatermark({
      watermarkText: e.target.value,
      watermarkTextColor: watermark.watermarkTextColor
    })
  }

  const setWatermarkTextColor = (color: ColorResult) => {
    actions.setWatermark({
      watermarkText: watermark.watermarkText,
      watermarkTextColor: color.rgb
    })
  }

  const separatorEnabled = !!separator.separatorText

  return (
    <div
      className='a-pdf-dndSpecial position-relative'
      onMouseEnter={onHandleMouseEnter}
      onMouseLeave={onHandleMouseLeave}
    >
      <Droppable droppableId='a-pdf-dndSpecial-droppable' direction='horizontal'>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={classNames('a-pdf-dndSpecial-droppable', { 'a-pdf-dndSpecial-droppable-active': snapshot.isDraggingOver })}
          >
            <Draggable
              key='dndspecial' draggableId={encodeURIComponent(JSON.stringify(separator))}
              index={0} isDragDisabled={!separatorEnabled}
            >
              {(provided, snapshot) => (
                <>
                  <div
                    className={classNames('a-pdf-dndSpecial-draggable', { dragging: snapshot.isDragging })}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <PDFSpecialPage
                      actions={actions}
                      dndTarget={dndTarget}
                      pageScale={pageScale}
                      recipes={recipes}
                      separator={separator}
                      deleteLink={false}
                      className={classNames({
                        enabled: separatorEnabled,
                        disabled: !separatorEnabled,
                        'a-pdf-dndSpecial-draggable-active': snapshot.isDragging
                      })}
                    />
                  </div>
                  {snapshot.isDragging && (
                    <div className='cloneStyle'>
                      <PDFSpecialPage
                        actions={actions}
                        dndTarget={dndTarget}
                        pageScale={pageScale}
                        recipes={recipes}
                        separator={separator}
                        deleteLink={false}
                      />
                    </div>
                  )}
                </>
              )}
            </Draggable>
            <div className='ml-3 d-inline-block'>
              <Textarea label={labels.label_content} maxLength={100} placeholder={labels.placeholder_text} value={separator.separatorText} onChange={setSeparatorText} />
              <ColorPicker initialColor={separator.separatorTextColor} onColorChanged={setSeparatorTextColor} />
            </div>
            <div className='ml-3'>
              <Textarea label={labels.label_watermark} maxLength={100} placeholder={labels.placeholder_watermark} value={watermark.watermarkText} onChange={setWatermarkText} />
              <ColorPicker initialColor={watermark.watermarkTextColor} onColorChanged={setWatermarkTextColor} />
            </div>
          </div>
        )}
      </Droppable>
    </div>
  )
}

DnDSpecial.propTypes = {
  actions: ActionCreatorsPropType.isRequired,
  labels: LabelsPropType.isRequired,
  pageScale: PT.number.isRequired,
  recipes: RecipesPropType.isRequired,
  separator: SeparatorPropType.isRequired,
  watermark: WatermarkPropType.isRequired
}

export default DnDSpecial
