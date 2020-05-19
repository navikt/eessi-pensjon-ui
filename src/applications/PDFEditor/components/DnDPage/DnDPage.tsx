import classNames from 'classnames'
import Icons from 'components/Icons/Icons'
import { ModalContent } from 'declarations/components'
import { PickImageStep, PickPageStep, Recipes, RecipeType } from 'declarations/PDFEditor.d'
import { File } from 'forhandsvisningsfil/lib/index.d'
import { FilePropType } from 'forhandsvisningsfil/lib/index.pt'
import _ from 'lodash'
import PT from 'prop-types'
import React, { useState } from 'react'
import { Document, Page } from 'react-pdf'
import './DnDPage.css'

export interface DnDPageProps {
  action: string;
  className ?: string;
  dndTarget: RecipeType;
  file: File;
  isFocused?: boolean;
  pageNumber?: number;
  pageScale: number;
  recipes: Recipes;
  setRecipes: (r: Recipes) => void;
  setModal: (m: ModalContent |undefined) => void;
  style ?: React.CSSProperties;
}

const DnDPage: React.FC<DnDPageProps> = ({
  action, className, dndTarget, file, isFocused = false, pageNumber, pageScale, recipes, setModal, setRecipes, style
}: DnDPageProps): JSX.Element => {
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const onHandleMouseEnter = (): void => setIsHovering(true)
  const onHandleMouseOver = (): void => setIsHovering(true)
  const onHandleMouseLeave = (): void => setIsHovering(false)

  const openPreview = (file: File, pageNumber: number | undefined): void => {
    setModal({
      modalContent: (
        <div style={{ cursor: 'pointer' }} onClick={() => setModal(undefined)}>
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

  const addPageToTargetPdf = (name: string, mimetype: string, pageNumber: number): void => {
    const newRecipes: Recipes = _.clone(recipes)
    if (!newRecipes[dndTarget]) {
      newRecipes[dndTarget] = []
    }

    if (mimetype === 'application/pdf') {
      newRecipes[dndTarget]!.push({ name: name, pageNumber: pageNumber } as PickPageStep)
    } else {
      newRecipes[dndTarget]!.push({ name: name } as PickImageStep)
    }
    setRecipes(newRecipes)
  }

  const removePageFromTargetPdf = (name: string, mimetype: string, pageNumber: number): void => {
    const newRecipes: Recipes = _.clone(recipes)
    let index: number = -1

    if (mimetype === 'application/pdf') {
      index = _.findIndex(recipes[dndTarget], { name: name, pageNumber: pageNumber })
    } else {
      index = _.findIndex(recipes[dndTarget], { name: name })
    }
    if (index >= 0) {
      newRecipes[dndTarget]!.splice(index, 1)
      setRecipes(newRecipes)
    }
  }

  let iconFunction: Function; let iconKind: string; let iconLink: JSX.Element | undefined; let iconSize: string
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
  file: FilePropType.isRequired,
  pageNumber: PT.number.isRequired,
  pageScale: PT.number.isRequired,
  dndTarget: PT.oneOf<RecipeType>([]).isRequired,
  action: PT.string.isRequired,
  className: PT.string,
  setRecipes: PT.func.isRequired,
  setModal: PT.func.isRequired,
  style: PT.object
}

export default DnDPage
