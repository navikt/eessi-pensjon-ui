import React from 'react'
import PT from 'prop-types'
import { Lenke, Systemtittel } from '../../Nav'
import './Banner.css'

const Banner = ({ labelHighContrast = 'Høy kontrast', header, toggleHighContrast }) => (
  <div className='c-banner'>
    <Lenke
      id='c-banner__highcontrast-link-id'
      className='c-banner__highcontrast-link mt-1'
      href='#highContrast'
      onClick={toggleHighContrast}
    >
      {labelHighContrast}
    </Lenke>
    <Systemtittel
      className='c-banner__title m-4 pt-4 pb-4 text-center'
    >
      {header}
    </Systemtittel>
  </div>
)

Banner.propTypes = {
  labelHighContrast: PT.string,
  header: PT.string,
  toggleHighContrast: PT.func.isRequired
}

Banner.displayName = 'Banner'
export default Banner
