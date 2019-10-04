import React, { useState } from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import { Ikon } from '../../../../Nav'
import './PDFSpecialPage.css'

const PDFSpecialPage = ({ actions, className, deleteLink, dndTarget, pageScale, recipe, separator, style }) => {
  const [, setIsHovering] = useState(false)

  const onHandleMouseEnter = () => {
    setIsHovering(true)
  }

  const onHandleMouseOver = () => {
    setIsHovering(true)
  }

  const onHandleMouseLeave = () => {
    setIsHovering(false)
  }

  const onDeleteDocument = (separatorText, e) => {
    e.stopPropagation()
    e.preventDefault()
    const newRecipe = _.clone(recipe)
    const index = _.findIndex(recipe[dndTarget], { separatorText: separatorText })
    if (index >= 0) {
      newRecipe[dndTarget].splice(index, 1)
      actions.setRecipe(newRecipe)
    }
  }

  return (
    <div
      style={style} className={classNames('c-pdf-PDFSpecialPage', className)}
      onMouseEnter={onHandleMouseEnter}
      onMouseOver={onHandleMouseOver}
      onMouseLeave={onHandleMouseLeave}
    >
      {this.state.isHovering && deleteLink ? (
        <div onClick={() => onDeleteDocument(separator.separatorText)} className='link deleteLink'>
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
  recipe: PT.object.isRequired,
  pageScale: PT.number.isRequired,
  className: PT.string,
  style: PT.object,
  dndTarget: PT.string,
  deleteLink: PT.bool,
  actions: PT.object,
  separator: PT.object
}

export default PDFSpecialPage
