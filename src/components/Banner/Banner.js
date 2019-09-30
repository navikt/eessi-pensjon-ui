import React from 'react'
import PT from 'prop-types'
import { Lenke, Systemtittel } from '../../Nav'
import './Banner.css'
import Alert from '../Alert/Alert'

const Banner = (props) => {
  const { header, t, toggleHighContrast } = props

  return (
    <div className='c-banner'>
      <Lenke
        id='c-banner__highcontrast-link-id'
        className='c-banner__highcontrast-link mt-1'
        href='#highContrast'
        onClick={toggleHighContrast}
      >
        {t('highContrast')}
      </Lenke>
      <Systemtittel
        className='c-banner__title m-4 pt-4 pb-4 text-center'
      >
        {header}
      </Systemtittel>
    </div>
  )
}

Banner.propTypes = {
  header: PT.string,
  t: PT.func.isRequired,
  toggleHighContrast: PT.func.isRequired
}

Banner.displayName = 'Banner'
export default Banner
