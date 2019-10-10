import React from 'react'
import PT from 'prop-types'
import Collapse from 'rc-collapse'
import _ from 'lodash'
import { Ekspanderbartpanel, Row, Column } from '../../../../Nav'
import DnDSource from '../DnDSource/DnDSource'
import DnDSpecial from '../DnDSpecial/DnDSpecial'
import DnDImages from '../DnDImages/DnDImages'
import DnDTarget from '../DnDTarget/DnDTarget'
import DnD from '../DnD'
import PDFSizeSlider from '../PDFSizeSlider'
import 'rc-collapse/assets/index.css'

const Editor = (props) => {
  const { actions, dndTarget, files, labels, recipes, targets = ['other'], pageScale } = props
  const handleAccordionChange = (index) => {
    if (!index) { return }
    actions.setActiveDnDTarget(index)
  }

  const getImageFiles = (files) => {
    return _.filter(files, (file) => file.mimetype.startsWith('image/'))
  }

  const getPdfFiles = (files) => {
    return _.filter(files, (file) => file.mimetype === 'application/pdf')
  }

  const imageCollapse = (imageFiles) => {
    if (_.isEmpty(imageFiles)) { return null }
    return (
      <Ekspanderbartpanel apen key='images' tittel={labels.label_images} tittelProps='undertittel'>
        <DnDImages
          {...props}
          setRecipes={actions.setRecipes}
          files={imageFiles} />
      </Ekspanderbartpanel>
    )
  }

  const pdfCollapse = (pdfFiles) => (
    pdfFiles.map((file, i) => (
      <Ekspanderbartpanel apen key={'pdf-' + i} tittel={file.name} tittelProps='undertittel'>
        <DnDSource
          {...props}
          setRecipes={actions.setRecipes}
          pdf={file}/>
      </Ekspanderbartpanel>
    ))
  )

  const imageFiles = getImageFiles(files)
  const pdfFiles = getPdfFiles(files)
  const imageCollapsed = imageCollapse(imageFiles)
  const pdfCollapsed = pdfCollapse(pdfFiles)

  const openedPanels = Array(files.length).fill().map((v, i) => { return 'pdf-' + i })
  if (imageCollapsed) {
    openedPanels.push('images')
  }

  return (
    <div className='a-pdfeditor fieldset m-0 mt-4'>
      <div className='a-pdfeditor__header m-2'>
        <h4>{labels.label_documentBox}</h4>
        <PDFSizeSlider
          labelTooltip={labels.help_sizeSliderTooltip}
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
                <Collapse.Panel key={target} header={labels['label_' + target] + ' (' + (recipes[target] ? recipes[target].length : '0') + ')'} showArrow>
                  <DnDTarget {...props} recipe={recipes[target]} target={target} />
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
                  <DnDSpecial {...props}/>
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
  actions: PT.object,
  dndTarget: PT.string,
  files: PT.array.isRequired,
  labels: PT.object,
  recipes: PT.object.isRequired,
  pageScale: PT.number,
  targets: PT.array.isRequired
}

export default Editor
