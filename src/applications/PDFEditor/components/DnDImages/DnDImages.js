import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import PT from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import PageInDnD from '../PageInDnD/PageInDnD'
import './DnDImages.css'

const DnDImages = ({ actions, dndTarget, files, labels, pageScale, recipe }) => {
  const [isHovering, setIsHovering] = useState(false)

  const onHandleMouseEnter = () => {
    setIsHovering(true)
  }

  const onHandleMouseLeave = () => {
    setIsHovering(false)
  }

  const addAllImagesToTargetPdf = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const potentialImages = []
    const newRecipe = _.clone(recipe)
    let modified = false

    _.filter(files, (file) => {
      return file.mimetype.startsWith('image/')
    }).map(file => {
      return potentialImages.push({ name: file.name, type: 'pickImage' })
    })

    if (!newRecipe[dndTarget]) {
      newRecipe[dndTarget] = []
    }
    potentialImages.map(image => {
      if (!_.find(recipe[dndTarget], { name: image.name })) {
        modified = true
        return newRecipe[dndTarget].push(image)
      }
      return image
    })

    if (modified) {
      actions.setRecipe(newRecipe)
    }
  }

  return (
    <div
      className='c-pdf-dndImages position-relative'
      onMouseEnter={onHandleMouseEnter}
      onMouseLeave={onHandleMouseLeave}
    >
      <Droppable isDropDisabled droppableId='c-pdf-dndImages-droppable-images' direction='horizontal'>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={classNames('c-pdf-dndImages-droppable', { 'c-pdf-dndImages-droppable-active': snapshot.isDraggingOver })}
          >
            {files.map((file, index) => {
              if (_.find(recipe[dndTarget], { name: file.name })) {
                return null
              }
              return (
                <Draggable key={file.name} draggableId={file.name} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className={classNames('c-pdf-dndImages-draggable', { dragging: snapshot.isDragging })}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <PageInDnD
                        className={classNames({ 'c-pdf-dndImages-draggable-active': snapshot.isDragging })}
                        file={file} action='add'
                      />
                    </div>
                  )}
                </Draggable>
              )
            })}
          </div>
        )}
      </Droppable>
      {isHovering ? (<div className='addAllLink'>
        <a
          href='#addAll'
          onClick={addAllImagesToTargetPdf}
        >
          {labels.addAll}
        </a>
      </div>
      ) : null}
    </div>
  )
}

DnDImages.propTypes = {
  t: PT.func.isRequired,
  actions: PT.object,
  recipe: PT.array,
  pageScale: PT.number,
  dndTarget: PT.string
}

export default DnDImages
