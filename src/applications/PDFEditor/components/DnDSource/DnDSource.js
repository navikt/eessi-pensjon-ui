import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import PT from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import DnDPage from '../DnDPage/DnDPage'
import './DnDSource.css'

const DnDSource = (props) => {
  const { setRecipes, labels, pdf, recipes, pageScale, dndTarget } = props
  const [isHovering, setIsHovering] = useState(false)
  const [isFocused, setIsFocused] = useState(undefined)
  const onHandleMouseEnter = () => setIsHovering(true)
  const onHandleMouseLeave = () => setIsHovering(false)
  const onHandleFocus = (key) => setIsFocused(key)
  const onHandleBlur = () => setIsFocused(undefined)

  const addAllPagesToTargetPdf = (name) => {
    const potentialPages = []
    const newRecipes = _.clone(recipes)
    let modified = false

    _.range(1, pdf.numPages + 1).map(pageNumber => {
      return potentialPages.push({ pageNumber: pageNumber, name: name, type: 'pickPage' })
    })

    if (!newRecipes[dndTarget]) {
      newRecipes[dndTarget] = []
    }
    potentialPages.map(page => {
      if (!_.find(newRecipes[dndTarget], page)) {
        modified = true
        return newRecipes[dndTarget].push(page)
      }
      return page
    })

    if (modified) {
      setRecipes(newRecipes)
    }
  }

  let selectedPages = []

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
            {_.range(1, pdf.numPages + 1).map(pageNumber => {
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
                      onBlur={() => onHandleBlur(key)}
                    >
                      <DnDPage
                        {...props}
                        className={classNames({ 'a-pdf-dndSource-draggable-active': snapshot.isDragging })}
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
            {labels.button_addAll}
          </a>
        </div>
      ) : null}
    </div>
  )
}

DnDSource.propTypes = {
  setRecipes: PT.func.isRequired,
  dndTarget: PT.string,
  labels: PT.object.isRequired,
  pdf: PT.object.isRequired,
  pageScale: PT.number,
  recipes: PT.object.isRequired
}

export default DnDSource
