import {
  PickImageStep,
  PickPageStep,
  Recipes,
  RecipeType,
  SpecialPageStep
} from 'declarations/PDFEditor.d'
import { RecipesPropType } from 'declarations/PDFEditor.pt'
import _ from 'lodash'
import PT from 'prop-types'
import React from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

export interface DnDProps {
  setRecipes: (r: Recipes) => void;
  recipes: Recipes;
  children: any;
}

const DnD: React.FC<DnDProps> = ({
  setRecipes, recipes, children
}: DnDProps): JSX.Element => {
  const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
    const newList = Array.from(list)
    const [removed] = newList.splice(startIndex, 1)
    newList.splice(endIndex, 0, removed)
    return newList
  }

  const onDragEnd = (result: DropResult) => {
    const newRecipes = _.clone(recipes)
    let modified = false

    if (!result.destination) { // 'dragged to nowhere'
      return
    }

    // get target ID
    let lastIndexOf = result.destination.droppableId.lastIndexOf('-')
    const targetId: RecipeType = result.destination.droppableId.substring(lastIndexOf + 1) as RecipeType

    // get source ID
    lastIndexOf = result.source.droppableId.lastIndexOf('-')
    const sourceId: RecipeType = result.source.droppableId.substring(lastIndexOf + 1) as RecipeType

    // dragged from a PDF source...
    if (_.startsWith(result.source.droppableId, 'a-pdf-dndSource-droppable-')) {
      // ...to another PDF source? skip it
      if (_.startsWith(result.destination.droppableId, 'a-pdf-dndSource-droppable-')) {
        return
      }

      // ...to a PDF target? Add it
      const lastIndexOf = result.draggableId.lastIndexOf('-')
      const name = result.draggableId.substring(0, lastIndexOf)
      const pageNumber = parseInt(result.draggableId.substring(lastIndexOf + 1), 10)

      if (!newRecipes[targetId]) {
        newRecipes[targetId] = []
      }

      newRecipes[targetId]!.splice(result.destination.index, 0, {
        name: name,
        pageNumber: pageNumber
      } as PickPageStep)

      modified = true
    }

    // dragged from a image source...
    if (_.startsWith(result.source.droppableId, 'a-pdf-dndImages-droppable-')) {
      // ...to same image source? skip it
      if (_.startsWith(result.destination.droppableId, 'a-pdf-dndImages-droppable-')) {
        return
      }

      // ...to DnD target? Add it
      if (!newRecipes[targetId]) {
        newRecipes[targetId] = []
      }

      newRecipes[targetId]!.splice(result.destination.index, 0, {
        name: result.draggableId
      } as PickImageStep)

      modified = true
    }

    // dragged from a PDF target...
    if (_.startsWith(result.source.droppableId, 'a-pdf-dndTarget-droppable-')) {
      // ... to the same PDF target: reorder
      if (_.startsWith(result.destination.droppableId, 'a-pdf-dndTarget-droppable-')) {
        newRecipes[targetId] = reorder(newRecipes[targetId]!, result.source.index, result.destination.index)
        modified = true
      }

      // ... to another PDF source: remove
      if (_.startsWith(result.destination.droppableId, 'a-pdf-dndSource-droppable-')) {
        newRecipes[sourceId]!.splice(result.source.index, 1)
        modified = true
      }

      // ... to image source: remove
      if (_.startsWith(result.destination.droppableId, 'a-pdf-dndImages-droppable-')) {
        newRecipes[sourceId]!.splice(result.source.index, 1)
        modified = true
      }
    }

    // dragged from a special PDF ...
    if (_.startsWith(result.source.droppableId, 'a-pdf-dndSpecial-droppable')) {
      // ... only accept to a PDF target
      if (!_.startsWith(result.destination.droppableId, 'a-pdf-dndTarget-droppable-')) {
        return
      }

      if (!newRecipes[targetId]) {
        newRecipes[targetId] = []
      }

      const payload = JSON.parse(decodeURIComponent(result.draggableId))

      newRecipes[targetId]!.splice(result.destination.index, 0, {
        separatorText: payload.separatorText,
        separatorTextColor: payload.separatorTextColor
      } as SpecialPageStep)

      modified = true
    }

    if (modified) {
      setRecipes(newRecipes)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {children}
    </DragDropContext>
  )
}

DnD.propTypes = {
  setRecipes: PT.func.isRequired,
  recipes: RecipesPropType.isRequired,
  children: PT.node.isRequired
}

export default DnD
