import classNames from 'classnames'
import { ModalContent } from 'declarations/components'
import { PickPageStep, Recipes, RecipeSteps, RecipeType } from 'declarations/PDFEditor.d'
import { RecipesPropType, RecipeTypePropType } from 'declarations/PDFEditor.pt'
import { IFile } from 'forhandsvisningsfil/lib/index.d'
import { Labels } from 'declarations/types.d'
import { FilePropType } from 'forhandsvisningsfil/lib/index.pt'
import { LabelsPropType } from 'declarations/types.pt'
import _ from 'lodash'
import PT from 'prop-types'
import React, { useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import DnDPage from '../DnDPage/DnDPage'
import './DnDSource.css'

export interface DnDSourceProps {
  setRecipes: (r: Recipes) => void;
  setModal: (r: ModalContent | undefined) => void;
  labels: Labels;
  pdf: File;
  recipes: Recipes;
  pageScale: number;
  dndTarget: RecipeType;
}

const DnDSource: React.FC<DnDSourceProps> = ({
  setRecipes, setModal, labels, pdf, recipes, pageScale, dndTarget
}: DnDSourceProps): JSX.Element => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const [isFocused, setIsFocused] = useState<string | undefined>(undefined)
  const onHandleMouseEnter: () => void = () => setIsHovering(true)
  const onHandleMouseLeave: () => void = () => setIsHovering(false)
  const onHandleFocus: (k: string) => void = (key: string) => setIsFocused(key)
  const onHandleBlur : () => void = () => setIsFocused(undefined)

  const addAllPagesToTargetPdf = (name: string) => {
    const potentialPages: RecipeSteps = []
    const newRecipes = _.clone(recipes)
    let modified = false

    _.range(1, pdf.numPages! + 1).map(pageNumber => {
      return potentialPages.push({ pageNumber: pageNumber, name: name } as PickPageStep)
    })

    if (!newRecipes[dndTarget]) {
      newRecipes[dndTarget] = []
    }
    potentialPages.map(page => {
      if (!_.find(newRecipes[dndTarget], page)) {
        modified = true
        return newRecipes[dndTarget]!.push(page)
      }
      return page
    })

    if (modified) {
      setRecipes(newRecipes)
    }
  }

  let selectedPages: RecipeSteps = []

  if (recipes[dndTarget]) {
    selectedPages = _.filter(recipes[dndTarget], { name: pdf.name })
  }

  return (
    <div
      className='a-pdf-dndSource position-relative'
      onMouseEnter={onHandleMouseEnter}
      onMouseLeave={onHandleMouseLeave}
    >
      <Droppable droppableId={'a-pdf-dndSource-droppable-' + pdf.name} direction='horizontal'>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={classNames('a-pdf-dndSource-droppable', { 'a-pdf-dndSource-droppable-active': snapshot.isDraggingOver })}
            style={{ minHeight: pageScale * 140 }}
          >
            {_.range(1, pdf.numPages! + 1).map(pageNumber => {
              if (_.find(selectedPages, { pageNumber: pageNumber })) {
                return null
              }
              const key = pdf.name + '-' + pageNumber
              return (
                <Draggable key={key} draggableId={key} index={pageNumber}>
                  {(provided, snapshot) => (
                    <div
                      className={classNames('a-pdf-dndSource-draggable', { dragging: snapshot.isDragging })}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onFocus={() => onHandleFocus(key)}
                      onBlur={() => onHandleBlur()}
                    >
                      <DnDPage
                        action='add'
                        setRecipes={setRecipes}
                        setModal={setModal}
                        className={classNames({ 'a-pdf-dndSource-draggable-active': snapshot.isDragging })}
                        dndTarget={dndTarget}
                        isFocused={isFocused === key}
                        file={pdf}
                        pageNumber={pageNumber}
                        pageScale={pageScale}
                        recipes={recipes}
                        style={{
                          minWidth: 100 * pageScale,
                          minHeight: 140 * pageScale
                        }}
                      />
                    </div>
                  )}
                </Draggable>
              )
            })}
          </div>
        )}
      </Droppable>
      {isHovering ? (
        <div className='addAllLink'>
          <a href='#addAll' onClick={() => addAllPagesToTargetPdf(pdf.name)}>
            {labels.button_addAll}
          </a>
        </div>
      ) : null}
    </div>
  )
}

DnDSource.propTypes = {
  setRecipes: PT.func.isRequired,
  dndTarget: RecipeTypePropType.isRequired,
  labels: LabelsPropType.isRequired,
  pdf: FilePropType.isRequired,
  pageScale: PT.number.isRequired,
  recipes: RecipesPropType.isRequired
}

export default DnDSource
