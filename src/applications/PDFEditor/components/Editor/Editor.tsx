import DnD from 'applications/PDFEditor/components/DnD'
import PDFSizeSlider from 'applications/PDFEditor/components/PDFSizeSlider'
import { ModalContent } from 'declarations/components'
import { Recipes, RecipeType } from 'declarations/PDFEditor.d'
import { RecipeTypePropType } from 'declarations/PDFEditor.pt'
import { Files, Labels } from 'declarations/types.d'
import { LabelsPropType } from 'declarations/types.pt'
import _ from 'lodash'
import { Column, Ekspanderbartpanel, Row } from 'Nav'
import PT from 'prop-types'
import Collapse from 'rc-collapse'
import 'rc-collapse/assets/index.css'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as pdfActions from '../../actions/pdf'
import { State } from '../../reducer'
import DnDImages from '../DnDImages/DnDImages'
import DnDSource from '../DnDSource/DnDSource'
import DnDSpecial from '../DnDSpecial/DnDSpecial'
import DnDTarget from '../DnDTarget/DnDTarget'

export interface EditorProps {
  labels: Labels;
  recipes: Recipes;
  targets: Array<RecipeType>;
}

const Editor: React.FC<EditorProps> = ({
  labels, targets = ['other']
}: EditorProps): JSX.Element => {
  const dispatch = useDispatch()
  const dndTarget: RecipeType = useSelector<State, RecipeType>(state => state.dndTarget)
  const recipes: Recipes = useSelector<State, Recipes>(state => state.recipes)
  const files: Files = useSelector<State, Files>(state => state.files)
  const pageScale: number = useSelector<State, number>(state => state.pageScale)
  const setRecipes = (newRecipes: Recipes) => dispatch(pdfActions.setRecipes(newRecipes))
  const setModal = (modal: ModalContent | undefined) => dispatch(pdfActions.setModal(modal))

  const handleAccordionChange = (dndTarget: string) => {
    if (!dndTarget) {
      return
    }
    dispatch(pdfActions.setActiveDnDTarget(dndTarget))
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
          dndTarget={dndTarget}
          labels={labels}
          recipes={recipes}
          setRecipes={setRecipes}
          setModal={setModal}
          files={imageFiles}
        />
      </Ekspanderbartpanel>
    )
  }

  const pdfCollapse = (pdfFiles: Files): Array<JSX.Element> => (
    pdfFiles.map((file, i) => (
      <Ekspanderbartpanel apen key={'pdf-' + i} tittel={file.name} tittelProps='undertittel'>
        <DnDSource
          labels={labels}
          recipes={recipes}
          pageScale={pageScale}
          dndTarget={dndTarget}
          setRecipes={setRecipes}
          setModal={setModal}
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
          setPdfSize={pdfActions.setPdfSize}
          style={{ width: '25%' }}
        />
      </div>
      <DnD recipes={recipes} setRecipes={setRecipes}>
        <Row>
          <Column className='col-sm-2 mb-4'>
            <Collapse
              className='dndtargets'
              destroyInactivePanel
              activeKey={dndTarget}
              accordion
              onChange={handleAccordionChange}
            >
              {targets.map((target) => (
                <Collapse.Panel key={target} header={labels['label_' + target] + ' (' + (recipes[target] ? recipes[target]!.length : '0') + ')'} showArrow>
                  <DnDTarget
                    files={files}
                    pageScale={pageScale}
                    recipes={recipes}
                    dndTarget={dndTarget}
                    recipe={recipes[target]!}
                    target={target}
                    setRecipes={setRecipes}
                    setModal={setModal}
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
                    labels={labels}
                    recipes={recipes}
                    pageScale={pageScale}
                    setRecipes={setRecipes}
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
  labels: LabelsPropType.isRequired,
  recipes: PT.object.isRequired,
  targets: PT.arrayOf(RecipeTypePropType.isRequired).isRequired
}

export default Editor
