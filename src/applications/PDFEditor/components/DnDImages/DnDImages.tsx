import {
  Files,
  Labels,
  Recipes,
  RecipeStep,
  RecipeSteps,
  RecipeType
} from 'applications/PDFEditor/declarations/PDFEditor'
import classNames from 'classnames'
import _ from 'lodash'
import PT from 'prop-types'
import React, { useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import DnDPage from '../DnDPage/DnDPage'
import './DnDImages.css'

export interface DnDImagesProps {
  setRecipes: (r: Recipes) => void;
  dndTarget: RecipeType;
  files: Files;
  labels: Labels;
  recipes: Recipes;
}

const DnDImages: React.FC<DnDImagesProps> = (props: DnDImagesProps): JSX.Element => {
  const { setRecipes, dndTarget, files, labels, recipes } = props
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const onHandleMouseEnter: () => void = () => setIsHovering(true)
  const onHandleMouseLeave: () => void = () => setIsHovering(false)

  const addAllImagesToTargetPdf = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const potentialImages: RecipeSteps = []

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
    potentialImages.map((image: RecipeStep) => {
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
            {files.map((file, index) => {
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
                        {...props}
                        className={classNames({ 'a-pdf-dndImages-draggable-active': snapshot.isDragging })}
                        file={file}
                        action='add'
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
  labels: PT.oneOf<Labels>([]).isRequired,
  setRecipes: PT.func.isRequired,
  recipes: PT.oneOf<Recipes>([]).isRequired,
  dndTarget: PT.oneOf<RecipeType>([]).isRequired
}

export default DnDImages
