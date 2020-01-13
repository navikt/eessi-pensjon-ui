import PDFSpecialPage from 'applications/PDFEditor/components/PDFSpecialPage/PDFSpecialPage'
import {
  PickImageStep,
  PickPageStep,
  Recipes,
  RecipeSteps,
  RecipeType,
  Separator
} from 'declarations/PDFEditor.d'
import {
  RecipesPropType,
  RecipeStepsPropType,
  RecipeTypePropType
} from 'declarations/PDFEditor.pt'
import classNames from 'classnames'
import { IFile, IFilePropType } from 'components/File/File'
import _ from 'lodash'
import PT from 'prop-types'
import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { ActionCreators } from 'declarations/types.d'
import { ActionCreatorsPropType } from 'declarations/types.pt'
import DnDPage from '../DnDPage/DnDPage'
import './DnDTarget.css'

export interface DnDTargetProps {
  actions: ActionCreators;
  dndTarget: RecipeType;
  files: Array<IFile>;
  pageScale: number;
  recipes: Recipes;
  recipe: RecipeSteps;
  target: string;
}

const DnDTarget: React.FC<DnDTargetProps> = ({
  actions, dndTarget, files, recipe, recipes, pageScale, target
}: DnDTargetProps): JSX.Element => {
  return (
    <div className='a-pdf-dndTarget'>
      <Droppable droppableId={'a-pdf-dndTarget-droppable-' + target}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={classNames('a-pdf-dndTarget-droppable', 'text-center', { 'a-pdf-dndTarget-droppable-active ': snapshot.isDraggingOver })}
          >
            {recipe ? recipe.map((recipeStep, index) => {
              let file: IFile
              if (_.has(recipeStep, 'name')) {
                file = _.find(files, { name: (recipeStep as PickImageStep | PickPageStep).name })!
              }
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
                            actions={actions}
                            className={classNames({ 'a-pdf-dndTarget-draggable-active': snapshot.isDragging })}
                            dndTarget={dndTarget}
                            file={file}
                            pageScale={pageScale}
                            pageNumber={_.has(recipeStep, 'pageNumber') ? (recipeStep as PickPageStep).pageNumber : undefined}
                            recipes={recipes}
                            action='remove'
                          />
                        )
                        : recipeStep.type === 'specialPage'
                          ? (
                            <PDFSpecialPage
                              actions={actions}
                              dndTarget={dndTarget}
                              separator={{
                                separatorTextColor: recipeStep.separatorTextColor,
                                separatorText: recipeStep.separatorText
                              } as Separator}
                              pageScale={pageScale}
                              recipes={recipes}
                              deleteLink
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
  )
}

DnDTarget.propTypes = {
  actions: ActionCreatorsPropType.isRequired,
  dndTarget: RecipeTypePropType.isRequired,
  files: PT.arrayOf(IFilePropType.isRequired).isRequired,
  pageScale: PT.number.isRequired,
  recipes: RecipesPropType.isRequired,
  recipe: PT.any.isRequired, // RecipeStepsPropType.isRequired,
  target: PT.string.isRequired
}

export default DnDTarget
