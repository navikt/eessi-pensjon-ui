import React from 'react'
import PT from 'prop-types'
import SmilendeOrangeVeileder from '../../resources/images/NavPensjonSmilendeOrangeVeileder'
import TristOrangeVeileder from '../../resources/images/NavPensjonTristOrangeVeileder'

const Psycho = ({ mood = 'smilende' }) => (
  <div className='c-psycho'>
    {mood === 'trist'
      ? <TristOrangeVeileder width='130' height='130' />
      : <SmilendeOrangeVeileder width='130' height='130' />}
  </div>
)

Psycho.propTypes = {
  mood: PT.string
}
Psycho.displayName = 'Psycho'
export default Psycho
