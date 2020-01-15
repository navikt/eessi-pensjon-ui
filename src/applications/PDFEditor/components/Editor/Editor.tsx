import {
  Recipes,
  RecipeType,
  Separator,
  Watermark
} from 'declarations/PDFEditor.d'
import {
  RecipeTypePropType
} from 'declarations/PDFEditor.pt'
import _ from 'lodash'
import { Column, Ekspanderbartpanel, Row } from 'Nav'
import PT from 'prop-types'
import Collapse from 'rc-collapse'
import 'rc-collapse/assets/index.css'
import React from 'react'
import { ActionCreators, Files, Labels } from 'declarations/types.d'
import { ActionCreatorsPropType, FilesPropType, LabelsPropType } from 'declarations/types.pt'
import DnD from 'applications/PDFEditor/components/DnD'
import DnDImages from '../DnDImages/DnDImages'
import DnDSource from '../DnDSource/DnDSource'
import DnDSpecial from '../DnDSpecial/DnDSpecial'
import DnDTarget from '../DnDTarget/DnDTarget'
import PDFSizeSlider from 'applications/PDFEditor/components/PDFSizeSlider'

export interface EditorProps {
  actions: ActionCreators;
  dndTarget: RecipeType;
  files: Files;
  labels: Labels;
  recipes: Recipes;
  separator: Separator;
  watermark: Watermark;
  targets: Array<RecipeType>;
  pageScale: number;
}

const Editor: React.FC<EditorProps> = ({
  actions, dndTarget, files, labels, recipes, targets = ['other'], pageScale, separator, watermark

}: EditorProps): JSX.Element => {
  const handleAccordionChange = (index: number) => {
    if (!index) { return }
    actions.setActiveDnDTarget(index)
  }

  const getImageFiles = (files: Files): Files => {
    return _.filter(files, (file) => file.mimetype.startsWith('image/'))
  }

  const getPdfFiles = (files: Files) => {
    return _.filter(files, (file) => file.mimetype === 'application/pdf')
  }

  const imageCollapse = (imageFiles: Files): JSX.Element => {
    if (_.isEmpty(imageFiles)) { return <div /> }
    return (
      <Ekspanderbartpanel apen key='images' tittel={labels.label_images} tittelProps='undertittel'>
        <DnDImages
          actions={actions}
          dndTarget={dndTarget}
          labels={labels}
          recipes={recipes}
          setRecipes={actions.setRecipes}
          files={imageFiles}
        />
      </Ekspanderbartpanel>
    )
  }

  const pdfCollapse = (pdfFiles: Files): Array<JSX.Element> => (
    pdfFiles.map((file, i) => (
      <Ekspanderbartpanel apen key={'pdf-' + i} tittel={file.name} tittelProps='undertittel'>
        <DnDSource
          actions={actions}
          labels={labels}
          recipes={recipes}
          pageScale={pageScale}
          dndTarget={dndTarget}
          setRecipes={actions.setRecipes}
          pdf={file}
        />
      </Ekspanderbartpanel>
    ))
  )

  const imageFiles = getImageFiles(files)
  const pdfFiles = getPdfFiles(files)
  const imageCollapsed = imageCollapse(imageFiles)
  const pdfCollapsed = pdfCollapse(pdfFiles)

  const openedPanels = Array(files.length).fill(0).map((v, i) => { return 'pdf-' + i })
  if (imageCollapsed) {
    openedPanels.push('images')
  }

  return (
    <div className='a-pdfeditor fieldset m-0 mt-4'>
      <div className='a-pdfeditor__header m-2'>
        <h4>{labels.label_documentBox}</h4>
        <PDFSizeSlider
          labelTooltip={labels.help_sizeSliderTooltip!}
          pageScale={pageScale}
          setPdfSize={actions.setPdfSize}
          style={{ width: '25%' }}
        />
      </div>
      <DnD recipes={recipes} setRecipes={actions.setRecipes}>
        <Row>
          <Column className='col-sm-2 mb-4'>
            <Collapse className='dndtargets' destroyInactivePanel activeKey={dndTarget} accordion onChange={handleAccordionChange}>
              {targets.map((target) => (
                <Collapse.Panel key={target} header={labels['label_' + target] + ' (' + (recipes[target] ? recipes[target]!.length : '0') + ')'} showArrow>
                  <DnDTarget
                    actions={actions}
                    files={files}
                    pageScale={pageScale}
                    recipes={recipes}
                    dndTarget={dndTarget}
                    recipe={recipes[target]!}
                    target={target}
                  />
                </Collapse.Panel>
              ))}
            </Collapse>
          </Column>
          <Column className='col-sm-10 mb-4'>
            <div className='h-100'>
              <Collapse
                className='mb-4'
                defaultActiveKey={openedPanels}
                destroyInactivePanel={false}
                accordion={false}
              >
                <Ekspanderbartpanel apen={false} key='special' tittel={labels.title_specials} tittelProps='undertittel'>
                  <DnDSpecial
                    dndTarget={dndTarget}
                    separator={separator}
                    watermark={watermark}
                    actions={actions}
                    labels={labels}
                    recipes={recipes}
                    pageScale={pageScale}
                  />
                </Ekspanderbartpanel>
                {imageCollapsed}
                {pdfCollapsed}
              </Collapse>
            </div>
          </Column>
        </Row>
      </DnD>
    </div>
  )
}

Editor.propTypes = {
  actions: ActionCreatorsPropType.isRequired,
  dndTarget: RecipeTypePropType.isRequired,
  files: FilesPropType.isRequired,
  labels: LabelsPropType.isRequired,
  recipes: PT.object.isRequired,
  pageScale: PT.number.isRequired,
  targets: PT.arrayOf(RecipeTypePropType.isRequired).isRequired
}

export default Editor
