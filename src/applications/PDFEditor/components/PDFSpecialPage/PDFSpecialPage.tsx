import {
  Recipes,
  RecipeType,
  Separator
} from 'declarations/PDFEditor.d'
import {
  RecipesPropType,
  RecipeTypePropType,
  SeparatorPropType
} from 'declarations/PDFEditor.pt'
import classNames from 'classnames'
import _ from 'lodash'
import { Ikon } from 'Nav'
import PT from 'prop-types'
import React, { useState } from 'react'
import './PDFSpecialPage.css'
import { ActionCreators } from 'declarations/types.d'
import { ActionCreatorsPropType } from 'declarations/types.pt'

export interface PDFSpecialPageProps {
  actions: ActionCreators;
  className ?: string;
  deleteLink: boolean;
  dndTarget: RecipeType;
  pageScale: number;
  recipes: Recipes;
  separator: Separator;
  style?: React.CSSProperties;
}

const PDFSpecialPage: React.FC<PDFSpecialPageProps> = ({
  actions, className, deleteLink, dndTarget, pageScale, recipes, separator, style = {}
}: PDFSpecialPageProps): JSX.Element => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const onHandleMouseEnter = () => setIsHovering(true)
  const onHandleMouseOver = () => setIsHovering(true)
  const onHandleMouseLeave = () => setIsHovering(false)

  const onDeleteFile = (separatorText: string) => {
    const newRecipes = _.clone(recipes)
    const index = _.findIndex(recipes[dndTarget], { separatorText: separatorText } as Separator)
    if (index >= 0) {
      newRecipes[dndTarget]!.splice(index, 1)
      actions.setRecipes(newRecipes)
    }
  }

  return (
    <div
      style={style} className={classNames('a-pdf-PDFSpecialPage', className)}
      onMouseEnter={onHandleMouseEnter}
      onMouseOver={onHandleMouseOver}
      onMouseLeave={onHandleMouseLeave}
    >
      {isHovering && deleteLink ? (
        <div onClick={() => onDeleteFile(separator.separatorText)} className='link deleteLink'>
          <Ikon size={15} kind='trashcan' />
        </div>
      ) : null}
      <div className='page' style={{ maxWidth: '100%', maxHeight: '100%', width: 100 * pageScale, height: 140 * pageScale }}>
        <div
          className='content' style={{
            color: `rgba(${separator.separatorTextColor.r}, ${separator.separatorTextColor.g}, ${separator.separatorTextColor.b}, ${separator.separatorTextColor.a})`
          }}
        >{separator.separatorText}
        </div>
      </div>
    </div>
  )
}

PDFSpecialPage.propTypes = {
  actions: ActionCreatorsPropType.isRequired,
  className: PT.string,
  deleteLink: PT.bool.isRequired,
  dndTarget: RecipeTypePropType.isRequired,
  pageScale: PT.number.isRequired,
  recipes: RecipesPropType.isRequired,
  separator: SeparatorPropType.isRequired,
  style: PT.any
}

export default PDFSpecialPage
