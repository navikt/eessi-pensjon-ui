import React from 'react'
import PT from 'prop-types'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

const PDFSizeSlider = ({ labelTooltip, pageScale, style, setPdfSize }) => {
  const onChange = (value) => {
    setPdfSize(value)
  }

  return (
    <div style={style} className='a-pdf-PDFSizeSlider' title={labelTooltip}>
      <Slider value={pageScale} min={0.5} max={2.5} step={0.1} onChange={onChange} />
    </div>
  )
}

PDFSizeSlider.propTypes = {
  labelTooltip: PT.string,
  pageScale: PT.number.isRequired,
  setPdfSize: PT.func.isRequired,
  style: PT.object
}

export default PDFSizeSlider
