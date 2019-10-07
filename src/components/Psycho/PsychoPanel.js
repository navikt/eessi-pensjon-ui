import React, { useState } from 'react'
import PT from 'prop-types'
import { Veilederpanel } from '../../Nav'
import Icons from '../Icons/Icons'
import Psycho from './Psycho'
import classNames from 'classnames'
import './Psycho.css'

const PsychoPanel = ({ children, className, closeButton = false, mood }) => {
  const [hidden, setHidden] = useState(false)

  const handleClose = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setHidden(true)
  }

  if (hidden) {
    return null
  }

  return (
    <div className={classNames('c-psychoPanel', className)}>
      <Veilederpanel type='normal' svg={<Psycho mood={mood} />} kompakt>
        {children}
        {closeButton ? (
          <div className='closeButton'>
            <a
              href='#close' onClick={handleClose}
              style={{ position: 'absolute', top: '5px', right: '5px' }}
            >
              <Icons kind='nav-close' />
            </a>
          </div>
        ) : null}
      </Veilederpanel>
    </div>
  )
}

PsychoPanel.propTypes = {
  children: PT.node.isRequired,
  className: PT.string,
  closeButton: PT.bool,
  mood: PT.string
}
PsychoPanel.displayName = 'PsychoPanel'
export default PsychoPanel
