import PDFSpecialPage from 'applications/PDFEditor/components/PDFSpecialPage/PDFSpecialPage'
import classNames from 'classnames'
import { ModalContent } from 'declarations/components'
import { PickImageStep, PickPageStep, Recipes, RecipeSteps, RecipeType, Separator } from 'declarations/PDFEditor.d'
import { RecipesPropType, RecipeTypePropType } from 'declarations/PDFEditor.pt'
import { File, Files } from 'forhandsvisningsfil/lib/forhandsvisningsfil.d'
import { FilesPropType } from 'forhandsvisningsfil/lib/forhandsvisningsfil.pt'
import _ from 'lodash'
import PT from 'prop-types'
import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import DnDPage from '../DnDPage/DnDPage'
import './DnDTarget.css'

export interface DnDTargetProps {
  dndTarget: RecipeType;
  files: Files;
  pageScale: number;
  recipes: Recipes;
  recipe: RecipeSteps;
  setRecipes: (r: Recipes) => void;
  setModal: (m: ModalContent | undefined) => void;
  target: string;
}

const DnDTarget: React.FC<DnDTargetProps> = ({
  dndTarget, files, recipe, recipes, pageScale, setRecipes, setModal, target
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
              let file: File
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
                            className={classNames({ 'a-pdf-dndTarget-draggable-active': snapshot.isDragging })}
                            dndTarget={dndTarget}
                            file={file}
                            pageScale={pageScale}
                            pageNumber={_.has(recipeStep, 'pageNumber') ? (recipeStep as PickPageStep).pageNumber : undefined}
                            recipes={recipes}
                            setRecipes={setRecipes}
                            setModal={setModal}
                            action='remove'
                          />
                        )
                        : recipeStep.type === 'specialPage'
                          ? (
                            <PDFSpecialPage
                              dndTarget={dndTarget}
                              separator={{
                                separatorTextColor: recipeStep.separatorTextColor,
                                separatorText: recipeStep.separatorText
                              } as Separator}
                              pageScale={pageScale}
                              recipes={recipes}
                              setRecipes={setRecipes}
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
  dndTarget: RecipeTypePropType.isRequired,
  files: FilesPropType.isRequired,
  pageScale: PT.number.isRequired,
  recipes: RecipesPropType.isRequired,
  recipe: PT.any.isRequired, // RecipeStepsPropType.isRequired,
  target: PT.string.isRequired
}

export default DnDTarget
