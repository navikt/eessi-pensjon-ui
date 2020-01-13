import React from 'react'
import PT from 'prop-types'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

export interface PDFSizeSliderProps {
  labelTooltip: string;
  pageScale: number;
  style?: React.CSSProperties;
  setPdfSize: (value: number) => void;
}

const PDFSizeSlider: React.FC<PDFSizeSliderProps> = ({
  labelTooltip, pageScale, style, setPdfSize
}: PDFSizeSliderProps): JSX.Element => {
  const onChange = (value: number) => {
    setPdfSize(value)
  }

  return (
    <div style={style} className='a-pdf-PDFSizeSlider' title={labelTooltip}>
      <Slider value={pageScale} min={0.5} max={2.5} step={0.1} onChange={onChange} />
    </div>
  )
}

PDFSizeSlider.propTypes = {
  labelTooltip: PT.string.isRequired,
  pageScale: PT.number.isRequired,
  setPdfSize: PT.func.isRequired,
  style: PT.any
}

export default PDFSizeSlider
