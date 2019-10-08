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

const PDFEditor = ({ actions, dndTarget, files, labels, recipe, pageScale }) => {
  const handleAccordionChange = (index) => {
    if (!index) { return }
    actions.setActiveDnDTarget(index)
  }

  const getImageFiles = (files) => {
    return _.filter(files, (file) => { return file.mimetype.startsWith('image/') })
  }

  const getPdfFiles = (files) => {
    return _.filter(files, (file) => { return file.mimetype === 'application/pdf' })
  }

  const imageCollapse = (imageFiles) => {
    if (_.isEmpty(imageFiles)) { return null }
    return (
      <Ekspanderbartpanel apen key='images' tittel={labels.images} tittelProps='undertittel'>
        <DnDImages files={imageFiles} />
      </Ekspanderbartpanel>
    )
  }

  const pdfCollapse = (pdfFiles) => {
    return pdfFiles.map((file, i) => {
      return (
        <Ekspanderbartpanel apen key={'pdf-' + i} tittel={file.name} tittelProps='undertittel'>
          <DnDSource pdf={file} />
        </Ekspanderbartpanel>
      )
    })
  }

  const imageFiles = getImageFiles(files)
  const pdfFiles = getPdfFiles(files)
  const imageCollapsed = imageCollapse(imageFiles)
  const pdfCollapsed = pdfCollapse(pdfFiles)

  const openedPanels = Array(files.length).fill().map((v, i) => { return 'pdf-' + i })
  if (imageCollapsed) {
    openedPanels.push('images')
  }

  return (
    <div className='documentbox fieldset m-0 mt-4'>
      <div className='documentbox-header m-2'>
        <h4>{labels.documentBox}</h4>
        <PDFSizeSlider
          labelTooltip={labels['help-sizeSliderTooltip']}
          pageScale={pageScale}
          actions={actions}
          style={{ width: '25%' }}
        />
      </div>
      <DnD recipe={recipe} actions={actions}>
        <Row>
          <Column className='col-sm-2 mb-4'>
            <Collapse className='dndtargets' destroyInactivePanel activeKey={dndTarget} accordion onChange={handleAccordionChange}>
              <Collapse.Panel key='work' header={labels.work + ' (' + (recipe.work ? recipe.work.length : '0') + ')'} showArrow>
                <DnDTarget targetId='work' />
              </Collapse.Panel>
              <Collapse.Panel key='home' header={labels.home + ' (' + (recipe.home ? recipe.home.length : '0') + ')'} showArrow>
                <DnDTarget targetId='home' />
              </Collapse.Panel>
              <Collapse.Panel key='sick' header={labels.sick + ' (' + (recipe.sick ? recipe.sick.length : '0') + ')'} showArrow>
                <DnDTarget targetId='sick' />
              </Collapse.Panel>
              <Collapse.Panel key='other' header={labels.other + ' (' + (recipe.other ? recipe.other.length : '0') + ')'} showArrow>
                <DnDTarget targetId='other' />
              </Collapse.Panel>
            </Collapse>
          </Column>
          <Column className='col-sm-10 mb-4'>
            <div className='h-100'>
              {!files ? null : (
                <Collapse
                  className='mb-4' defaultActiveKey={openedPanels}
                  destroyInactivePanel={false} accordion={false}
                >
                  <Ekspanderbartpanel apen={false} key='special' tittel={labels['specials-title']} tittelProps='undertittel'>
                    <DnDSpecial />
                  </Ekspanderbartpanel>
                  {imageCollapsed}
                  {pdfCollapsed}
                </Collapse>
              )}
            </div>
          </Column>
        </Row>
      </DnD>
    </div>
  )
}

PDFEditor.propTypes = {
  actions: PT.object,
  dndTarget: PT.object,
  files: PT.array.isRequired,
  labels: PT.object,
  recipe: PT.object.isRequired,
  pageScale: PT.number
}

export default PDFEditor
