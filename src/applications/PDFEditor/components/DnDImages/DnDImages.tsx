import DnDPage from 'applications/PDFEditor/components/DnDPage/DnDPage'
import classNames from 'classnames'
import { ModalContent } from 'declarations/components'
import { PickImageStep, Recipes, RecipeType } from 'declarations/PDFEditor.d'
import { RecipesPropType, RecipeTypePropType } from 'declarations/PDFEditor.pt'
import { Labels } from 'declarations/types.d'
import { LabelsPropType } from 'declarations/types.pt'
import { File, Files, FilesPropType } from 'forhandsvisningsfil'
import _ from 'lodash'
import PT from 'prop-types'
import React, { useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import './DnDImages.css'

export interface DnDImagesProps {
  dndTarget: RecipeType;
  files: Files;
  labels: Labels;
  recipes: Recipes;
  setRecipes: (r: Recipes) => void;
  setModal: (m: ModalContent |undefined) => void;
}

const DnDImages: React.FC<DnDImagesProps> = ({ dndTarget, files, labels, recipes, setRecipes, setModal }: DnDImagesProps): JSX.Element => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const onHandleMouseEnter: () => void = () => setIsHovering(true)
  const onHandleMouseLeave: () => void = () => setIsHovering(false)

  const addAllImagesToTargetPdf = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const potentialImages: Array<PickImageStep> = []

    const newRecipes: Recipes = _.clone(recipes)
    let modified: boolean = false

    _.filter(files, (file) => {
      return file.mimetype.startsWith('image/')
    }).map(file => {
      return potentialImages.push({ name: file.name, type: 'pickImage' })
    })

    if (!newRecipes[dndTarget as RecipeType]) {
      newRecipes[dndTarget as RecipeType] = []
    }
    potentialImages.map((image: PickImageStep) => {
      if (!_.find(recipes[dndTarget], { name: image.name })) {
        modified = true
        return newRecipes[dndTarget]!.push(image)
      }
      return image
    })

    if (modified) {
      setRecipes(newRecipes)
    }
  }

  return (
    <div
      className='a-pdf-dndImages position-relative'
      onMouseEnter={onHandleMouseEnter}
      onMouseLeave={onHandleMouseLeave}
    >
      <Droppable isDropDisabled droppableId='a-pdf-dndImages-droppable-images' direction='horizontal'>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={classNames('a-pdf-dndImages-droppable', { 'a-pdf-dndImages-droppable-active': snapshot.isDraggingOver })}
          >
            {files.map((file: File, index: number) => {
              if (_.find(recipes[dndTarget], { name: file.name })) {
                return null
              }
              return (
                <Draggable key={file.name} draggableId={file.name} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className={classNames('a-pdf-dndImages-draggable', { dragging: snapshot.isDragging })}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <DnDPage
                        className={classNames({ 'a-pdf-dndImages-draggable-active': snapshot.isDragging })}
                        file={file}
                        pageNumber={1}
                        pageScale={1}
                        action='add'
                        setModal={setModal}
                        setRecipes={setRecipes}
                        dndTarget={dndTarget}
                        recipes={recipes}
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
          <a
            href='#addAll'
            onClick={addAllImagesToTargetPdf}
          >
            {labels.button_addAll}
          </a>
        </div>
      ) : null}
    </div>
  )
}

DnDImages.propTypes = {
  dndTarget: RecipeTypePropType.isRequired,
  files: FilesPropType.isRequired,
  labels: LabelsPropType.isRequired,
  recipes: RecipesPropType.isRequired,
  setRecipes: PT.func.isRequired
}

export default DnDImages
