import React, { useState } from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import { Ikon } from '../../../../Nav'
import './PDFSpecialPage.css'

const PDFSpecialPage = ({ actions, className, deleteLink, dndTarget, pageScale, recipes, separator, style }) => {
  const [isHovering, setIsHovering] = useState(false)
  const onHandleMouseEnter = () => setIsHovering(true)
  const onHandleMouseOver = () => setIsHovering(true)
  const onHandleMouseLeave = () => setIsHovering(false)

  const onDeleteFile = (separatorText) => {
    const newRecipes = _.clone(recipes)
    const index = _.findIndex(recipes[dndTarget], { separatorText: separatorText })
    if (index >= 0) {
      newRecipes[dndTarget].splice(index, 1)
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
  recipes: PT.object.isRequired,
  pageScale: PT.number.isRequired,
  className: PT.string,
  style: PT.object,
  dndTarget: PT.string,
  deleteLink: PT.bool,
  actions: PT.object,
  separator: PT.object
}

export default PDFSpecialPage
