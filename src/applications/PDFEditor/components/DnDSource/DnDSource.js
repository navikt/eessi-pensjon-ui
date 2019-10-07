import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import PT from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import PageInDnD from '../PageInDnD/PageInDnD'
import './DnDSource.css'

const DnDSource = ({ actions, labels, pdf, recipe, pageScale, dndTarget }) => {
  const [isHovering, setIsHovering] = useState(false)
  const [isFocused, setIsFocused] = useState(undefined)

  const onHandleMouseEnter = () => {
    setIsHovering(true)
  }

  const onHandleMouseLeave = () => {
    setIsHovering(false)
  }

  const onHandleFocus = (key) => {
    setIsFocused(key)
  }

  const onHandleBlur = (key) => {
    setIsFocused(undefined)
  }

  const addAllPagesToTargetPdf = (name, e) => {
    e.preventDefault()
    e.stopPropagation()

    const potentialPages = []
    const newRecipe = _.clone(recipe)
    let modified = false

    _.range(1, pdf.numPages + 1).map(pageNumber => {
      return potentialPages.push({ pageNumber: pageNumber, name: name, type: 'pickPage' })
    })

    if (!newRecipe[dndTarget]) {
      newRecipe[dndTarget] = []
    }
    potentialPages.map(page => {
      if (!_.find(newRecipe[dndTarget], page)) {
        modified = true
        return newRecipe[dndTarget].push(page)
      }
      return page
    })

    if (modified) {
      actions.setRecipe(newRecipe)
    }
  }

  let selectedPages = []

  if (recipe[dndTarget]) {
    selectedPages = _.filter(recipe[dndTarget], { name: pdf.name })
  }

  return (
    <div
      className='c-pdf-dndSource position-relative'
      onMouseEnter={onHandleMouseEnter}
      onMouseLeave={onHandleMouseLeave}
    >
      <Droppable droppableId={'c-pdf-dndSource-droppable-' + pdf.name} direction='horizontal'>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={classNames('c-pdf-dndSource-droppable', { 'c-pdf-dndSource-droppable-active': snapshot.isDraggingOver })}
            style={{ minHeight: pageScale * 140 }}
          >
            {_.range(1, pdf.numPages + 1).map(pageNumber => {
              if (_.find(selectedPages, { pageNumber: pageNumber })) {
                return null
              }
              const key = pdf.name + '-' + pageNumber
              return (
                <Draggable key={key} draggableId={key} index={pageNumber}>
                  {(provided, snapshot) => (
                    <div
                      className={classNames('c-pdf-dndSource-draggable', { dragging: snapshot.isDragging })}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onFocus={() => onHandleFocus(key)}
                      onBlur={() => onHandleBlur(key)}
                    >
                      <PageInDnD
                        className={classNames({ 'c-pdf-dndSource-draggable-active': snapshot.isDragging })}
                        style={{
                          minWidth: 100 * pageScale,
                          minHeight: 140 * pageScale
                        }}
                        file={pdf}
                        pageNumber={pageNumber}
                        isFocused={isFocused === key}
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
          <a href='#addAll' onClick={() => addAllPagesToTargetPdf(pdf.name)}>
            {labels.addAll}
          </a>
        </div>
      ) : null}
    </div>
  )
}

DnDSource.propTypes = {
  actions: PT.object,
  dndTarget: PT.string,
  labels: PT.object.isRequired,
  pdf: PT.object.isRequired,
  pageScale: PT.number,
  recipe: PT.object.isRequired
}

export default DnDSource
