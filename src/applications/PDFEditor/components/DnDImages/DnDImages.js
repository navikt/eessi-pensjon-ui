import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import PT from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import DnDPage from '../DnDPage/DnDPage'
import './DnDImages.css'

const DnDImages = (props) => {
  const { setRecipes, dndTarget, files, labels, pageScale, recipes } = props
  const [isHovering, setIsHovering] = useState(false)
  const onHandleMouseEnter = () => setIsHovering(true)
  const onHandleMouseLeave = () => setIsHovering(false)

  const addAllImagesToTargetPdf = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const potentialImages = []
    const newRecipes = _.clone(recipes)
    let modified = false

    _.filter(files, (file) => {
      return file.mimetype.startsWith('image/')
    }).map(file => {
      return potentialImages.push({ name: file.name, type: 'pickImage' })
    })

    if (!newRecipes[dndTarget]) {
      newRecipes[dndTarget] = []
    }
    potentialImages.map(image => {
      if (!_.find(recipes[dndTarget], { name: image.name })) {
        modified = true
        return newRecipes[dndTarget].push(image)
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
  setRecipes: PT.func.isRequired,
  recipes: PT.array,
  pageScale: PT.number,
  dndTarget: PT.string
}

export default DnDImages
