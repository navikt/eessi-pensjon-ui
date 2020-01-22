import PDFSpecialPage from 'applications/PDFEditor/components/PDFSpecialPage/PDFSpecialPage'
import classNames from 'classnames'
import ColorPicker from 'components/ColorPicker/ColorPicker'
import { Recipes, RecipeType, Separator, Watermark } from 'declarations/PDFEditor.d'
import { RecipesPropType } from 'declarations/PDFEditor.pt'
import { Labels } from 'declarations/types.d'
import { LabelsPropType } from 'declarations/types.pt'
import { Textarea } from 'Nav'
import PT from 'prop-types'
import React, { useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { ColorResult } from 'react-color'
import { useDispatch, useSelector } from 'react-redux'
import * as pdfActions from '../../actions/pdf'
import { State } from '../../reducer'
import './DnDSpecial.css'

export interface DnDSpecialProps {
  dndTarget: RecipeType;
  labels: Labels;
  pageScale: number;
  recipes: Recipes;
  setRecipes: (r: Recipes) => void;
  style?: React.CSSProperties;
}

const DnDSpecial: React.FC<DnDSpecialProps> = ({
  dndTarget, labels, pageScale, recipes, setRecipes
}: DnDSpecialProps): JSX.Element => {
  const [, setIsHovering] = useState<boolean>(false)
  const dispatch = useDispatch()
  const separator = useSelector<State, Separator>(state => state.separator)
  const watermark = useSelector<State, Watermark>(state => state.watermark)
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
    dispatch(pdfActions.setSeparator({
      separatorText: e.target.value,
      separatorTextColor: separator.separatorTextColor
    }))
  }

  const setSeparatorTextColor = (color: ColorResult) => {
    dispatch(pdfActions.setSeparator({
      separatorText: separator.separatorText,
      separatorTextColor: color.rgb
    }))
  }

  const setWatermarkText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target) {
      e.preventDefault()
      e.stopPropagation()
    }
    dispatch(pdfActions.setWatermark({
      watermarkText: e.target.value,
      watermarkTextColor: watermark.watermarkTextColor
    }))
  }

  const setWatermarkTextColor = (color: ColorResult) => {
    dispatch(pdfActions.setWatermark({
      watermarkText: watermark.watermarkText,
      watermarkTextColor: color.rgb
    }))
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
                      dndTarget={dndTarget}
                      pageScale={pageScale}
                      recipes={recipes}
                      separator={separator}
                      deleteLink={false}
                      setRecipes={setRecipes}
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
                        dndTarget={dndTarget}
                        setRecipes={setRecipes}
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
  labels: LabelsPropType.isRequired,
  pageScale: PT.number.isRequired,
  recipes: RecipesPropType.isRequired
}

export default DnDSpecial
