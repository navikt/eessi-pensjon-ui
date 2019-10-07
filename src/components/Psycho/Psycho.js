import React from 'react'
import classNames from 'classnames'
import PT from 'prop-types'
import SmilendeOrangeVeileder from '../../resources/images/NavPensjonSmilendeOrangeVeileder'
import TristOrangeVeileder from '../../resources/images/NavPensjonTristOrangeVeileder'

const Psycho = ({ className, mood = 'smilende' }) => (
  <div className={classNames('c-psycho', className)}>
    {mood === 'trist'
      ? <TristOrangeVeileder width='130' height='130' />
      : <SmilendeOrangeVeileder width='130' height='130' />}
  </div>
)

Psycho.propTypes = {
  className: PT.string,
  mood: PT.string
}
Psycho.displayName = 'Psycho'
export default Psycho
