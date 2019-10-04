import React from 'react'
import PT from 'prop-types'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

const PDFSizeSlider = ({ labelTooltip, pageScale, style, actions }) => {
  const onChange = (value) => {
    actions.setPdfSize(value)
  }

  return (
    <div style={style} className='c-pdf-PDFSizeSlider' title={labelTooltip}>
      <Slider value={pageScale} min={0.5} max={2.5} step={0.1} onChange={onChange} />
    </div>
  )
}

PDFSizeSlider.propTypes = {
  t: PT.func.isRequired,
  pageScale: PT.number.isRequired,
  actions: PT.object,
  style: PT.object
}

export default PDFSizeSlider
