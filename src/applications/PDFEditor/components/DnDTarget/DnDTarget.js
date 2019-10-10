import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import PT from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import DnDPage from '../DnDPage/DnDPage'
import PDFSpecialPage from '../PDFSpecialPage/PDFSpecialPage'
import './DnDTarget.css'

const DnDTarget = (props) => {
  const { files, recipe, target } = props
  return <div className='a-pdf-dndTarget'>
    <Droppable droppableId={'a-pdf-dndTarget-droppable-' + target}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={classNames('a-pdf-dndTarget-droppable', 'text-center', { 'a-pdf-dndTarget-droppable-active ': snapshot.isDraggingOver })}
        >
          {recipe ? recipe.map((recipeStep, index) => {
            const file = _.find(files, { name: recipeStep.name })
            return (
              <Draggable key={index} draggableId={'' + index} index={index}>
                {(provided, snapshot) => (
                  <div
                    className={classNames('a-pdf-dndTarget-draggable', { dragging: snapshot.isDragging })}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {recipeStep.type === 'pickPage' || recipeStep.type === 'pickImage'
                      ? (
                        <DnDPage
                          {...props}
                          className={classNames({ 'a-pdf-dndTarget-draggable-active': snapshot.isDragging })}
                          file={file}
                          pageNumber={recipeStep.pageNumber}
                          action='remove'
                        />
                      )
                      : recipeStep.type === 'specialPage'
                        ? (
                          <PDFSpecialPage

                            separator={{
                              separatorTextColor: recipeStep.separatorTextColor,
                              separatorText: recipeStep.separatorText
                            }} deleteLink
                          />
                        )
                        : null}
                  </div>
                )}
              </Draggable>
            )
          }) : null}
        </div>
      )}
    </Droppable>
  </div>
}

DnDTarget.propTypes = {
  recipes: PT.object.isRequired,
  files: PT.array.isRequired,
  target: PT.string.isRequired
}

export default DnDTarget
