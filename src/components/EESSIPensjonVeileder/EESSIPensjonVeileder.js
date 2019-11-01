import React from 'react'
import classNames from 'classnames'
import PT from 'prop-types'
import SmilendeOrangeVeileder from './veileder/NavPensjonSmilendeOrangeVeileder'
import TristOrangeVeileder from './veileder/NavPensjonTristOrangeVeileder'

const EESSIPensjonVeileder = ({ className, mood = 'smilende' }) => (
  <div className={classNames('c-EESSIPensjonVeileder', className)}>
    {mood === 'trist'
      ? <TristOrangeVeileder width='130' height='130' />
      : <SmilendeOrangeVeileder width='130' height='130' />}
  </div>
)

EESSIPensjonVeileder.propTypes = {
  className: PT.string,
  mood: PT.string
}
EESSIPensjonVeileder.displayName = 'EESSIPensjonVeileder'
export default EESSIPensjonVeileder
