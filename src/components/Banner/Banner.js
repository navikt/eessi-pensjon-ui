import React from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import { Lenke, Systemtittel } from '../../Nav'
import './Banner.css'

const Banner = ({ className, labelHighContrast = 'Høy kontrast', header, toggleHighContrast }) => (
  <div className={classNames('c-banner', className)}>
    {toggleHighContrast ? (
      <Lenke
        id='c-banner__highcontrast-link-id'
        className='c-banner__highcontrast-link mt-1'
        href='#highContrast'
        onClick={toggleHighContrast}
      >
        {labelHighContrast}
      </Lenke>) : null}
    <Systemtittel
      className='c-banner__title m-4 pt-4 pb-4 text-center'
    >
      {header}
    </Systemtittel>
  </div>
)

Banner.propTypes = {
  className: PT.string,
  labelHighContrast: PT.string,
  header: PT.string,
  toggleHighContrast: PT.func
}

Banner.displayName = 'Banner'
export default Banner
