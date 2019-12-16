import React, { useState } from 'react'
import { Document, Page } from 'react-pdf'
import PT from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'
import Icons from 'components/Icons/Icons'
import './DnDPage.css'

const DnDPage = (props) => {
  const { actions, action, className, dndTarget, file, isFocused, pageNumber, pageScale, recipes, style } = props
  const [isHovering, setIsHovering] = useState(false)
  const onHandleMouseEnter = () => setIsHovering(true)
  const onHandleMouseOver = () => setIsHovering(true)
  const onHandleMouseLeave = () => setIsHovering(false)

  const openPreview = (file, pageNumber) => {
    actions.setModal({
      modalContent: (
        <div style={{ cursor: 'pointer' }} onClick={() => actions.setModal(undefined)}>
          {file.mimetype === 'application/pdf'
            ? (
              <Document className='documentPreview' file={'data:application/pdf;base64,' + file.content.base64}>
                <Page className='bigpage' width={600} renderMode='svg' pageNumber={pageNumber} />
              </Document>
            ) : null}
          {file.mimetype.startsWith('image/') ? (
            <div className='documentPreview'>
              <img
                className='page' alt={file.name} style={{ width: '600px' }}
                src={'data:' + file.mimetype + ';base64,' + file.content.base64}
              />
            </div>
          ) : null}
        </div>
      )
    })
  }

  const addPageToTargetPdf = (name, mimetype, pageNumber) => {
    const newRecipes = _.clone(recipes)
    if (!newRecipes[dndTarget]) {
      newRecipes[dndTarget] = []
    }

    if (mimetype === 'application/pdf') {
      newRecipes[dndTarget].push({ name: name, pageNumber: pageNumber, type: 'pickPage' })
    } else {
      newRecipes[dndTarget].push({ name: name, type: 'pickImage' })
    }
    actions.setRecipes(newRecipes)
  }

  const removePageFromTargetPdf = (name, mimetype, pageNumber) => {
    const newRecipes = _.clone(recipes)
    let index = -1

    if (mimetype === 'application/pdf') {
      index = _.findIndex(recipes[dndTarget], { name: name, pageNumber: pageNumber })
    } else {
      index = _.findIndex(recipes[dndTarget], { name: name })
    }
    if (index >= 0) {
      newRecipes[dndTarget].splice(index, 1)
      actions.setRecipes(newRecipes)
    }
  }

  let iconFunction, iconKind, iconLink, iconSize
  if (action === 'add') {
    iconFunction = addPageToTargetPdf
    iconKind = 'vedlegg'
    iconSize = '20'
  } else {
    iconFunction = removePageFromTargetPdf
    iconKind = 'trashcan'
    iconSize = '15'
  }

  if (isHovering || isFocused) {
    iconLink = <Icons style={{ cursor: 'pointer' }} size={iconSize} kind={iconKind} />
  }

  return (
    <div
      style={style} className={classNames('a-pdf-DnDPage', className)}
      onMouseEnter={onHandleMouseEnter}
      onMouseOver={onHandleMouseOver}
      onMouseLeave={onHandleMouseLeave}
    >

      {file.mimetype.startsWith('image/') ? (
        <div className='document'>
          <div
            onClick={() => iconFunction(file.name, file.mimetype, pageNumber)}
            className='icon actionIcon'
          >
            {iconLink}
          </div>
          {isHovering || isFocused ? (
            <div className='icon previewIcon' onClick={() => openPreview(file, pageNumber)}>
              <Icons
                style={{ cursor: 'pointer' }}
                size='20' kind='view'
              />
            </div>
          ) : null}
          <img
            className='page'
            alt={file.name} style={{ maxWidth: '100%', width: (100 * pageScale) + 'px' }}
            src={'data:' + file.mimetype + ';base64,' + file.content.base64}
          />
        </div>
      ) : null}
      {file.mimetype === 'application/pdf' ? (
        <Document
          className='document'
          file={'data:application/pdf;base64,' + file.content.base64}
        >
          <div
            onClick={() => iconFunction(file.name, file.mimetype, pageNumber)}
            className='icon actionIcon'
          >
            {iconLink}
          </div>
          {isHovering || isFocused ? (
            <div className='icon previewIcon' onClick={() => openPreview(file, pageNumber)}>
              <Icons style={{ cursor: 'pointer' }} size='1x' kind='view' />
            </div>
          ) : null}
          <Page
            className='page'
            width={100 * pageScale} height={140 * pageScale}
            renderMode='svg' pageNumber={pageNumber}
          />
          <div className='pageNumber'>{pageNumber}</div>
        </Document>
      ) : null}
    </div>
  )
}

DnDPage.propTypes = {
  recipes: PT.object.isRequired,
  actions: PT.object,
  file: PT.object.isRequired,
  pageNumber: PT.number,
  pageScale: PT.number,
  dndTarget: PT.string,
  action: PT.string.isRequired,
  className: PT.string,
  style: PT.object
}

export default DnDPage
