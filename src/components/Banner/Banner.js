import React from 'react'
import PT from 'prop-types'
import classNames from 'classnames'
import _ from 'lodash'
import { Lenke, Systemtittel } from '../../Nav'
import './Banner.css'

const Banner = ({ className, labelHighContrast = 'Høy kontrast', header, onHighContrastClicked, style }) => (
  <div
    className={classNames('c-banner', className)}
    style={style}
  >
    {_(onHighContrastClicked).isFunction() ? (
      <Lenke
        id='c-banner__highcontrast-link-id'
        className='c-banner__highcontrast-link mt-1'
        href='#highContrast'
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onHighContrastClicked()
        }}
      >
        {labelHighContrast}
      </Lenke>) : null}
    <Systemtittel
      className='c-banner__title'
    >
      {header}
    </Systemtittel>
  </div>
)

Banner.propTypes = {
  className: PT.string,
  header: PT.oneOfType([PT.string, PT.element]),
  labelHighContrast: PT.string,
  onHighContrastClicked: PT.func,
  style: PT.string
}

Banner.displayName = 'Banner'
export default Banner
